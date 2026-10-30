export interface ConstitutionSource {
  id: string;
  name: string;
  department: string;
  edition: string;
  language: string;
  url: string;
}

export const constitutionSource: ConstitutionSource = {
  id: 'legislative-department-2026-05-01',
  name: 'The Constitution of India',
  department: 'Government of India, Ministry of Law and Justice, Legislative Department',
  edition: 'Sixth pocket-size English-Hindi diglot edition, as on 1 May 2026',
  language: 'English text (English-Hindi diglot edition)',
  url: 'https://www.legislative.gov.in/static/uploads/2025/07/88cca69e868e50b217f855be2fb8bdba.pdf',
};

export const verifiedTextSource: ConstitutionSource = {
  id: 'legislative-department-2025-11-11',
  name: 'The Constitution of India',
  department: 'Government of India, Ministry of Law and Justice, Legislative Department',
  edition: 'Fourth English-Kannada diglot edition, as on 11 November 2025',
  language: 'English text (English-Kannada diglot edition)',
  url: 'https://www.legislative.gov.in/static/uploads/2025/07/359f70a69695affb9d72f8393102bd2e.pdf',
};
