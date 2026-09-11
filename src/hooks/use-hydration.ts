'use client';

import { useSyncExternalStore } from 'react';

/**
 * Minimal shape of a zustand `persist` store — any store created with the
 * persist middleware satisfies it, regardless of its persisted-state type.
 */
interface PersistedStore {
  persist: {
    hasHydrated: () => boolean;
    onFinishHydration: (fn: () => void) => () => void;
  };
}

/**
 * Hydration flag for any zustand `persist` store — reads are safe only after
 * the persisted state has been rehydrated (avoids SSR/CSR mismatches).
 *
 * `useSyncExternalStore` subscribes to the store's `onFinishHydration` event
 * and reads `hasHydrated()` as the snapshot: already-hydrated stores resolve
 * synchronously on the first client render and late hydration re-renders
 * through the store event — no setState-in-effect cascade.
 */
export const useHydration = (useStore: PersistedStore): boolean =>
  useSyncExternalStore(
    (onStoreChange) => useStore.persist.onFinishHydration(onStoreChange),
    () => useStore.persist.hasHydrated(),
    // Server snapshot: persistence is client-only, so never hydrated on SSR.
    () => false,
  );
