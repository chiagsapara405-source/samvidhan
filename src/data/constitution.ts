import type { Article, ConstitutionPart } from '@/types/constitution';
import {
  officialArticleEditionNotes,
  officialArticleParagraphs,
} from '@/data/official-article-text';
import { constitutionSource, verifiedTextSource } from '@/data/sources';

const partOneArticles: Article[] = [
  {
    id: 'article-1',
    number: '1',
    title: 'Name and territory of the Union',
    partId: 'part-1',
    status: 'active',
    order: 1,
    paragraphs: [
      { label: '(1)', text: 'India, that is Bharat, shall be a Union of States.' },
      {
        label: '(2)',
        text: 'The States and the territories thereof shall be as specified in the First Schedule.',
      },
      { label: '(3)', text: 'The territory of India shall comprise—' },
      { label: '(a)', text: 'the territories of the States;', indent: 1 },
      {
        label: '(b)',
        text: 'the Union territories specified in the First Schedule; and',
        indent: 1,
      },
      { label: '(c)', text: 'such other territories as may be acquired.', indent: 1 },
    ],
    editorialNotes: [
      'Clause (2) was substituted by the Constitution (Seventh Amendment) Act, 1956, section 2, with effect from 1 November 1956.',
      'Sub-clause (b) was substituted by section 2 of the same Act.',
    ],
  },
  {
    id: 'article-2',
    number: '2',
    title: 'Admission or establishment of new States',
    partId: 'part-1',
    status: 'active',
    order: 2,
    paragraphs: [
      {
        text: 'Parliament may by law admit into the Union, or establish, new States on such terms and conditions as it thinks fit.',
      },
    ],
    editorialNotes: [
      '3[2A. [Sikkim to be associated with the Union.] —Omitted by the Constitution (Thirty-sixth Amendment) Act, 1975, s. 5 (w.e.f. 26-4-1975).]',
    ],
  },
  {
    id: 'article-3',
    number: '3',
    title:
      'Formation of new States and alteration of areas, boundaries or names of existing States',
    partId: 'part-1',
    status: 'active',
    order: 3,
    paragraphs: [
      { text: 'Parliament may by law—' },
      {
        label: '(a)',
        text: 'form a new State by separation of territory from any State or by uniting two or more States or parts of States or by uniting any territory to a part of any State;',
        indent: 1,
      },
      { label: '(b)', text: 'increase the area of any State;', indent: 1 },
      { label: '(c)', text: 'diminish the area of any State;', indent: 1 },
      { label: '(d)', text: 'alter the boundaries of any State;', indent: 1 },
      { label: '(e)', text: 'alter the name of any State:', indent: 1 },
      {
        label: 'Provided that',
        text: 'no Bill for the purpose shall be introduced in either House of Parliament except on the recommendation of the President and unless, where the proposal contained in the Bill affects the area, boundaries or name of any of the States 2***, the Bill has been referred by the President to the Legislature of that State for expressing its views thereon within such period as may be specified in the reference or within such further period as the President may allow and the period so specified or allowed has expired.',
        kind: 'proviso',
      },
      {
        label: 'Explanation I',
        text: 'In this article, in clauses (a) to (e), “State” includes a Union territory, but in the proviso, “State” does not include a Union territory.',
        kind: 'explanation',
      },
      {
        label: 'Explanation II',
        text: 'The power conferred on Parliament by clause (a) includes the power to form a new State or Union territory by uniting a part of any State or Union territory to any other State or Union territory.',
        kind: 'explanation',
      },
    ],
    editorialNotes: [
      'The proviso was substituted by the Constitution (Fifth Amendment) Act, 1955, section 2, with effect from 24 December 1955.',
      'The words “specified in Part A or Part B of the First Schedule” were omitted by the Constitution (Seventh Amendment) Act, 1956, section 29 and Schedule.',
      'Explanations I and II were inserted by the Constitution (Eighteenth Amendment) Act, 1966, section 2, with effect from 27 August 1966.',
    ],
  },
  {
    id: 'article-4',
    number: '4',
    title:
      'Laws made under articles 2 and 3 to provide for the amendment of the First and the Fourth Schedules and supplemental, incidental and consequential matters',
    partId: 'part-1',
    status: 'active',
    order: 4,
    paragraphs: [
      {
        label: '(1)',
        text: 'Any law referred to in article 2 or article 3 shall contain such provisions for the amendment of the First Schedule and the Fourth Schedule as may be necessary to give effect to the provisions of the law and may also contain such supplemental, incidental and consequential provisions (including provisions as to representation in Parliament and in the Legislature or Legislatures of the State or States affected by such law) as Parliament may deem necessary.',
      },
      {
        label: '(2)',
        text: 'No such law as aforesaid shall be deemed to be an amendment of this Constitution for the purposes of article 368.',
      },
    ],
  },
];

