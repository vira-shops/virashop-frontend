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

/** Discounted mocks end a day from now, so the countdown has something to show. */
const SALE_ENDS_AT = new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString();

/**
 * A 4-card rhythm mirroring the design: discounted with a deadline, plain,
 * out of stock, plain.
 */
export const FAVORITES_MOCK: FavoriteProduct[] = Array.from({ length: 12 }, (_, index) => {
  const discounted = index % 2 === 1;

  return {
    id: index + 1,
    productSlug: `favorite-${index + 1}`,
    channel: 'RETAIL',
    name: NAMES[index % NAMES.length],
    image: `/images/landing/big-offer/0${(index % 5) + 1}.png`,
    price: 2_540_000,
    originalPrice: discounted ? 2_800_000 : null,
    discountPercent: discounted ? 20 : 0,
    saleEndsAt: discounted ? SALE_ENDS_AT : null,
    inStock: index % 4 !== 0,
  };
});

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
