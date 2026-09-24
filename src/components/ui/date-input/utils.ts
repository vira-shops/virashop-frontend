import DateObject from 'react-date-object';
import gregorian from 'react-date-object/calendars/gregorian';
import persian from 'react-date-object/calendars/persian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import persian_fa from 'react-date-object/locales/persian_fa';

export const ISO_DATE_FORMAT = 'YYYY-MM-DD';
export const JALALI_DISPLAY_FORMAT = 'YYYY/MM/DD';

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Gregorian `YYYY-MM-DD` → Jalali DateObject (Persian digits); `null` when blank/invalid. */
export const isoToJalali = (iso?: string | null): DateObject | null => {
  if (!iso || !ISO_DATE_RE.test(iso)) return null;

  const date = new DateObject({
    date: iso,
    format: ISO_DATE_FORMAT,
    calendar: gregorian,
    locale: gregorian_en,
  });

  return date.isValid ? date.convert(persian, persian_fa) : null;
};

/** Any calendar's DateObject → Gregorian `YYYY-MM-DD` with Latin digits (timezone-free). */
export const dateObjectToIso = (date: DateObject): string =>
  new DateObject(date).convert(gregorian, gregorian_en).format(ISO_DATE_FORMAT);

/** Gregorian `YYYY-MM-DD` → `۱۴۰۰/۰۵/۲۱`; empty string when blank/invalid. */
export const formatIsoAsJalali = (iso?: string | null): string =>
  isoToJalali(iso)?.format(JALALI_DISPLAY_FORMAT) ?? '';
