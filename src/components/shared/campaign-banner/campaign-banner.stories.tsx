import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CampaignBanner } from './campaign-banner';

/** ~7 days from now so the countdown is always live in Storybook. */
const demoEndsAt = Date.now() + 7 * 24 * 60 * 60 * 1000;

const meta: Meta<typeof CampaignBanner> = {
  title: 'Shared/CampaignBanner',
  component: CampaignBanner,
};

export default meta;
type Story = StoryObj<typeof CampaignBanner>;

export const Full: Story = {
  args: {
    id: 'weekly-offers',
    title: 'Weekly Offers',
    subtitle: 'تخفیف‌های ویژهٔ این هفته',
    endsAt: demoEndsAt,
    viewAll: { label: 'مشاهده همه', href: '/retail/offers' },
    items: [
      {
        id: '1',
        image: { src: '/images/landing/big-offer/01.png', alt: 'پکیج صرفه‌جویی خانوار' },
        startBadge: 'اقساط ۵ ماهه',
        endBadge: '۲۰٪ تخفیف',
        title: 'پکیج صرفه‌جویی خانوار',
        priceLabel: 'قیمت از',
        price: '۴۵۰٬۰۰۰',
        stockNote: 'در ۷۲ فروشگاه',
        action: { label: 'خرید', href: '/retail' },
      },
      {
        id: '2',
        image: { src: '/images/landing/big-offer/02.png', alt: 'سبد پروتئین ویژه' },
        endBadge: '۱۵٪ تخفیف',
        title: 'سبد پروتئین ویژه',
        priceLabel: 'قیمت از',
        price: '۸۹۰٬۰۰۰',
        stockNote: 'در ۲۴ فروشگاه',
        action: { label: 'خرید', href: '/retail' },
      },
      {
        id: '3',
        image: { src: '/images/landing/big-offer/03.png', alt: 'خشکبار درجه یک' },
        title: 'خشکبار درجه یک',
        priceLabel: 'قیمت از',
        price: '۳۲۰٬۰۰۰',
        stockNote: 'در ۱۵۰ فروشگاه',
        action: { label: 'خرید', href: '/retail' },
      },
      {
        id: '4',
        image: { src: '/images/landing/big-offer/04.png', alt: 'نوشیدنی گرم' },
        endBadge: '۱۰٪ تخفیف',
        title: 'چای و نوشیدنی گرم',
        priceLabel: 'قیمت از',
        price: '۱۲۰٬۰۰۰',
        action: { label: 'خرید', href: '/retail' },
      },
    ],
  },
};

export const Ended: Story = {
  args: {
    title: 'کمپین پایان‌یافته',
    endsAt: Date.now() - 60_000,
    items: [
      {
        id: '1',
        image: { src: '/images/landing/big-offer/05.png', alt: 'لوازم پذیرایی' },
        title: 'لوازم پذیرایی',
        priceLabel: 'قیمت از',
        price: '۲۶۰٬۰۰۰',
      },
    ],
  },
};

export const WithoutViewAll: Story = {
  args: {
    title: 'حراج آخر فصل',
    subtitle: 'تا اتمام موجودی',
    endsAt: demoEndsAt,
    items: [
      {
        id: '1',
        image: { src: '/images/landing/big-offer/01.png', alt: 'پکیج صرفه‌جویی خانوار' },
        title: 'پکیج صرفه‌جویی خانوار',
        priceLabel: 'قیمت از',
        price: '۴۵۰٬۰۰۰',
      },
    ],
  },
};
