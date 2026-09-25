import { Contracts, apiResponseWrapper, mockDataWrapper } from '@/connections';
import { EmptyRequestSchema } from '@/contracts/common';
import { ProfileSchema, ProfileUpdateRequestSchema, type Profile } from './schemas';

/** The signed-in buyer's profile. NOT LIVE YET — the hooks force these mocks. */
export const PROFILE_MOCK: Profile = {
  personal: {
    fullName: 'ویرا شاپس',
    mobile: '09123456789',
    nationalId: '0123456789',
    birthDate: '1979-08-18',
    gender: null,
    avatarUrl: null,
  },
  business: {
    name: 'ویرا شاپس',
    phone: '02185645794',
    province: 'yazd',
    city: 'yazd',
    postalCode: '1234567891',
    buyType: 'SUPERMARKET',
    address: 'یزد - خیابان ۱۷ شهریور - کوچه ۲',
    documentUrl: null,
  },
};

export const profileContracts = {
  profile: {
    /** `GET /profile` — personal + business info. */
    get: {
      method: 'GET',
      path: '/profile',
      request: EmptyRequestSchema,
      response: apiResponseWrapper(ProfileSchema),
      mockData: mockDataWrapper(PROFILE_MOCK),
    },

    /** `PUT /profile` — replaces both sections, returns the saved profile. */
    update: {
      method: 'PUT',
      path: '/profile',
      request: ProfileUpdateRequestSchema,
      response: apiResponseWrapper(ProfileSchema),
      mockData: mockDataWrapper(PROFILE_MOCK),
    },
  },
} as const satisfies Contracts;