const articleMetadata = (
  partId: string,
  definitions: [number, string, string, Article['status']?][],
): Article[] =>
  definitions.map(([order, number, title, status = 'active']) => {
    const id = `article-${number.toLowerCase()}`;
    return {
      id,
      number,
      title,
      partId,
      paragraphs: officialArticleParagraphs[id] ?? [],
      editionNotes: officialArticleEditionNotes[id],
      status,
      textVerification: officialArticleParagraphs[id]?.length ? 'verified' : 'unavailable',
      sourceId: verifiedTextSource.id,
      order,
    };
  });

const partTwoArticles = articleMetadata('part-2', [
  [5, '5', 'Citizenship at the commencement of the Constitution'],
  [6, '6', 'Rights of citizenship of certain persons who have migrated to India from Pakistan'],
  [7, '7', 'Rights of citizenship of certain migrants to Pakistan'],
  [8, '8', 'Rights of citizenship of certain persons of Indian origin residing outside India'],
  [9, '9', 'Persons voluntarily acquiring citizenship of a foreign State not to be citizens'],
  [10, '10', 'Continuance of the rights of citizenship'],
  [11, '11', 'Parliament to regulate the right of citizenship by law'],
]);

const partThreeArticles = articleMetadata('part-3', [
  [12, '12', 'Definition'],
  [13, '13', 'Laws inconsistent with or in derogation of the fundamental rights'],
  [14, '14', 'Equality before law'],
  [
    15,
    '15',
    'Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth',
  ],
  [16, '16', 'Equality of opportunity in matters of public employment'],
  [17, '17', 'Abolition of Untouchability'],
  [18, '18', 'Abolition of titles'],
  [19, '19', 'Protection of certain rights regarding freedom of speech, etc.'],
  [20, '20', 'Protection in respect of conviction for offences'],
  [21, '21', 'Protection of life and personal liberty'],
  [22, '21A', 'Right to education'],
  [23, '22', 'Protection against arrest and detention in certain cases'],
  [24, '23', 'Traffic in human beings and forced labour'],
  [25, '24', 'Prohibition of employment of children in factories, etc.'],
  [26, '25', 'Freedom of conscience and free profession, practice and propagation of religion'],
  [27, '26', 'Freedom to manage religious affairs'],
  [28, '27', 'Freedom as to payment of taxes for promotion of any particular religion'],
  [
    29,
    '28',
    'Freedom as to attendance at religious instruction or religious worship in certain educational institutions',
  ],
  [30, '29', 'Protection of interests of minorities'],
  [31, '30', 'Right of minorities to establish and administer educational institutions'],
  [32, '31', 'Compulsory acquisition of property', 'omitted'],
  [33, '31A', 'Saving of laws providing for acquisition of estates, etc.'],
  [34, '31B', 'Validation of certain Acts and Regulations'],
  [35, '31C', 'Saving of laws giving effect to certain directive principles'],
  [36, '31D', 'Saving of laws in respect of anti-national activities', 'omitted'],
  [37, '32', 'Remedies for enforcement of rights conferred by this Part'],
  [
    38,
    '32A',
    'Constitutional validity of State laws not to be considered in proceedings under article 32',
    'omitted',
  ],
  [
    39,
    '33',
    'Power of Parliament to modify the rights conferred by this Part in their application to Forces, etc.',
  ],
  [
    40,
    '34',
    'Restriction on rights conferred by this Part while martial law is in force in any area',
  ],
  [41, '35', 'Legislation to give effect to the provisions of this Part'],
]);

