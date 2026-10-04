'use client';

import { useMutation } from '@tanstack/react-query';
import { searchPlace, type GeocodeResult } from '@/connections';

/**
 * Map-picker place search (OpenStreetMap Nominatim). A mutation rather than a
 * query: it runs only when the user submits, and results are not cached.
 */
export const usePlaceSearch = () =>
  useMutation<GeocodeResult | null, Error, string>({
    mutationKey: ['place-search'],
    mutationFn: (query) => searchPlace(query),
  });
