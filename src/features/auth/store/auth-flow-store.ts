import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Channel } from '@/contracts/endpoints/auth';
import type { AuthFlowDraft, AuthFlowMode, AuthFlowStep } from '@/features/auth/types';

export type { AuthFlowDraft, AuthFlowMode, AuthFlowStep } from '@/features/auth/types';

interface AuthFlowState {
  /** Current wizard step. */
  step: AuthFlowStep;
  /** null until the first submit classifies the phone (login vs signup). */
  mode: AuthFlowMode | null;
  /** Timestamp (ms) of the last OTP send — drives TTL + resend countdowns. */
  otpSentAt: number | null;
  draft: AuthFlowDraft;
  start: (mode: AuthFlowMode, channel: Channel) => void;
  patchDraft: (patch: Partial<AuthFlowDraft>) => void;
  setStep: (step: AuthFlowStep) => void;
  setMode: (mode: AuthFlowMode) => void;
  markOtpSent: (sentAt?: number) => void;
  reset: () => void;
}

const INITIAL_DRAFT: AuthFlowDraft = {
  firstName: '',
  lastName: '',
  phone: '',
  channel: 'RETAIL',
  accountType: null,
  activityType: '',
  guildType: '',
  industryType: '',
  category: '',
  documentType: 'BUSINESS_LICENSE',
};

const INITIAL_STATE = {
  step: 'credentials' as AuthFlowStep,
  mode: null,
  otpSentAt: null,
  draft: INITIAL_DRAFT,
};

/**
 * Persisted wizard draft — a refresh mid-flow restores the step and the
 * entered data (files are component-local and never persisted).
 */
export const useAuthFlowStore = create<AuthFlowState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,
      start: (mode, channel) =>
        set({ mode, step: 'credentials', otpSentAt: null, draft: { ...INITIAL_DRAFT, channel } }),
      patchDraft: (patch) => set((state) => ({ draft: { ...state.draft, ...patch } })),
      setStep: (step) => set({ step }),
      setMode: (mode) => set({ mode }),
      markOtpSent: (sentAt) => set({ otpSentAt: sentAt ?? Date.now() }),
      reset: () => set({ ...INITIAL_STATE }),
    }),
    {
      name: 'virashop-auth-flow',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
