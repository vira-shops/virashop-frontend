'use client';

import * as React from 'react';
import { Breadcrumb } from '@/components/shared/breadcrumb';
import { CategoryIconNav } from '@/components/shared/category-icon-nav';
import { HeroSearchBar } from '@/components/shared/hero';
import { cn } from '@/utils/ui';
import type { CatalogHeroProps } from './types';

/**
 * Catalog hero — the tinted band at the top of the listing/search pages,
 * mirroring the storefront hero: breadcrumb trail, the same `HeroSearchBar`,
 * and a row of sibling-category tiles with the current one highlighted.
 */
export const CatalogHero: React.FC<CatalogHeroProps> = ({
  breadcrumbItems = [],
  searchPlaceholder,
  hrefForCategory,
  hrefForSearch,
  categories = [],
  activeCategoryId,
  className,
}) => (
  <section aria-label="جستجو و دسته‌بندی‌ها" className={cn('relative w-full', className)}>
    <div className="bg-primary-500/10 pointer-events-none absolute inset-0" aria-hidden="true" />

    <div className="relative container flex flex-col items-center gap-6 py-12 md:gap-8">
      {breadcrumbItems.length > 0 && (
        <Breadcrumb items={breadcrumbItems} className="no-scrollbar w-full overflow-x-auto" />
      )}

      <div className="w-full md:max-w-3xl">
        <HeroSearchBar
          placeholder={searchPlaceholder}
          hrefForCategory={hrefForCategory}
          hrefForSearch={hrefForSearch}
        />
      </div>

      {categories.length > 0 && (
        <CategoryIconNav
          items={categories}
          activeId={activeCategoryId}
          className="mt-4 md:mt-10 md:max-w-4xl"
        />
      )}
    </div>
  </section>
);

CatalogHero.displayName = 'CatalogHero';
