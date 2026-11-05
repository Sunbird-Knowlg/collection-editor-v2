import { describe, it, expect } from 'vitest';
import { LIBRARY_PRIMARY_CATEGORIES, CT_FILTERS } from './content';

const EXISTING = [
  'Course Assessment',
  'eTextbook',
  'Exam Question',
  'Explanation Content',
  'Learning Resource',
  'Practice Question Set',
  'SCORM Content',
  'Teacher Resource',
];
const DYNAMIC = ['Dynamic Course Assessment', 'Dynamic QuestionSet'];

describe('Library categories', () => {
  it('lets a collection search Dynamic Assess content by default (positive)', () => {
    expect(LIBRARY_PRIMARY_CATEGORIES).toEqual(expect.arrayContaining(DYNAMIC));
    expect(CT_FILTERS.map((f) => f.value)).toEqual(expect.arrayContaining(DYNAMIC));
  });

  it('keeps every existing category, in order, ahead of the Dynamic ones (negative)', () => {
    expect([...LIBRARY_PRIMARY_CATEGORIES]).toEqual([...EXISTING, ...DYNAMIC]);
  });

  it('offers exactly one chip per default category, after All', () => {
    expect(CT_FILTERS.map((f) => f.value)).toEqual(['all', ...LIBRARY_PRIMARY_CATEGORIES]);
    expect(CT_FILTERS.every((f) => f.value === 'all' || f.label === f.value)).toBe(true);
  });
});
