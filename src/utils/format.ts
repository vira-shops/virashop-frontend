/** Latin digits → Persian digits (no padding). */
export const toFaDigits = (value: number | string): string =>
  String(value).replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]);

/** Formats a Toman amount with thousand separators and Persian digits, e.g. ۴۵۰٬۰۰۰. */
export const formatToman = (value: number): string =>
  toFaDigits(Math.round(value).toLocaleString('en-US').replace(/,/g, '٬'));
