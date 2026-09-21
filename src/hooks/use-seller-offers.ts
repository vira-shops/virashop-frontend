'use client';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { api, type FailedApiResponse } from '@/connections';
import { buildSellerOffersMock } from '@/contracts/endpoints/products/contract';
import type { SellerOffersQuery, SellerOffersResponse } from '@/contracts/endpoints/products';
import { queryKeys } from './query-keys';

/**
 * `GET /products/{slug}/offers` — every storefront carrying the product,
 * for the PDP's «فروشنده ها» list.
 *
 * The route is NOT on the backend yet (it 404s), so this always resolves the
 * contract mock, the same way `use-best-sellers.ts` does. Two lines change
 * when it ships: drop `useMock`, drop the mock branch.
 */
export const useSellerOffers = (
  slug: string,
  query: SellerOffersQuery,
  /** Live product price — anchors the mock offers so they quote this product. */
  basePrice?: number,
): UseQueryResult<SellerOffersResponse, FailedApiResponse> =>
  useQuery<SellerOffersResponse, FailedApiResponse>({
    queryKey: queryKeys.sellerOffers(slug, query.channel, query.sort, basePrice),
    enabled: Boolean(slug),
    queryFn: async () => {
      // The static contract mock can't key off `{slug}` or `sort`, so resolve
      // the right payload here — same limitation as `use-product.ts`.
      const mock = buildSellerOffersMock(slug, query.sort, basePrice);

      if (mock) return mock;

      const response = await api(
        'products',
        'getOffers',
        { query, useMock: true },
        {
          pathParams: { slug },
        },
      );

      if (response.status !== 200) {
        throw response;
      }

      return response.data;
    },
  });
