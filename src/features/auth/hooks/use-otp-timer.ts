'use client';

import * as React from 'react';
import { OTP_RESEND_COOLDOWN_SECONDS, OTP_TTL_SECONDS } from '@/features/auth/constants';

/**
 * Seconds-based countdown for the OTP step — drives both the code TTL
 * (120s) and the resend cooldown (60s) from a single `otpSentAt` stamp.
 */
export const useOtpTimer = (otpSentAt: number | null) => {
  const [now, setNow] = React.useState(() => Date.now());

  React.useEffect(() => {
    if (otpSentAt === null) return;

    // Ticks only — no synchronous setState in the effect body; the countdown
    // re-syncs on the first tick (≤1s) after a resend.
    const interval = setInterval(() => setNow(Date.now()), 1000);

    return () => clearInterval(interval);
  }, [otpSentAt]);

  const elapsedSeconds = otpSentAt === null ? 0 : Math.floor((now - otpSentAt) / 1000);

  return {
    remainingTtl: Math.max(0, OTP_TTL_SECONDS - elapsedSeconds),
    remainingCooldown: Math.max(0, OTP_RESEND_COOLDOWN_SECONDS - elapsedSeconds),
  };
};
