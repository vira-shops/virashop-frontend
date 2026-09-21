'use client';

import * as React from 'react';
import { CategoryShowcase as SharedCategoryShowcase } from '@/components/shared';
import { BottleIcon } from '@icons';
import { usePopularCategories } from '@/hooks';
import {
  CATEGORY_ICONS,
  WHOLESALE_CATEGORIES_SECTION_ID,
  WHOLESALE_CATEGORIES_SOON_LABEL,
  WHOLESALE_CATEGORIES_SUBTITLE,
  WHOLESALE_CATEGORIES_TITLE,
} from '@/features/storefront/components/wholesale/constants';

export const CategoryShowcase: React.FC<{ className?: string }> = ({ className }) => {
  const categoriesQuery = usePopularCategories('WHOLESALE');
  const categories = categoriesQuery.data ?? [];

  return (
    <SharedCategoryShowcase
      id={WHOLESALE_CATEGORIES_SECTION_ID}
      title={WHOLESALE_CATEGORIES_TITLE}
      subtitle={WHOLESALE_CATEGORIES_SUBTITLE}
      soonLabel={WHOLESALE_CATEGORIES_SOON_LABEL}
      iconMap={CATEGORY_ICONS}
      fallbackIcon={BottleIcon}
      isLoading={categoriesQuery.isLoading}
      className={className}
      items={categories.slice(0, 8).map((category) => ({
        id: category.id,
        title: category.title,
        href: category.href,
        iconKey: category.slug,
      }))}
    />
  );
};

CategoryShowcase.displayName = 'CategoryShowcase';
