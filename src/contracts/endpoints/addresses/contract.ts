import { Contracts, apiResponseWrapper, mockDataWrapper } from '@/connections';
import { EmptyRequestSchema, IdRequestSchema, SuccessResponseSchema } from '@/contracts/common';
import {
  AddressInputSchema,
  AddressSchema,
  AddressUpdateRequestSchema,
  AddressesResponseSchema,
  type Address,
} from './schemas';

/**
 * The buyer's saved addresses — used by the checkout picker and the
 * dashboard «آدرس ها» page. NOT LIVE YET — the hooks force these mocks.
 */
export const ADDRESSES_MOCK: Address[] = [
  {
    id: 1,
    title: 'انبار',
    province: 'yazd',
    city: 'yazd',
    line: 'خیابان ۱۷ شهریور، کوچه ۵۴، پلاک ۱۲',
    postalCode: '8915783647',
    plaque: '12',
    unit: '2',
    location: { lat: 31.8974, lng: 54.3569 },
    isDefault: true,
  },
  {
    id: 2,
    title: 'فروشگاه',
    province: 'yazd',
    city: 'ardakan',
    line: 'بلوار آزادگان، خیابان آزادگان ۷۰، پلاک ۷۴',
    postalCode: '8951713451',
    plaque: '74',
    unit: null,
    location: { lat: 32.3101, lng: 54.0175 },
    isDefault: false,
  },
];

export const addressesContracts = {
  addresses: {
    /** `GET /addresses` — saved addresses, default first. */
    getList: {
      method: 'GET',
      path: '/addresses',
      request: EmptyRequestSchema,
      response: apiResponseWrapper(AddressesResponseSchema),
      mockData: mockDataWrapper(ADDRESSES_MOCK),
    },

    /** `POST /addresses` — returns the created address. */
    create: {
      method: 'POST',
      path: '/addresses',
      request: AddressInputSchema,
      response: apiResponseWrapper(AddressSchema),
      mockData: mockDataWrapper(ADDRESSES_MOCK[0]),
    },

    /** `PUT /addresses/{id}` — returns the saved address. */
    update: {
      method: 'PUT',
      path: '/addresses/{id}',
      request: AddressUpdateRequestSchema,
      response: apiResponseWrapper(AddressSchema),
      mockData: mockDataWrapper(ADDRESSES_MOCK[0]),
    },

    /** `PUT /addresses/{id}/default` — the radio selection; clears the previous default. */
    setDefault: {
      method: 'PUT',
      path: '/addresses/{id}/default',
      request: IdRequestSchema,
      response: apiResponseWrapper(SuccessResponseSchema),
      mockData: mockDataWrapper({ success: true }),
    },

    /** `DELETE /addresses/{id}`. */
    remove: {
      method: 'DELETE',
      path: '/addresses/{id}',
      request: IdRequestSchema,
      response: apiResponseWrapper(SuccessResponseSchema),
      mockData: mockDataWrapper({ success: true }),
    },
  },
} as const satisfies Contracts;
