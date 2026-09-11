'use client';

import type { StoreHeaderConfig } from '@/components/shared';
import { SearchIcon, UserIcon, BasketIcon } from '@icons';
import { PATHS } from '@/routes/paths';
import { buildAuthHref } from '@/features/auth';

export const wholesaleConfig: StoreHeaderConfig = {
  logo: {
    src: '/images/landing/header/header-logo.svg',
    alt: 'ویراشاپ عمده',
  },
  brandName: 'ویراشاپ',
  channel: 'WHOLESALE',
  location: { city: 'تهران' },
  navItems: [
    { label: 'دسته‌بندی‌ها', href: PATHS.WHOLESALE.CATEGORIES },
    { label: 'پرفروش‌ها', href: PATHS.WHOLESALE.BEST_SELLERS },
    { label: 'تخفیف‌ها', href: PATHS.WHOLESALE.OFFERS },
    { label: 'درباره ما', href: PATHS.ABOUT },
    { label: 'تماس با ما', href: PATHS.CONTACT },
  ],
  userActions: [
    { icon: <SearchIcon />, ariaLabel: 'جستجو' },
    { icon: <UserIcon />, ariaLabel: 'ورود', href: buildAuthHref('WHOLESALE') },
    { icon: <BasketIcon />, ariaLabel: 'سبد خرید', href: PATHS.CART },
  ],
};
