'use client';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { api, type FailedApiResponse, type SuccessfulApiResponse } from '@/connections';
import { landingQueryKeys } from './query-keys';
import type { PartnerBrand } from '@/contracts/endpoints/brands/schemas';

export type PartnerBrandsData = SuccessfulApiResponse<PartnerBrand[]>;
export type PartnerBrandsError = FailedApiResponse;

export const usePartnerBrands = (): UseQueryResult<
  PartnerBrandsData['data'],
  PartnerBrandsError
> => {
  return useQuery<PartnerBrandsData['data'], PartnerBrandsError>({
    queryKey: landingQueryKeys.partnerBrands(),
    queryFn: async () => {
      const response = await api('brands', 'getPartnerBrands');

      if (response.status !== 200) {
        throw response;
      }

      return response.data;
    },
  });
};
