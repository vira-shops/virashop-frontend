import {
  SearchIcon,
  UserIcon,
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
import { wholesaleMetadata } from '@/config/metadata';
import type { StorefrontChannel } from './types';

export const wholesaleChannel: StorefrontChannel = {
  channel: 'WHOLESALE',
  segment: 'wholesale',
  paths: PATHS.WHOLESALE,
  metadata: wholesaleMetadata,
  // mainClassName: 'bg-blue-50',
  priceMax: 50_000_000,

  header: {
    logo: {
      src: '/images/landing/header/header-logo.svg',
      alt: 'ویراشاپس عمده',
    },
    channel: 'WHOLESALE',
    location: { city: 'تهران' },
    // Excludes "دسته‌بندی‌ها" — the desktop header already renders
    // <CategoriesDropdown /> immediately before this list.
    navItems: [
      { label: 'پرفروش‌ها', href: PATHS.WHOLESALE.BEST_SELLERS },
      { label: 'تخفیف‌ها', href: PATHS.WHOLESALE.OFFERS },
      { label: 'درباره ما', href: PATHS.ABOUT },
      { label: 'تماس با ما', href: PATHS.CONTACT },
    ],
    // No Favorites entry — retail-only per PATHS (wholesale has no
    // FAVORITES concept in the storefront today).
    mobileNavItems: [
      { label: 'تماس با ما', href: PATHS.CONTACT },
      { label: 'تخفیف‌ها', href: PATHS.WHOLESALE.OFFERS },
      { label: 'درباره ما', href: PATHS.ABOUT },
      { label: 'پرفروش‌ترین‌ها', href: PATHS.WHOLESALE.BEST_SELLERS },
    ],
    userActions: [
      { icon: <SearchIcon />, ariaLabel: 'جستجو' },
      { icon: <UserIcon />, ariaLabel: 'ورود', href: PATHS.AUTH.LOGIN_FOR('WHOLESALE') },
      { icon: <BasketIcon />, ariaLabel: 'سبد خرید', href: PATHS.CART_FOR('WHOLESALE') },
    ],
  },

  footer: {
    features: [
      { id: 'guarantee', title: 'گارانتی اصالت کالا', Icon: GuaranteIcon },
      { id: 'support', title: 'مشاوره تخصصی خرید', Icon: SupportIcon },
      { id: 'delivery', title: 'ارسال به سراسر کشور', Icon: DelivaryIcon },
      { id: 'payment', title: 'تسویه انعطاف‌پذیر', Icon: PaymentIcon },
    ],
    columns: [
      {
        title: 'راهنمای ویـــــرا شاپس',
        links: [
          { label: 'راهنمای خرید عمده', href: '#' },
          { label: 'شرایط همکاری', href: '#' },
          { label: 'شرایط و قوانین', href: '#' },
        ],
      },
      {
        title: 'خدمات مشتریـــــــان',
        links: [
          { label: 'فروشگاه', href: PATHS.WHOLESALE.ROOT },
          { label: 'حساب کاربری', href: PATHS.AUTH.LOGIN },
          { label: 'سبد خرید', href: PATHS.CART_FOR('WHOLESALE') },
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
    featureBandClassName: 'bg-blue-50',
  },
};
