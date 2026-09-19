import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { setAuthTokenProvider, setUnauthorizedHandler } from '@/connections';
import type { AuthUser } from '@/contracts/endpoints/auth';

interface AuthSessionState {
  accessToken: string | null;
  user: AuthUser | null;
}

interface AuthSessionActions {
  setSession: (accessToken: string, user: AuthUser) => void;
  setUser: (user: AuthUser) => void;
  clearSession: () => void;
}

export type AuthStore = AuthSessionState & AuthSessionActions;

/**
 * Persisted session — the API has no refresh token; `accessToken` is a JWT
 * with a default 1-day lifetime, revalidated against `GET /auth/me` on load.
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      setSession: (accessToken, user) => set({ accessToken, user }),
      setUser: (user) => set({ user }),
      clearSession: () => set({ accessToken: null, user: null }),
    }),
    {
      name: 'virashop-auth',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

// Register the token getter once so the fetcher attaches `Authorization`
// without a connections → feature dependency.
setAuthTokenProvider(() => useAuthStore.getState().accessToken);

// Any `401` from any endpoint means this token is no longer valid — drop the
// session everywhere, not just wherever the 401 happened to surface.
setUnauthorizedHandler(() => useAuthStore.getState().clearSession());
