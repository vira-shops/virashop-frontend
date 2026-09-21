'use client';

import * as React from 'react';
import { Button, RangeSlider, Typography } from '@/components/ui';
import { cn } from '@/utils/ui';
import type { ProductFilterPanelProps } from './types';

/**
 * Price range + single-select category filter — content-agnostic, reused in
 * both the desktop sidebar `<aside>` and the mobile filter `Modal`.
 */
export const ProductFilterPanel: React.FC<ProductFilterPanelProps> = ({
  priceMin,
  priceMax,
  priceValue,
  formatPrice = (value) => String(value),
  onPriceChange,
  onPriceCommit,
  categories,
  activeCategorySlug,
  onCategorySelect,
  onClear,
  className,
  categoryListClassName,
}) => (
  <div className={cn('flex flex-col gap-8', className)}>
    <div className="flex items-center justify-between">
      <Typography variant="h6" className="text-gray-900">
        فیلترها
      </Typography>
      {onClear && (
        <Button size="xs" variant="ghost" color="primary" onClick={onClear}>
          حذف فیلترها
        </Button>
      )}
    </div>

    <div className="flex flex-col gap-4">
      <Typography variant="body-sm" className="text-gray-700">
        محدوده قیمت
      </Typography>
      <RangeSlider
        min={priceMin}
        max={priceMax}
        value={priceValue}
        formatLabel={formatPrice}
        onValueChange={onPriceChange}
        onValueCommit={onPriceCommit}
      />
    </div>

    {categories.length > 0 && (
      <div className="flex flex-col gap-4">
        <Typography variant="body-sm" className="text-gray-700">
          دسته‌بندی
        </Typography>
        <ul className={cn('flex flex-col gap-2', categoryListClassName)}>
          {categories.map((category) => {
            const isActive = category.slug === activeCategorySlug;

            return (
              <li key={category.id}>
                <button
                  type="button"
                  onClick={() => onCategorySelect?.(category.slug)}
                  className={cn(
                    'rounded-4 flex w-full items-center justify-between px-3 py-2 text-start transition-colors',
                    isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50',
                  )}
                >
                  <Typography variant="body-sm">{category.label}</Typography>
                  {category.productCount !== undefined && (
                    <Typography variant="caption-md" className="text-gray-300">
                      {category.productCount}
                    </Typography>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    )}
  </div>
);

ProductFilterPanel.displayName = 'ProductFilterPanel';
