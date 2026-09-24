import { Contracts, apiResponseWrapper, mockDataWrapper } from '@/connections';
import { EmptyRequestSchema, IdRequestSchema, SuccessResponseSchema } from '@/contracts/common';
import { FavoritesListResponseSchema, type FavoriteProduct } from './schemas';

/** The buyer's saved products. NOT LIVE YET — the hooks force these mocks. */

const NAMES = [
  'تی شرت ورزشی مردانه ۱۹۹۱ اس دبلیو مدل TS1927',
  'نوشابه کوکاکولا ۳۳۰ میلی‌لیتری',
  'پنیر پیتزا مطهر ۲۵۰ گرمی',
  'گوشت چرخ کرده مهیا پروتئین',
];

export const FAVORITES_MOCK: FavoriteProduct[] = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  productSlug: `favorite-${index + 1}`,
  channel: 'RETAIL',
  name: NAMES[index % NAMES.length],
  image: `/images/landing/big-offer/0${(index % 5) + 1}.png`,
  price: 2_540_000,
  originalPrice: index % 3 === 2 ? null : 2_800_000,
}));

export const favoritesContracts = {
  favorites: {
    /** `GET /favorites` — saved products, newest first. */
    getList: {
      method: 'GET',
      path: '/favorites',
      request: EmptyRequestSchema,
      response: apiResponseWrapper(FavoritesListResponseSchema),
      mockData: mockDataWrapper(FAVORITES_MOCK),
    },

    /** `DELETE /favorites/{id}` — unsave one product. */
    remove: {
      method: 'DELETE',
      path: '/favorites/{id}',
      request: IdRequestSchema,
      response: apiResponseWrapper(SuccessResponseSchema),
      mockData: mockDataWrapper({ success: true }),
    },
  },
} as const satisfies Contracts;