const initialParts: ConstitutionPart[] = [
  {
    id: 'part-1',
    number: 'Part I',
    title: 'The Union and Its Territory',
    articleRange: 'Articles 1–4',
    description: 'The Union and its territory',
    articles: partOneArticles,
  },
  {
    id: 'part-2',
    number: 'Part II',
    title: 'Citizenship',
    articleRange: 'Articles 5–11',
    description: 'Citizenship at the commencement of the Constitution',
    articles: partTwoArticles,
  },
  {
    id: 'part-3',
    number: 'Part III',
    title: 'Fundamental Rights',
    articleRange: 'Articles 12–35',
    description: 'Fundamental Rights',
    articles: partThreeArticles,
  },
];

function articleNumberSortKey(number: string) {
  const match = number.match(/^(\d+)(.*)$/);
  if (!match) return [Number.MAX_SAFE_INTEGER, number] as const;
  return [Number(match[1]), match[2].replace(/-/g, '')] as const;
}

type CatalogPart = Omit<ConstitutionPart, 'articles'> & { articleNumbers: string[] };

function articleNumbers(specification: string) {
  return specification.split(',').flatMap((item) => {
    const [start, end] = item.split('-').map(Number);
    return Number.isFinite(end)
      ? Array.from({ length: end - start + 1 }, (_, index) => String(start + index))
      : [item];
  });
}

const omittedArticleNumbers = new Set([
  '2A',
  '31',
  '31D',
  '32A',
  '131A',
  '144A',
  '226A',
  '228A',
  '238',
  '242',
  '257A',
  '259',
  '268A',
  '272',
  '278',
  '291',
  '306',
  '314',
  '329A',
  '359A',
  '362',
  '379',
  '380',
  '381',
  '382',
  '383',
  '384',
  '385',
  '386',
  '387',
  '388',
  '389',
  '390',
  '391',
]);

