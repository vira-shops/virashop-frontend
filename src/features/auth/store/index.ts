// The session store moved to `@/hooks/auth` — it has a second, non-feature
// consumer (`AuthProvider`) in addition to this feature, so it lives at the
// app-level hooks layer per AGENTS.md's "second consumer" rule. Re-exported
// here so feature-internal call sites (`auth-wizard`) are unaffected.
export { useAuthStore, type AuthStore } from '@/hooks/auth';
export {
  useAuthFlowStore,
  type AuthFlowStep,
  type AuthFlowMode,
  type AuthFlowDraft,
} from './auth-flow-store';
