import { Contracts, apiResponseWrapper, mockDataWrapper } from '@/connections';
import { EmptyRequestSchema } from '@/contracts/common';
import { TechNewsResponseSchema } from './schemas';

const TECH_NEWS_MOCK = [
  {
    id: '1',
    image: '/images/landing/tech-news/news-01.png',
    imageAlt: 'هوش مصنوعی در فروشگاه‌های آنلاین',
    title: 'هوش مصنوعی، آینده خرید آنلاین',
    excerpt: 'چطور مدل‌های زبانی تجربه‌ی خرید مشتریان را دگرگون می‌کنند.',
    href: '/blog',
  },
  {
    id: '2',
    image: '/images/landing/tech-news/news-02.png',
    imageAlt: 'پرداخت‌های دیجیتال',
    title: 'انقلاب پرداخت‌های دیجیتال',
    excerpt: 'از کیف پول الکترونیکی تا پرداخت بی‌لمسی؛ مسیر تحول در سه سال گذشته.',
    href: '/blog',
  },
  {
    id: '3',
    image: '/images/landing/tech-news/news-03.png',
    imageAlt: 'لجستیک هوشمند',
    title: 'لجستیک هوشمند در فروش عمده',
    excerpt: 'بهینه‌سازی مسیر توزیع با داده‌های لحظه‌ای، هزینه‌ها را تا ۳۰٪ کاهش می‌دهد.',
    href: '/blog',
  },
  {
    id: '4',
    image: '/images/landing/tech-news/news-04.png',
    imageAlt: 'امنیت سایبری',
    title: 'امنیت سایبری در تجارت الکترونیک',
    excerpt: 'راهکارهای عملی برای محافظت از داده‌ی مشتریان در سال جدید.',
    href: '/blog',
  },
];

export const postsContracts = {
  posts: {
    getTechNews: {
      method: 'GET',
      path: '/posts/tech-news',
      request: EmptyRequestSchema,
      response: apiResponseWrapper(TechNewsResponseSchema),
      mockData: mockDataWrapper(TECH_NEWS_MOCK),
    },
  },
} as const satisfies Contracts;