// The catalogue below is transcribed from the Contents of the Legislative Department's
// 1 May 2026 edition. Text is intentionally not generated from this metadata.
const catalogParts: CatalogPart[] = [
  {
    id: 'part-4',
    number: 'Part IV',
    title: 'Directive Principles of State Policy',
    articleRange: 'Articles 36–51',
    articleNumbers: [...articleNumbers('36-51'), '39A', '43A', '43B', '48A'],
  },
  {
    id: 'part-4a',
    number: 'Part IVA',
    title: 'Fundamental Duties',
    articleRange: 'Article 51A',
    articleNumbers: ['51A'],
  },
  {
    id: 'part-5',
    number: 'Part V',
    title: 'The Union',
    articleRange: 'Articles 52–151',
    articleNumbers: [
      ...articleNumbers('52-151'),
      '124A',
      '124B',
      '124C',
      '131A',
      '134A',
      '139A',
      '144A',
    ],
  },
  {
    id: 'part-6',
    number: 'Part VI',
    title: 'The States',
    articleRange: 'Articles 152–237',
    articleNumbers: [...articleNumbers('152-237'), '224A', '226A', '228A', '233A'],
  },
  {
    id: 'part-7',
    number: 'Part VII',
    title: 'The States in Part B of the First Schedule',
    articleRange: 'Article 238',
    status: 'repealed',
    articleNumbers: ['238'],
  },
  {
    id: 'part-8',
    number: 'Part VIII',
    title: 'The Union Territories',
    articleRange: 'Articles 239–242',
    articleNumbers: [...articleNumbers('239-242'), '239A', '239AA', '239AB', '239B'],
  },
  {
    id: 'part-9',
    number: 'Part IX',
    title: 'The Panchayats',
    articleRange: 'Articles 243–243O',
    articleNumbers: [
      '243',
      '243A',
      '243B',
      '243C',
      '243D',
      '243E',
      '243F',
      '243G',
      '243H',
      '243-I',
      '243J',
      '243K',
      '243L',
      '243M',
      '243N',
      '243-O',
    ],
  },
  {
    id: 'part-9a',
    number: 'Part IXA',
    title: 'The Municipalities',
    articleRange: 'Articles 243P–243ZG',
    articleNumbers: [
      '243P',
      '243Q',
      '243R',
      '243S',
      '243T',
      '243U',
      '243V',
      '243W',
      '243X',
      '243Y',
      '243Z',
      '243ZA',
      '243ZB',
      '243ZC',
      '243ZD',
      '243ZE',
      '243ZF',
      '243ZG',
    ],
  },
  {
    id: 'part-9b',
    number: 'Part IXB',
    title: 'The Co-operative Societies',
    articleRange: 'Articles 243ZH–243ZT',
    articleNumbers: [
      '243ZH',
      '243Z-I',
      '243ZJ',
      '243ZK',
      '243ZL',
      '243ZM',
      '243ZN',
      '243Z-O',
      '243ZP',
      '243ZQ',
      '243ZR',
      '243ZS',
      '243ZT',
    ],
  },
  {
    id: 'part-10',
    number: 'Part X',
    title: 'The Scheduled and Tribal Areas',
    articleRange: 'Articles 244–244A',
    articleNumbers: ['244', '244A'],
  },
  {
    id: 'part-11',
    number: 'Part XI',
    title: 'Relations Between the Union and the States',
    articleRange: 'Articles 245–263',
    articleNumbers: [...articleNumbers('245-263'), '246A', '257A', '258A'],
  },
  {
    id: 'part-12',
    number: 'Part XII',
    title: 'Finance, Property, Contracts and Suits',
    articleRange: 'Articles 264–300A',
    articleNumbers: [...articleNumbers('264-300'), '268A', '269A', '279A', '290A', '300A'],
  },
  {
    id: 'part-13',
    number: 'Part XIII',
    title: 'Trade, Commerce and Intercourse Within the Territory of India',
    articleRange: 'Articles 301–307',
    articleNumbers: articleNumbers('301-307'),
  },
  {
    id: 'part-14',
    number: 'Part XIV',
    title: 'Services Under the Union and the States',
    articleRange: 'Articles 308–323',
    articleNumbers: [...articleNumbers('308-323'), '312A'],
  },
  {
    id: 'part-14a',
    number: 'Part XIVA',
    title: 'Tribunals',
    articleRange: 'Articles 323A–323B',
    articleNumbers: ['323A', '323B'],
  },
  {
    id: 'part-15',
    number: 'Part XV',
    title: 'Elections',
    articleRange: 'Articles 324–329A',
    articleNumbers: [...articleNumbers('324-329'), '329A'],
  },
  {
    id: 'part-16',
    number: 'Part XVI',
    title: 'Special Provisions Relating to Certain Classes',
    articleRange: 'Articles 330–342A',
    articleNumbers: [...articleNumbers('330-342'), '330A', '332A', '334A', '338A', '338B', '342A'],
  },
  {
    id: 'part-17',
    number: 'Part XVII',
    title: 'Official Language',
    articleRange: 'Articles 343–351',
    articleNumbers: [...articleNumbers('343-351'), '350A', '350B'],
  },
  {
    id: 'part-18',
    number: 'Part XVIII',
    title: 'Emergency Provisions',
    articleRange: 'Articles 352–360',
    articleNumbers: [...articleNumbers('352-360'), '359A'],
  },
  {
    id: 'part-19',
    number: 'Part XIX',
    title: 'Miscellaneous',
    articleRange: 'Articles 361–367',
    articleNumbers: [...articleNumbers('361-367'), '361A', '361B', '363A'],
  },
  {
    id: 'part-20',
    number: 'Part XX',
    title: 'Amendment of the Constitution',
    articleRange: 'Article 368',
    articleNumbers: ['368'],
  },
  {
    id: 'part-21',
    number: 'Part XXI',
    title: 'Temporary, Transitional and Special Provisions',
    articleRange: 'Articles 369–392',
    articleNumbers: [
      ...articleNumbers('369-392'),
      '371A',
      '371B',
      '371C',
      '371D',
      '371E',
      '371F',
      '371G',
      '371H',
      '371-I',
      '371J',
      '372A',
      '378A',
    ],
  },
  {
    id: 'part-22',
    number: 'Part XXII',
    title: 'Short Title, Commencement, Authoritative Text in Hindi and Repeals',
    articleRange: 'Articles 393–395',
    articleNumbers: ['393', '394', '394A', '395'],
  },
];

