import type { Article, ConstitutionPart } from '@/types/constitution';
import { constitutionParts } from '@/data/constitution';

export type SearchStatus = 'all' | Article['status'];

export type SearchResult =
  | { type: 'part'; part: ConstitutionPart; rank: number }
  | { type: 'article'; article: Article; part: ConstitutionPart; rank: number; excerpt?: string };

type SearchOptions = {
  partId?: string;
  status?: SearchStatus;
};

function normalize(value: string) {
  return value.toLocaleLowerCase().trim().replace(/\s+/g, ' ');
}

function compact(value: string) {
  return normalize(value).replace(/\s+/g, '');
}

function parseArticleNumber(query: string) {
  const number = query.replace(/^(?:article|art\.?)\s*/i, '').trim();
  return /^[0-9]+[a-z]?$/i.test(number) ? compact(number) : undefined;
}

function parsePartNumber(query: string) {
  const match = query.match(/^part\s+([ivxlcdm]+|\d+)$/i);
  if (!match) return undefined;
  const value = match[1].toLocaleLowerCase();
  const romanNumbers: Record<string, string> = { i: '1', ii: '2', iii: '3' };
  return romanNumbers[value] ?? value;
}

function findExcerpt(article: Article, query: string) {
  const needle = normalize(query);
  if (!needle) return undefined;

  for (const paragraph of article.paragraphs) {
    const text = paragraph.text;
    const normalizedText = normalize(text);
    const normalizedIndex = normalizedText.indexOf(needle);
    if (normalizedIndex < 0) continue;

    // Map the normalized match back to the original paragraph so excerpts never
    // alter or reconstruct the constitutional wording.
    let sourceIndex = 0;
    let normalizedPosition = 0;
    let start = -1;
    while (sourceIndex < text.length && normalizedPosition < normalizedIndex) {
      if (/\s/.test(text[sourceIndex])) {
        while (sourceIndex < text.length && /\s/.test(text[sourceIndex])) sourceIndex += 1;
        normalizedPosition += 1;
      } else {
        sourceIndex += 1;
        normalizedPosition += 1;
      }
    }
    start = sourceIndex;

    const excerptStart = Math.max(0, start - 48);
    const excerptEnd = Math.min(text.length, start + needle.length + 96);
    return `${excerptStart > 0 ? '…' : ''}${text.slice(excerptStart, excerptEnd)}${excerptEnd < text.length ? '…' : ''}`;
  }

  return undefined;
}

export function searchConstitution(query: string, options: SearchOptions = {}): SearchResult[] {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return [];

  const articleNumberQuery = parseArticleNumber(normalizedQuery);
  const partNumberQuery = parsePartNumber(normalizedQuery);
  const compactQuery = compact(normalizedQuery);
  const results: SearchResult[] = [];

  for (const part of constitutionParts) {
    const normalizedPartNumber = part.number.toLocaleLowerCase();
    const partNumber = parsePartNumber(normalizedPartNumber);
    const partRank = partNumberQuery
      ? partNumber === partNumberQuery
        ? 3
        : -1
      : normalize(part.title) === normalizedQuery
        ? 2
        : normalize(part.number) === normalizedQuery
          ? 2
          : normalize(part.title).startsWith(normalizedQuery) ||
              compact(part.title).startsWith(compactQuery)
            ? 3
            : normalize(part.title).includes(normalizedQuery) ||
                compact(part.title).includes(compactQuery)
              ? 4
              : normalizedPartNumber === normalizedQuery
                ? 2
                : -1;

    if (partRank >= 0 && (!options.partId || options.partId === part.id)) {
      results.push({ type: 'part', part, rank: 3 + partRank });
    }

    for (const article of part.articles) {
      if (options.partId && article.partId !== options.partId) continue;
      if (options.status && options.status !== 'all' && article.status !== options.status) continue;

      let rank = -1;
      let excerpt: string | undefined;
      const normalizedNumber = compact(article.number);
      if (articleNumberQuery) {
        // A number query is intentionally isolated from text search: Article 21
        // must not match the number inside Article 21A or unrelated legal text.
        if (normalizedNumber === articleNumberQuery) rank = 0;
      } else {
        excerpt = findExcerpt(article, normalizedQuery);
        const normalizedTitle = normalize(article.title);
        const compactTitle = compact(article.title);
        if (normalizedTitle === normalizedQuery || compactTitle === compactQuery) rank = 1;
        else if (
          normalizedTitle.startsWith(normalizedQuery) ||
          compactTitle.startsWith(compactQuery)
        )
          rank = 2;
        else if (normalizedTitle.includes(normalizedQuery) || compactTitle.includes(compactQuery))
          rank = 3;
        else if (excerpt) rank = 5;
      }

      if (rank >= 0) results.push({ type: 'article', article, part, rank, excerpt });
    }
  }

  return results.sort((first, second) => {
    if (first.rank !== second.rank) return first.rank - second.rank;
    if (first.type === 'article' && second.type === 'article') {
      const statusRank = (status: Article['status']) => (status === 'active' ? 0 : 1);
      const byStatus = statusRank(first.article.status) - statusRank(second.article.status);
      if (byStatus) return byStatus;
      return first.article.order - second.article.order;
    }
    if (first.type !== second.type) return first.type === 'part' ? -1 : 1;
    return first.type === 'part' && second.type === 'part'
      ? first.part.number.localeCompare(second.part.number)
      : 0;
  });
}
