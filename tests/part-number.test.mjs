import test from 'node:test';
import assert from 'node:assert/strict';
import { parsePartNumber } from '../src/data/part-number.ts';

const romanParts = [
  'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI',
  'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI', 'XXII',
];

test('normalizes all standard Constitution Parts I–XXII', () => {
  romanParts.forEach((roman, index) => {
    assert.equal(parsePartNumber(`Part ${roman}`), String(index + 1));
    assert.equal(parsePartNumber(`Part ${index + 1}`), String(index + 1));
  });
});

test('matches case-insensitively and tolerates extra whitespace', () => {
  assert.equal(parsePartNumber('  pArT   iV  '), '4');
  assert.equal(parsePartNumber('PART 14'), '14');
});

test('leaves inserted Parts to exact-name matching', () => {
  for (const part of ['IVA', 'IXA', 'IXB', 'XIVA']) {
    assert.equal(parsePartNumber(`Part ${part}`), undefined);
  }
});

test('rejects malformed and unrelated queries', () => {
  for (const query of ['', 'Part', 'Article 4', 'Part 4A', 'Part XXIII', 'Part IIII']) {
    assert.equal(parsePartNumber(query), undefined);
  }
});
