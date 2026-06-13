import { describe, expect, it } from 'vitest';
import {
  currentMonthParam,
  formatMonthLabel,
  monthDateRange,
  parseMonthParam,
  shiftMonth,
} from '@/utils/date';

describe('date utilities', () => {
  it('parses month param into year and month', () => {
    expect(parseMonthParam('2026-06')).toEqual({ year: 2026, month: 6 });
  });

  it('builds month date range with correct last day', () => {
    expect(monthDateRange('2026-02')).toEqual({
      dateFrom: '2026-02-01',
      dateTo: '2026-02-28',
    });
  });

  it('shifts month forward and backward', () => {
    expect(shiftMonth('2026-01', 1)).toBe('2026-02');
    expect(shiftMonth('2026-01', -1)).toBe('2025-12');
  });

  it('formats month label', () => {
    expect(formatMonthLabel('2026-06')).toBe('2026/06');
  });

  it('returns current month in YYYY-MM format', () => {
    expect(currentMonthParam()).toMatch(/^\d{4}-\d{2}$/);
  });
});
