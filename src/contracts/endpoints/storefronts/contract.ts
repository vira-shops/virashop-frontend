import { Contracts, apiResponseWrapper, mockDataWrapper } from '@/connections';
import { EmptyRequestSchema } from '@/contracts/common';
import { StorefrontShowcaseResponseSchema } from './schemas';

const STOREFRONTS_MOCK = [
  {
    image: '/images/landing/hero/retail.png',
    imageAlt: 'خرید روزمره و عمده',
    buttonLabel: 'خرید روزمره و عمده',
    buttonColor: 'retail' as const,
  },
  {
    image: '/images/landing/hero/whole-sale.png',
    imageAlt: 'کسبه',
    buttonLabel: 'کسبه',
    buttonColor: 'wholesale' as const,
  },
];

export const storefrontsContracts = {
  storefronts: {
    getShowcase: {
      method: 'GET',
      path: '/storefronts/showcase',
      request: EmptyRequestSchema,
      response: apiResponseWrapper(StorefrontShowcaseResponseSchema),
      mockData: mockDataWrapper(STOREFRONTS_MOCK),
    },
  },
} as const satisfies Contracts;
