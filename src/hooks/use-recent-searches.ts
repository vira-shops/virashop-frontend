'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { useHydration } from './use-hydration';

const MAX_RECENT_SEARCHES = 8;

interface RecentSearchesState {
  terms: string[];
  add: (term: string) => void;
  clear: () => void;
}

/** Client-only search history — no server history is kept (see FRONTEND search doc). */
const useRecentSearchesStore = create<RecentSearchesState>()(
  persist(
    (set) => ({
      terms: [],
      add: (term) =>
        set((state) => {
          const trimmed = term.trim();

          if (!trimmed) return state;

          const next = [trimmed, ...state.terms.filter((existing) => existing !== trimmed)].slice(
            0,
            MAX_RECENT_SEARCHES,
          );

          return { terms: next };
        }),
      clear: () => set({ terms: [] }),
    }),
    {
      name: 'virashop-recent-searches',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export interface UseRecentSearchesResult {
  terms: string[];
  add: (term: string) => void;
  clear: () => void;
}

/** Hydration-safe recent-searches list — empty until the persisted store rehydrates on the client. */
export function useRecentSearches(): UseRecentSearchesResult {
  const hydrated = useHydration(useRecentSearchesStore);
  const terms = useRecentSearchesStore((state) => state.terms);
  const add = useRecentSearchesStore((state) => state.add);
  const clear = useRecentSearchesStore((state) => state.clear);

  return { terms: hydrated ? terms : [], add, clear };
}
