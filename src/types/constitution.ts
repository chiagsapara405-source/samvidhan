export interface Article {
  id: string;
  number: string;
  title: string;
  partId: string;
  paragraphs: ArticleParagraph[];
  editorialNotes?: string[];
  editionNotes?: string[];
  status: 'active' | 'repealed' | 'omitted';
  textVerification?: 'verified' | 'partial' | 'unavailable';
  sourceId?: string;
  order: number;
}

export interface ArticleParagraph {
  label?: string;
  text: string;
  indent?: number;
  kind?: 'proviso' | 'explanation';
}

export interface ConstitutionPart {
  id: string;
  number: string;
  title: string;
  articleRange: string;
  description?: string;
  articles: Article[];
  status?: 'active' | 'repealed';
  sourceId?: string;
}
