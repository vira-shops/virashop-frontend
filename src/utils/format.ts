/** Latin digits → Persian digits (no padding). */
export const toFaDigits = (value: number | string): string =>
  String(value).replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]);

/** Formats a Toman amount with thousand separators and Persian digits, e.g. ۴۵۰٬۰۰۰. */
export const formatToman = (value: number): string =>
  toFaDigits(Math.round(value).toLocaleString('en-US').replace(/,/g, '٬'));

/**
 * Splits a title into its lead segment and the emphasized "rest", at the
 * first space or ZWNJ (نیم‌فاصله) boundary — e.g. "تخفیف بزرگ" → "تخفیف" +
 * " بزرگ", "پرفروش‌ترین‌ها" → "پرفروش" + "‌ترین‌ها". Used to render section
 * titles with a two-tone emphasis (lead in the section's own color, rest in
 * black). A single-word title (no boundary) has no "rest" to emphasize.
 */
export const splitTitleEmphasis = (title: string): { lead: string; rest: string } => {
  const boundaryIndex = title.search(/[\s‌]/);

  if (boundaryIndex === -1) {
    return { lead: title, rest: '' };
  }

  return { lead: title.slice(0, boundaryIndex), rest: title.slice(boundaryIndex) };
};

/**
 * ISO date → Jalali `۱۴۰۴/۱۲/۸`, through the platform's Persian calendar.
 * Pinned to Tehran so the server and the client never disagree on the day
 * and trip a hydration mismatch.
 */
export const formatJalaliDate = (iso: string): string => {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timeZone: 'Asia/Tehran',
  }).format(date);
};
