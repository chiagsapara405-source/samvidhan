const romanPartNumbers: Record<string, string> = {
  i: '1',
  ii: '2',
  iii: '3',
  iv: '4',
  v: '5',
  vi: '6',
  vii: '7',
  viii: '8',
  ix: '9',
  x: '10',
  xi: '11',
  xii: '12',
  xiii: '13',
  xiv: '14',
  xv: '15',
  xvi: '16',
  xvii: '17',
  xviii: '18',
  xix: '19',
  xx: '20',
  xxi: '21',
  xxii: '22',
};

/** Normalize standard Constitution Part numbers to decimal strings. */
export function parsePartNumber(query: string): string | undefined {
  const normalizedQuery = query.toLocaleLowerCase().trim().replace(/\s+/g, ' ');
  const match = normalizedQuery.match(/^part\s+([ivxlcdm]+|\d+)$/i);
  if (!match) return undefined;

  const value = match[1];
  return romanPartNumbers[value] ?? (/^\d+$/.test(value) ? value : undefined);
}
