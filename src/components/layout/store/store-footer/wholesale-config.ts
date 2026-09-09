'use client';

import {
  GuaranteIcon,
  DelivaryIcon,
  PaymentIcon,
  SupportIcon,
  WhatsappIcon,
  TelegramIcon,
  InstagramIcon,
} from '@icons';
import { PATHS } from '@/routes/paths';
import type { StoreFooterConfig } from './types';

export const wholesaleStoreFooterConfig: StoreFooterConfig = {
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
  featureBandClassName: 'bg-blue-50',
};
