import * as React from 'react';
import { CategoryCard } from '@/components/shared/category-card';
import { cn } from '@/utils/ui';
import type { CategoryIconNavProps } from './types';

/**
 * One horizontally scrollable row of category tiles, shared by the storefront
 * and catalog heroes — the same swipe behaviour as the story bar at every
 * width. The active tile is outlined with the storefront's primary colour.
 */
export const CategoryIconNav: React.FC<CategoryIconNavProps> = ({
  items,
  activeId,
  className,
  itemClassName,
  activeItemClassName = 'border-primary-500 border-2',
}) => {
  if (items.length === 0) return null;

  return (
    <nav aria-label="دسته‌بندی‌ها" className={cn('w-full', className)}>
      {/* `mx-auto` centers the row while it fits and lets it scroll once it
          does not — centering the scroll container itself would clip the
          leading tiles. */}
      <div className="no-scrollbar h-fit overflow-x-auto">
        <div className="mx-auto flex w-fit items-start gap-4 md:gap-6">
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
        </div>
      </div>
    </nav>
  );
};

CategoryIconNav.displayName = 'CategoryIconNav';
