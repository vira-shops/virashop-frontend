'use client';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { api, type FailedApiResponse } from '@/connections';
import {
  buildProductDetailMock,
  withWholesalePricing,
} from '@/contracts/endpoints/products/contract';
import type { ProductDetail } from '@/contracts/endpoints/products';
import type { Channel } from '@/validations';
import { queryKeys } from './query-keys';

/** See `use-products.ts` for why mock mode is branched explicitly here. */
const isMockMode = !process.env.NEXT_PUBLIC_API_BASE_URL;

export const useProduct = (
  slug: string,
  channel: Channel = 'RETAIL',
): UseQueryResult<ProductDetail, FailedApiResponse> =>
  useQuery<ProductDetail, FailedApiResponse>({
    queryKey: queryKeys.productDetail(slug, channel),
    enabled: Boolean(slug),
    queryFn: async () => {
      if (isMockMode) {
        const detail = buildProductDetailMock(slug);

        if (!detail) {
          throw {
            status: 404,
            message: 'Product not found',
            errorCode: 'PRODUCT_NOT_FOUND',
          } satisfies FailedApiResponse;
        }

        return channel === 'WHOLESALE' ? withWholesalePricing(detail) : detail;
      }

      const response = await api(
        'products',
        'getDetail',
        { query: { channel } },
        { pathParams: { slug } },
      );

      if (response.status !== 200) {
        throw response;
      }

      return response.data;
    },
  });
