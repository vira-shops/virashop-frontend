import {
  SearchIcon,
  HeartIcon,
  BasketIcon,
  GuaranteIcon,
  DelivaryIcon,
  PaymentIcon,
  SupportIcon,
  WhatsappIcon,
  TelegramIcon,
  InstagramIcon,
} from '@icons';
import { PATHS } from '@/routes/paths';
import { retailMetadata } from '@/config/metadata';
import type { StorefrontChannel } from './types';

export const retailChannel: StorefrontChannel = {
  channel: 'RETAIL',
  segment: 'retail',
  paths: PATHS.RETAIL,
  metadata: retailMetadata,
  priceMax: 5_000_000,

  header: {
    logo: {
      src: '/images/landing/header/header-logo.svg',
      alt: 'ویراشاپ خرده',
    },
    channel: 'RETAIL',
    location: { city: 'تهران' },
    // Excludes "دسته‌بندی‌ها" — the desktop header already renders
    // <CategoriesDropdown /> immediately before this list.
    navItems: [
      { label: 'پرفروش‌ها', href: PATHS.RETAIL.BEST_SELLERS },
      { label: 'تخفیف‌ها', href: PATHS.RETAIL.OFFERS },
      { label: 'درباره ما', href: PATHS.ABOUT },
      { label: 'وبلاگ', href: PATHS.BLOG },
    ],
    mobileNavItems: [
      { label: 'مورد علاقه‌ها', href: PATHS.RETAIL.FAVORITES, icon: 'HeartIcon' },
      { label: 'بلاگ', href: PATHS.BLOG },
      { label: 'تخفیف‌ها', href: PATHS.RETAIL.OFFERS },
      { label: 'درباره ما', href: PATHS.ABOUT },
      { label: 'پرفروش‌ترین‌ها', href: PATHS.RETAIL.BEST_SELLERS },
    ],
    userActions: [
      { icon: <SearchIcon />, ariaLabel: 'جستجو' },
      { icon: <HeartIcon />, ariaLabel: 'ورود', href: PATHS.AUTH.LOGIN_FOR('RETAIL') },
      { icon: <BasketIcon />, ariaLabel: 'سبد خرید', href: PATHS.CART },
    ],
  },

  footer: {
    features: [
      { id: 'guarantee', title: 'گارانتی اصالت', Icon: GuaranteIcon },
      { id: 'support', title: 'پشتیبانی ۲۴ ساعته', Icon: SupportIcon },
      { id: 'delivery', title: 'تحویل فوری', Icon: DelivaryIcon },
      { id: 'payment', title: 'شیوه پـرداخت', Icon: PaymentIcon },
    ],
    columns: [
      {
        title: 'راهنمای ویـــــرا شاپس',
        links: [
          { label: 'پاسخ به پرسش‌های متداول', href: '#' },
          { label: 'شرایط استفاده', href: '#' },
          { label: 'شرایط و قوانین', href: '#' },
        ],
      },
      {
        title: 'خدمات مشتریـــــــان',
        links: [
          { label: 'فروشگاه', href: PATHS.RETAIL.ROOT },
          { label: 'حساب کاربری', href: PATHS.AUTH.LOGIN },
          { label: 'سبد خرید', href: PATHS.CART },
          { label: 'فرصت های شغلی', href: '#' },
        ],
      },
      {
        title: 'ویــــــرا شاپس',
        links: [
          { label: 'سیاست حریم خصوصی', href: '#' },
          { label: 'درباره ویرا شاپس', href: PATHS.ABOUT },
          { label: 'تماس با ویرا شاپس', href: PATHS.CONTACT },
          { label: 'چرا ویرا شاپس؟', href: '#' },
        ],
      },
    ],
    contact: {
      title: 'پل های ارتبــــــاطی',
      phoneLabel: 'تلفن',
      phone: '035 37246317',
      phoneHref: 'tel:03537246317',
      socials: [
        { id: 'whatsapp', label: 'واتساپ', href: '#', Icon: WhatsappIcon },
        { id: 'telegram', label: 'تلگرام', href: '#', Icon: TelegramIcon },
        { id: 'instagram', label: 'اینستاگرام', href: '#', Icon: InstagramIcon },
      ],
    },
  },
};