function metadataOnlyParts(startOrder: number): ConstitutionPart[] {
  let order = startOrder;
  return catalogParts.map(({ articleNumbers: numbers, ...part }) => ({
    ...part,
    sourceId: constitutionSource.id,
    articles: [...numbers]
      .sort((first, second) => {
        const [firstBase, firstSuffix] = articleNumberSortKey(first);
        const [secondBase, secondSuffix] = articleNumberSortKey(second);
        return firstBase - secondBase || firstSuffix.localeCompare(secondSuffix);
      })
      .map((number) => ({
        id: `article-${number.toLowerCase()}`,
        number,
        title: 'Official title pending transcription',
        partId: part.id,
        paragraphs: [],
        status:
          omittedArticleNumbers.has(number) || part.status === 'repealed' ? 'omitted' : 'active',
        textVerification: 'unavailable',
        sourceId: constitutionSource.id,
        order: order++,
      })),
  }));
}

export const constitutionParts: ConstitutionPart[] = [
  ...initialParts.map((part) => ({
    ...part,
    sourceId: constitutionSource.id,
    articles: part.articles.map((article) => ({
      ...article,
      sourceId: article.paragraphs.length ? verifiedTextSource.id : constitutionSource.id,
      textVerification: article.paragraphs.length
        ? ('verified' as const)
        : ('unavailable' as const),
    })),
  })),
  ...metadataOnlyParts(42),
];

export function getPartById(partId: string | undefined): ConstitutionPart | undefined {
  return constitutionParts.find((part) => part.id === partId);
}

export function getArticleById(articleId: string | undefined): Article | undefined {
  return constitutionParts
    .flatMap((part) => part.articles)
    .find((article) => article.id === articleId);
}

export function getPartForArticle(articleId: string): ConstitutionPart | undefined {
  return constitutionParts.find((part) =>
    part.articles.some((article) => article.id === articleId),
  );
}

export function getArticlePosition(articleId: string) {
  const articles = constitutionParts
    .flatMap((part) => part.articles)
    .sort((first, second) => first.order - second.order);
  const index = articles.findIndex((article) => article.id === articleId);

  return {
    index,
    total: articles.length,
    previous: index > 0 ? articles[index - 1] : undefined,
    next: index >= 0 ? articles[index + 1] : undefined,
  };
}

export function findArticleByNumber(query: string, partId?: string): Article | undefined {
  const normalized = query
    .trim()
    .replace(/^article\s*/i, '')
    .toLowerCase();
  if (!normalized) return undefined;

  return constitutionParts
    .flatMap((part) => part.articles)
    .find(
      (article) =>
        (!partId || article.partId === partId) && article.number.toLowerCase() === normalized,
    );
}

export function validateConstitutionLibrary() {
  const issues: string[] = [];
  const partIds = new Set<string>();
  const articleIds = new Set<string>();
  const allowedStatuses = new Set<Article['status']>(['active', 'omitted', 'repealed']);
  const allowedVerification = new Set(['verified', 'partial', 'unavailable']);
  const numberPattern = /^\d+[A-Z]*(?:-[A-Z])?$/;
  let lastOrder = 0;

  for (const part of constitutionParts) {
    if (partIds.has(part.id)) issues.push(`Duplicate Part ID: ${part.id}`);
    partIds.add(part.id);
    for (const article of part.articles) {
      if (articleIds.has(article.id)) issues.push(`Duplicate article ID: ${article.id}`);
      articleIds.add(article.id);
      if (article.partId !== part.id)
        issues.push(`Article ${article.id} references ${article.partId}`);
      if (!numberPattern.test(article.number))
        issues.push(`Invalid article number: ${article.number}`);
      if (!allowedStatuses.has(article.status)) issues.push(`Invalid status: ${article.id}`);
      if (!allowedVerification.has(article.textVerification ?? 'unavailable')) {
        issues.push(`Invalid text verification: ${article.id}`);
      }
      if (article.textVerification === 'unavailable' && article.paragraphs.length) {
        issues.push(`Unavailable article has text: ${article.id}`);
      }
      if (article.order <= lastOrder) issues.push(`Non-deterministic order: ${article.id}`);
      lastOrder = article.order;
    }
  }
  return issues;
}
