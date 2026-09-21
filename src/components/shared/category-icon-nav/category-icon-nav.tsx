import * as React from 'react';
import { CategoryCard } from '@/components/shared/category-card';
import { cn } from '@/utils/ui';
import type { CategoryIconNavProps } from './types';

/** Horizontally scrollable row of category tiles — the listing page's child-category nav. */
export const CategoryIconNav: React.FC<CategoryIconNavProps> = ({
  items,
  activeId,
  className,
  itemClassName,
  activeItemClassName = 'ring-primary-500 ring-2',
}) => {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="دسته‌بندی‌ها"
      className={cn('no-scrollbar flex gap-6 overflow-x-auto', className)}
    >
      {items.map((item) => (
        <div key={item.id} className="shrink-0">
          <CategoryCard
            title={item.title}
            image={item.image}
            imageAlt={item.imageAlt}
            href={item.href}
            className={cn(itemClassName, item.id === activeId && activeItemClassName)}
          />
        </div>
      ))}
    </nav>
  );
};

CategoryIconNav.displayName = 'CategoryIconNav';
