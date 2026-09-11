'use client';

import * as React from 'react';
import type { ReactNode } from 'react';
import { useAuthMe } from '@/hooks';
import { useAuthStore } from '@/features/auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const setUser = useAuthStore((state) => state.setUser);
  const clearSession = useAuthStore((state) => state.clearSession);

  const me = useAuthMe({ enabled: Boolean(accessToken) });

  React.useEffect(() => {
    if (me.data) {
      setUser(me.data);
    }
  }, [me.data, setUser]);

  React.useEffect(() => {
    if (me.isError && me.error?.status === 401) {
      clearSession();
    }
  }, [me.isError, me.error, clearSession]);

  return <>{children}</>;
}
