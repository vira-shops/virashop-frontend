'use client';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { api, type FailedApiResponse } from '@/connections';
import { buildSellerOfferDetailMock } from '@/contracts/endpoints/products/contract';
import type { SellerOfferDetail, SellerOfferDetailQuery } from '@/contracts/endpoints/products';
import { queryKeys } from './query-keys';

/**
 * `GET /products/{slug}/offers/{offerId}` — one seller's full terms, for the
 * selected-seller view of the PDP.
 *
 * Not on the backend yet (the offers routes all 404), so this resolves the
 * contract mock, exactly like `use-seller-offers.ts`.
 */
export const useSellerOffer = (
  slug: string,
  offerId: number | undefined,
  query: SellerOfferDetailQuery,
  /** Live product price — anchors the mock figures to this product. */
  basePrice?: number,
): UseQueryResult<SellerOfferDetail, FailedApiResponse> =>
  useQuery<SellerOfferDetail, FailedApiResponse>({
    queryKey: queryKeys.sellerOffer(slug, offerId ?? 0, query.channel, basePrice),
    enabled: Boolean(slug) && offerId !== undefined,
    queryFn: async () => {
      // The static contract mock can't key off `{slug}`/`{offerId}`, so the
      // right payload is resolved here — same limitation as `use-product.ts`.
      const mock = buildSellerOfferDetailMock(slug, offerId!, basePrice);

      if (mock) return mock;

      const response = await api(
        'products',
        'getOfferDetail',
        { query, useMock: true },
        { pathParams: { slug, offerId: String(offerId) } },
      );

      if (response.status !== 200) {
        throw response;
      }

      return response.data;
    },
  });
