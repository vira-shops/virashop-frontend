'use client';

import * as React from 'react';
import type { ReactNode } from 'react';
import { useAuthMe } from '@/hooks';
import { useAuthStore } from '@/hooks/auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const setUser = useAuthStore((state) => state.setUser);

  // A `401` here (denylisted/expired token) drops the session globally via
  // the fetcher's unauthorized handler — see `auth-store.ts`.
  const me = useAuthMe({ enabled: Boolean(accessToken) });

  React.useEffect(() => {
    if (me.data) {
      setUser(me.data);
    }
  }, [me.data, setUser]);

  return <>{children}</>;
}
