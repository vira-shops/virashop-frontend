import { Contracts, apiResponseWrapper, mockDataWrapper } from '@/connections';
import { EmptyRequestSchema } from '@/contracts/common';
import { PartnerBrandsResponseSchema } from './schemas';

const PARTNER_BRANDS_MOCK = [
  {
    id: '1',
    name: 'آوند',
    logo: '/images/landing/partner-brands/01.png',
    logoAlt: 'لوگوی برند آوند',
  },
  {
    id: '2',
    name: 'بهاران',
    logo: '/images/landing/partner-brands/02.png',
    logoAlt: 'لوگوی برند بهاران',
  },
  {
    id: '3',
    name: 'سپیدار',
    logo: '/images/landing/partner-brands/03.png',
    logoAlt: 'لوگوی برند سپیدار',
  },
  {
    id: '4',
    name: 'کیان',
    logo: '/images/landing/partner-brands/04.png',
    logoAlt: 'لوگوی برند کیان',
  },
  {
    id: '5',
    name: 'نیکان',
    logo: '/images/landing/partner-brands/05.jpg',
    logoAlt: 'لوگوی برند نیکان',
  },
  {
    id: '6',
    name: 'پارس',
    logo: '/images/landing/partner-brands/06.png',
    logoAlt: 'لوگوی برند پارس',
  },
  {
    id: '7',
    name: 'کیان',
    logo: '/images/landing/partner-brands/07.png',
    logoAlt: 'لوگوی برند کیان',
  },
  {
    id: '8',
    name: 'نیکان',
    logo: '/images/landing/partner-brands/08.png',
    logoAlt: 'لوگوی برند نیکان',
  },
  {
    id: '9',
    name: 'پارس',
    logo: '/images/landing/partner-brands/09.png',
    logoAlt: 'لوگوی برند پارس',
  },
  {
    id: '10',
    name: 'پارس',
    logo: '/images/landing/partner-brands/09.png',
    logoAlt: 'لوگوی برند پارس',
  },
];

export const brandsContracts = {
  brands: {
    getPartnerBrands: {
      method: 'GET',
      path: '/brands/partners',
      request: EmptyRequestSchema,
      response: apiResponseWrapper(PartnerBrandsResponseSchema),
      mockData: mockDataWrapper(PARTNER_BRANDS_MOCK),
    },
  },
} as const satisfies Contracts;
