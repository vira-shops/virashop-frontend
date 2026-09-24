import { Contracts, apiResponseWrapper, mockDataWrapper } from '@/connections';
import { EmptyRequestSchema, IdRequestSchema, SuccessResponseSchema } from '@/contracts/common';
import { PATHS } from '@/routes/paths';
import {
  AnnouncementsResponseSchema,
  NotificationsListResponseSchema,
  type Announcement,
  type UserNotification,
} from './schemas';

/**
 * Notifications + dashboard announcements. NOT LIVE YET — the hooks force
 * these mocks; drop `useMock` there once the routes ship.
 */

const LOREM =
  'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.';

export const NOTIFICATIONS_MOCK: UserNotification[] = [
  {
    id: 1,
    title: 'سفارش شما ارسال شد',
    body: `${LOREM} ${LOREM}`,
    createdAt: '2021-08-12T09:30:00Z',
    read: false,
  },
  {
    id: 2,
    title: 'تخفیف ویژه آخر هفته',
    body: LOREM,
    createdAt: '2021-08-12T08:00:00Z',
    read: false,
  },
  {
    id: 3,
    title: 'پرداخت با موفقیت انجام شد',
    body: LOREM,
    createdAt: '2021-08-10T12:00:00Z',
    read: true,
  },
  {
    id: 4,
    title: 'به‌روزرسانی قوانین ویراشاپس',
    body: LOREM,
    createdAt: '2021-08-02T07:15:00Z',
    read: true,
  },
];

export const ANNOUNCEMENTS_MOCK: Announcement[] = [
  {
    id: 1,
    title: 'سفارش شما ارسال شد',
    body: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است...',
    href: PATHS.DASHBOARD.BUYER.ORDER(1001),
  },
  {
    id: 2,
    title: 'جشنواره تخفیف تابستانه',
    body: 'تا ۴۰٪ تخفیف روی کالاهای اساسی — فقط تا پایان هفته فرصت دارید.',
    href: PATHS.RETAIL.OFFERS,
  },
  {
    id: 3,
    title: 'پروفایل خود را کامل کنید',
    body: 'با تکمیل اطلاعات کسب‌وکار، از قیمت‌های عمده و ارسال رایگان بهره‌مند شوید.',
    href: PATHS.DASHBOARD.BUYER.PROFILE,
  },
];

export const notificationsContracts = {
  notifications: {
    /** `GET /notifications` — newest first, read and unread. */
    getList: {
      method: 'GET',
      path: '/notifications',
      request: EmptyRequestSchema,
      response: apiResponseWrapper(NotificationsListResponseSchema),
      mockData: mockDataWrapper(NOTIFICATIONS_MOCK),
    },

    /** `PATCH /notifications/{id}/read` — marks one notification as read. */
    markRead: {
      method: 'PATCH',
      path: '/notifications/{id}/read',
      request: IdRequestSchema,
      response: apiResponseWrapper(SuccessResponseSchema),
      mockData: mockDataWrapper({ success: true }),
    },

    /** `GET /announcements` — the dashboard banner carousel. */
    getAnnouncements: {
      method: 'GET',
      path: '/announcements',
      request: EmptyRequestSchema,
      response: apiResponseWrapper(AnnouncementsResponseSchema),
      mockData: mockDataWrapper(ANNOUNCEMENTS_MOCK),
    },
  },
} as const satisfies Contracts;
