import { Contracts, apiResponseWrapper, mockDataWrapper } from '@/connections';
import { EmptyRequestSchema } from '@/contracts/common';
import {
  DeliveryOptionsResponseSchema,
  PaymentMethodsResponseSchema,
  type DeliveryOptionsResponse,
  type PaymentMethod,
} from './schemas';

/**
 * Checkout reference data. NOT LIVE YET — `/shipping-methods`
 * and `/payment-methods` both 404 on the current backend, so the hooks in
 * `src/hooks/` force these mocks the same way `use-best-sellers.ts` does.
 * Drop the `useMock` flag in each hook once the routes ship.
 */
const DELIVERY_TIMES = [
  { id: 'morning', label: 'ساعت ۸-۱۲' },
  { id: 'evening', label: 'ساعت ۱۶-۲۲' },
];

/** Five selectable delivery days, newest first — the «تاریخ تحویل» strip. */
const DELIVERY_WEEKDAYS = [
  { id: 'day-1', weekday: 'دوشنبه', day: '۱۲', isHoliday: false },
  { id: 'day-2', weekday: 'سه شنبه', day: '۱۳', isHoliday: false },
  { id: 'day-3', weekday: 'چهار شنبه', day: '۱۴', isHoliday: false },
  { id: 'day-4', weekday: 'پنج شنبه', day: '۱۵', isHoliday: false },
  { id: 'day-5', weekday: 'جمعه', day: '۱۶', isHoliday: true },
];

export const DELIVERY_OPTIONS_MOCK: DeliveryOptionsResponse = {
  methods: [
    { id: 'express', label: 'ارسال پیشتاز', price: 0 },
    { id: 'standard', label: 'ارسال با پست معمولی', price: 0 },
  ],
  days: DELIVERY_WEEKDAYS.map((day) => ({ ...day, times: DELIVERY_TIMES })),
};

export const PAYMENT_METHODS_MOCK: PaymentMethod[] = [
  { id: 'online', label: 'پرداخت اینترنتی' },
  { id: 'wallet', label: 'کیف پول ویراشاپس' },
  { id: 'credit', label: 'پرداخت اعتباری (چک)' },
  { id: 'on-delivery', label: 'پرداخت در محل' },
];

export const checkoutContracts = {
  checkout: {
    /** `GET /shipping/options` — shipping methods plus the delivery calendar. */
    getDeliveryOptions: {
      method: 'GET',
      path: '/shipping/options',
      request: EmptyRequestSchema,
      response: apiResponseWrapper(DeliveryOptionsResponseSchema),
      mockData: mockDataWrapper(DELIVERY_OPTIONS_MOCK),
    },

    /** `GET /payment-methods` — what the buyer can pay with. */
    getPaymentMethods: {
      method: 'GET',
      path: '/payment-methods',
      request: EmptyRequestSchema,
      response: apiResponseWrapper(PaymentMethodsResponseSchema),
      mockData: mockDataWrapper(PAYMENT_METHODS_MOCK),
    },
  },
} as const satisfies Contracts;
