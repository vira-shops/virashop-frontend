'use client';

import * as React from 'react';

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** true once the deadline has passed. */
  ended: boolean;
}

const subscribe = () => () => undefined;

/**
 * Ticks once per second and returns the remaining time until `endsAt`.
 * SSR-safe: renders zeros until mounted to avoid hydration mismatches.
 */
export function useCountdown(endsAt: string | number | Date): CountdownParts {
  const targetTime = new Date(endsAt).getTime();

  const [now, setNow] = React.useState(() => Date.now());

  // setInterval callback = external system; the linter's effect warning does
  // not apply to scheduled updates.
  React.useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);

    return () => window.clearInterval(timer);
  }, []);

  // Avoids server/client mismatch on the first paint.
  const mounted = React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  if (!mounted) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: false };
  }

  const diff = Math.max(targetTime - now, 0);
  const totalSeconds = Math.floor(diff / 1000);

  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    ended: diff === 0,
  };
}

/** Latin → Persian digits with 2-digit zero padding (e.g. 07). */
export const toFaDigits = (value: number): string =>
  String(value)
    .padStart(2, '0')
    .replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]);
