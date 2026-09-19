import { normalizeIranianMobile, toPersianDigits } from './utils';

describe('normalizeIranianMobile', () => {
  // Every accepted input shape from the API guide's phone table.
  it.each([
    ['09123456789', '09123456789'],
    ['9123456789', '09123456789'],
    ['+989123456789', '09123456789'],
    ['989123456789', '09123456789'],
    ['00989123456789', '09123456789'],
  ])('normalizes %s to %s', (input, expected) => {
    expect(normalizeIranianMobile(input)).toBe(expected);
  });

  it('strips spaces and hyphens', () => {
    expect(normalizeIranianMobile('0912 345 6789')).toBe('09123456789');
    expect(normalizeIranianMobile('0912-345-6789')).toBe('09123456789');
  });

  it('converts Persian digits before normalizing', () => {
    expect(normalizeIranianMobile('۰۹۱۲۳۴۵۶۷۸۹')).toBe('09123456789');
  });
});

describe('toPersianDigits', () => {
  it('converts ASCII digits to Persian without padding', () => {
    expect(toPersianDigits('09123456789')).toBe('۰۹۱۲۳۴۵۶۷۸۹');
    expect(toPersianDigits(42)).toBe('۴۲');
  });
});
