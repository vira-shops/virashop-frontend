'use client';

import * as React from 'react';
import { useHydration } from '@/hooks/use-hydration';
import { useLogout } from './use-logout';
import { useAuthStore } from './auth-store';

/**
 * Header-facing session state — hydration-guarded so the persisted store is
 * only read after rehydration (no SSR mismatch), plus a logout action that
 * drops the session even when the API call fails (e.g. token denylisted).
 */
export const useAuthSession = () => {
  const mounted = useHydration(useAuthStore);
  const user = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.clearSession);
  const logout = useLogout();

  const signOut = React.useCallback(async () => {
    try {
      // Denylists the token server-side; a 401 here is still a successful
      // logout for the client.
      await logout.mutateAsync();
    } catch {
      // Session is dropped regardless.
    }

    clearSession();
  }, [logout, clearSession]);

  return { mounted, user, signOut, isPending: logout.isPending };
};
