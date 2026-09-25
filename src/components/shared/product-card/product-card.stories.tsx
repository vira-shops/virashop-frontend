import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProductCard } from './product-card';

const meta: Meta<typeof ProductCard> = {
  title: 'Shared/ProductCard',
  component: ProductCard,
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Full: Story = {
  args: {
    image: { src: '/images/landing/big-offer/01.png', alt: 'پکیج صرفه‌جویی خانوار' },
    startBadge: 'اقساط ۵ ماهه',
    endBadge: '۲۰٪ تخفیف',
    title: 'پکیج صرفه‌جویی خانوار با تنوع کامل کالا',
    priceLabel: 'قیمت از',
    price: '۴۵۰٬۰۰۰',
    stockNote: 'در ۷۲ فروشگاه',
    action: { label: 'خرید', href: '/wholesale' },
  },
};

export const WithoutBadges: Story = {
  args: {
    image: { src: '/images/landing/big-offer/02.png', alt: 'سبد پروتئین ویژه' },
    title: 'سبد پروتئین ویژه',
    priceLabel: 'قیمت از',
    price: '۸۹۰٬۰۰۰',
    stockNote: 'در ۲۴ فروشگاه',
    action: { label: 'خرید', href: '/wholesale' },
  },
};

export const WithoutPrice: Story = {
  args: {
    image: { src: '/images/landing/big-offer/03.png', alt: 'خشکبار درجه یک' },
    endBadge: '۱۰٪ تخفیف',
    title: 'خشکبار درجه یک، مستقیم از تولیدکننده',
    stockNote: 'در ۱۵۰ فروشگاه',
    action: { label: 'خرید', href: '/wholesale' },
  },
};

export const WithClickAction: Story = {
  args: {
    image: { src: '/images/landing/big-offer/04.png', alt: 'نوشیدنی گرم' },
    title: 'چای و نوشیدنی گرم',
    priceLabel: 'قیمت از',
    price: '۱۲۰٬۰۰۰',
    stockNote: 'در ۳۶ فروشگاه',
    action: { label: 'خرید', onClick: () => undefined },
  },
};

export const Favorite: Story = {
  name: 'علاقه‌مندی (حذف + قیمت قبلی)',
  args: {
    image: { src: '/images/landing/big-offer/02.png', alt: 'پنیر پیتزا' },
    title: 'تی شرت ورزشی مردانه ۱۹۹۱ اس دبلیو مدل TS1927',
    price: '۲٬۵۴۰٬۰۰۰',
    originalPrice: '۲٬۸۰۰٬۰۰۰',
    onRemove: () => undefined,
    removeLabel: 'حذف از علاقه‌مندی‌ها',
    action: { label: 'افزودن به سبد', href: '#' },
  },
};

export const FavoriteHorizontal: Story = {
  name: 'علاقه‌مندی افقی (موبایل)',
  args: { ...Favorite.args, orientation: 'horizontal' },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};
