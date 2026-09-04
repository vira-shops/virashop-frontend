import { Contracts, apiResponseWrapper, mockDataWrapper } from '@/connections';
import { EmptyRequestSchema } from '@/contracts/common';
import { CitiesListResponseSchema } from './schemas';

const CITIES_MOCK = [
  { value: 'tehran', label: 'تهران' },
  { value: 'esfahan', label: 'اصفهان' },
  { value: 'shiraz', label: 'شیراز' },
  { value: 'mashhad', label: 'مشهد' },
  { value: 'tabriz', label: 'تبریز' },
  { value: 'karaj', label: 'کرج' },
];

export const citiesContracts = {
  cities: {
    getList: {
      method: 'GET',
      path: '/cities',
      request: EmptyRequestSchema,
      response: apiResponseWrapper(CitiesListResponseSchema),
      mockData: mockDataWrapper(CITIES_MOCK),
    },
  },
} as const satisfies Contracts;
