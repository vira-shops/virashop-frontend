import type { PartnerBrandColumn } from './types';

export const PARTNER_BRANDS_ARIA_LABEL = 'برندهای همکار';

export const PARTNER_BRANDS_TITLE = 'برندهایی که با ما همکاری کردند';

export const PARTNER_BRANDS_DESCRIPTION =
  'مجموعه‌ای از معتبرترین برندها و تأمین‌کنندگان که اعتمادشان را به ما گره زده‌اند.';

/** Staggered [start, end?) brand-slot slices per column (desktop = vertical columns). */
export const PARTNER_BRAND_COLUMNS: readonly PartnerBrandColumn[] = [
  { range: [8, undefined], justifyCenter: true },
  { range: [5, 8] },
  { range: [0, 2], justifyCenter: true },
  { range: [2, 5] },
];

/** Classes of one logo column — a row on phones, a column from `lg`. */
export const LOGO_COLUMN_CLASS = 'flex lg:flex-col gap-12 lg:gap-8';
