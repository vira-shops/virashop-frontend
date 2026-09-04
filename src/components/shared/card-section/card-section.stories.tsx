import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CardSection } from './card-section';

const meta: Meta<typeof CardSection> = {
  title: 'Shared/CardSection',
  component: CardSection,
};

export default meta;
type Story = StoryObj<typeof CardSection>;

export const Full: Story = {
  args: {
    title: 'تخفیف بزرگ',
    link: { label: 'مشاهده همه', href: '/wholesale/offers' },
    className: 'bg-blue-50',
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
        action: { label: 'خرید', href: '/wholesale' },
      },
      {
        id: '2',
        image: { src: '/images/landing/big-offer/02.png', alt: 'سبد پروتئین ویژه' },
        endBadge: '۱۵٪ تخفیف',
        title: 'سبد پروتئین ویژه',
        priceLabel: 'قیمت از',
        price: '۸۹۰٬۰۰۰',
        stockNote: 'در ۲۴ فروشگاه',
        action: { label: 'خرید', href: '/wholesale' },
      },
      {
        id: '3',
        image: { src: '/images/landing/big-offer/03.png', alt: 'خشکبار درجه یک' },
        title: 'خشکبار درجه یک',
        priceLabel: 'قیمت از',
        price: '۳۲۰٬۰۰۰',
        stockNote: 'در ۱۵۰ فروشگاه',
        action: { label: 'خرید', href: '/wholesale' },
      },
    ],
  },
};

export const WithoutLink: Story = {
  args: {
    title: 'پرفروش‌ترین‌ها',
    items: [
      {
        id: '1',
        image: { src: '/images/landing/big-offer/04.png', alt: 'نوشیدنی گرم' },
        title: 'چای و نوشیدنی گرم',
        priceLabel: 'قیمت از',
        price: '۱۲۰٬۰۰۰',
        action: { label: 'خرید', href: '/wholesale' },
      },
      {
        id: '2',
        image: { src: '/images/landing/big-offer/05.png', alt: 'لوازم پذیرایی' },
        title: 'لوازم پذیرایی',
        priceLabel: 'قیمت از',
        price: '۲۶۰٬۰۰۰',
        action: { label: 'خرید', href: '/wholesale' },
      },
    ],
  },
};
