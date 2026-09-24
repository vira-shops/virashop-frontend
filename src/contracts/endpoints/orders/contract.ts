import { Contracts, apiResponseWrapper, mockDataWrapper } from '@/connections';
import { EmptyRequestSchema, IdRequestSchema } from '@/contracts/common';
import {
  OrderDetailSchema,
  OrderStatsSchema,
  OrdersListQuerySchema,
  OrdersListResponseSchema,
  type OrderDetail,
  type OrderStats,
  type OrderSummary,
  type OrderThumbnail,
} from './schemas';

/**
 * Buyer orders. NOT LIVE YET — `/orders*` 404s on the current backend, so
 * the hooks in `src/hooks/` force these mocks (same arrangement as
 * `use-checkout-options.ts`). Drop `useMock` there once the routes ship.
 */

const PRODUCTS: OrderThumbnail[] = [
  { name: 'نوشابه کولا پپسی', image: '/images/landing/big-offer/01.png' },
  { name: 'شیر میهن', image: '/images/landing/big-offer/02.png' },
  { name: 'سینه مرغ ۱ کیلویی', image: '/images/landing/big-offer/03.png' },
  { name: 'پنیر پیتزا', image: '/images/landing/big-offer/04.png' },
  { name: 'روغن مایع', image: '/images/landing/big-offer/05.png' },
];

const thumbs = (...indexes: number[]): OrderThumbnail[] => indexes.map((i) => PRODUCTS[i]);

export const ORDERS_MOCK: OrderSummary[] = [
  {
    id: 1001,
    trackingCode: '1234567891542',
    total: 2_540_000,
    status: 'PROCESSING',
    paymentStatus: 'PAID',
    createdAt: '2021-08-12T09:30:00Z',
    items: thumbs(0, 1, 2, 3),
  },
  {
    id: 1002,
    trackingCode: '1234567891543',
    total: 2_540_000,
    status: 'CANCELLED',
    paymentStatus: 'FAILED',
    createdAt: '2021-08-12T08:10:00Z',
    items: thumbs(2, 0),
  },
  {
    id: 1003,
    trackingCode: '1234567891544',
    total: 2_540_000,
    status: 'DELIVERED',
    paymentStatus: 'PAID',
    createdAt: '2021-08-11T15:45:00Z',
    items: thumbs(4, 3, 2),
  },
  {
    id: 1004,
    trackingCode: '1234567891545',
    total: 1_180_000,
    status: 'PROCESSING',
    paymentStatus: 'PAID',
    createdAt: '2021-08-09T11:00:00Z',
    items: thumbs(1, 4),
  },
  {
    id: 1005,
    trackingCode: '1234567891546',
    total: 4_320_000,
    status: 'DELIVERED',
    paymentStatus: 'PAID',
    createdAt: '2021-08-02T17:20:00Z',
    items: thumbs(0, 1, 2, 3, 4),
  },
  {
    id: 1006,
    trackingCode: '1234567891547',
    total: 860_000,
    status: 'RETURNED',
    paymentStatus: 'PAID',
    createdAt: '2021-07-28T10:05:00Z',
    items: thumbs(3),
  },
  {
    id: 1007,
    trackingCode: '1234567891548',
    total: 3_050_000,
    status: 'PROCESSING',
    paymentStatus: 'PENDING',
    createdAt: '2021-07-25T13:40:00Z',
    items: thumbs(2, 1, 0),
  },
];

export const ORDER_STATS_MOCK: OrderStats = {
  PROCESSING: 3,
  DELIVERED: 14,
  RETURNED: 5,
  CANCELLED: 0,
};

export const ORDER_DETAIL_MOCK: OrderDetail = {
  id: 1001,
  trackingCode: '1234567891542',
  total: 2_540_000,
  subtotal: 2_540_000,
  status: 'PROCESSING',
  paymentStatus: 'FAILED',
  createdAt: '2021-08-12T09:30:00Z',
  paymentMethod: 'آنلاین',
  shippingMethod: 'پیشتاز',
  shippingCost: 0,
  invoiceUrl: '#',
  sender: {
    fullName: 'حسین حیدری',
    mobile: '09394388475',
    nationalId: '4452154415',
    postalCode: '1234567896',
    plate: '1',
    address: 'یزد - خیابان ۱۷ شهریور - کوچه ۲',
  },
  items: [0, 1, 2].map((index) => ({
    id: index + 1,
    productSlug: `product-${index + 1}`,
    name: PRODUCTS[index].name,
    image: PRODUCTS[index].image,
    unitPrice: 2_540_000,
    quantity: 41,
    total: 2_540_000,
  })),
};

export const ordersContracts = {
  orders: {
    /** `GET /orders/stats` — count per status. */
    getStats: {
      method: 'GET',
      path: '/orders/stats',
      request: EmptyRequestSchema,
      response: apiResponseWrapper(OrderStatsSchema),
      mockData: mockDataWrapper(ORDER_STATS_MOCK),
    },

    /** `GET /orders` — the buyer's orders, newest first. */
    getList: {
      method: 'GET',
      path: '/orders',
      request: OrdersListQuerySchema,
      response: apiResponseWrapper(OrdersListResponseSchema),
      mockData: mockDataWrapper(ORDERS_MOCK),
    },

    /** `GET /orders/{id}` — one order with its lines and sender. */
    getById: {
      method: 'GET',
      path: '/orders/{id}',
      request: IdRequestSchema,
      response: apiResponseWrapper(OrderDetailSchema),
      mockData: mockDataWrapper(ORDER_DETAIL_MOCK),
    },
  },
} as const satisfies Contracts;
