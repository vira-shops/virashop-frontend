import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { NewsCard } from './news-card';

const meta: Meta<typeof NewsCard> = {
  title: 'Shared/NewsCard',
  component: NewsCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NewsCard>;

export const Basic: Story = {
  args: {
    image: { src: '/images/landing/tech-news/news-01.png', alt: 'هوش مصنوعی' },
    title: 'هوش مصنوعی، آینده خرید آنلاین',
    excerpt: 'چطور مدل‌های زبانی تجربه‌ی خرید مشتریان را دگرگون می‌کنند.',
    href: '/blog',
  },
};

export const WithoutLink: Story = {
  name: 'بدون لینک',
  render: () => (
    <div className="w-72">
      <NewsCard
        image={{ src: '/images/landing/tech-news/news-02.png' }}
        title="انقلاب پرداخت‌های دیجیتال"
        excerpt="از کیف پول الکترونیکی تا پرداخت بی‌لمسی."
      />
    </div>
  ),
};

export const CustomLinkLabel: Story = {
  name: 'لیبل سفارشی لینک',
  render: () => (
    <div className="w-72">
      <NewsCard
        image={{ src: '/images/landing/tech-news/news-03.png' }}
        title="لجستیک هوشمند در فروش عمده"
        excerpt="بهینه‌سازی مسیر توزیع با داده‌های لحظه‌ای."
        href="/blog"
        linkLabel="ادامه مطلب"
      />
    </div>
  ),
};

export const StyleOverrides: Story = {
  name: 'Override استایل',
  render: () => (
    <div className="w-72">
      <NewsCard
        image={{ src: '/images/landing/tech-news/news-04.png' }}
        title="امنیت سایبری در تجارت الکترونیک"
        excerpt="راهکارهای عملی برای محافظت از داده‌ی مشتریان."
        href="/blog"
        titleClassName="text-primary"
        linkClassName="text-warning-red"
        className="rounded-11"
      />
    </div>
  ),
};
