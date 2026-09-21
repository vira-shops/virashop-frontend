import type { AuthErrorCode } from '@/contracts/endpoints/auth';
import type { FailedApiResponse } from '@/connections';
import { AUTH_ERROR_MESSAGES } from './constants';

/** Normalizes Persian/Arabic digits to ASCII and strips separators. */
const toAsciiDigits = (raw: string): string =>
  raw
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
    .replace(/[\s+-]/g, '');

/**
 * Normalizes any accepted Iranian mobile input to the stored `09xxxxxxxxx`
 * shape — `912…`, `+98912…`, `98912…`, `0098912…` → `0912…`.
 */
export const normalizeIranianMobile = (raw: string): string => {
  const digits = toAsciiDigits(raw.trim());

  if (digits.startsWith('0098')) return `0${digits.slice(4)}`;
  if (digits.startsWith('98') && digits.length === 12) return `0${digits.slice(2)}`;
  if (digits.startsWith('9') && digits.length === 10) return `0${digits}`;

  return digits;
};

/** Latin → Persian digits without padding — phone numbers and counters. */
export const toPersianDigits = (value: string | number): string =>
  String(value).replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]);

/** Extracts the backend `errorCode` from a thrown `FailedApiResponse`. */
export const pickErrorCode = (error: unknown): AuthErrorCode | null => {
  if (typeof error === 'object' && error !== null && 'errorCode' in error) {
    const code = (error as FailedApiResponse).errorCode;

    return typeof code === 'string' ? (code as AuthErrorCode) : null;
  }

  return null;
};

/** Extracts a human message for any thrown API error (Persian-first). */
export const pickErrorMessage = (error: unknown, fallback: string): string => {
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const message = (error as { message?: unknown }).message;

    if (typeof message === 'string' && message.length > 0) return message;
  }

  return fallback;
};

/**
 * Persian UI message for a thrown auth API error — resolved from the
 * `errorCode` (per the contract: branch on the code, never on the message);
 * falls back to the backend message for unknown codes.
 */
export const authErrorMessage = (error: unknown): string => {
  const code = pickErrorCode(error);

  if (code) {
    return AUTH_ERROR_MESSAGES[code];
  }

  return pickErrorMessage(error, AUTH_ERROR_MESSAGES.INTERNAL);
};
