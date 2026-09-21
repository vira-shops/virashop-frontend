'use client';

import * as React from 'react';
import { Button, Checkbox, RangeSlider, Switch, Typography } from '@/components/ui';
import { DownArrowIcon } from '@icons';
import { cn } from '@/utils/ui';
import type { ProductFilterGroup, ProductFilterPanelProps } from './types';

/** Card shell shared by every filter section. */
const FilterCard: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => <div className={cn('rounded-8 bg-gray-50 p-4', className)}>{children}</div>;

/** Section header that toggles its body open/closed. */
const CollapsibleHeader: React.FC<{
  label: string;
  open: boolean;
  onToggle: () => void;
  id: string;
}> = ({ label, open, onToggle, id }) => (
  <button
    type="button"
    aria-expanded={open}
    aria-controls={id}
    onClick={onToggle}
    className="flex w-full items-center justify-between gap-2 text-start"
  >
    <Typography variant="body-sm" className="text-gray-700">
      {label}
    </Typography>
    <DownArrowIcon
      className={cn(
        'size-5 shrink-0 text-gray-400 transition-transform duration-200',
        open ? 'rotate-0' : 'rotate-90',
      )}
      aria-hidden="true"
    />
  </button>
);

/** One category group: its own collapsible row plus an "all of these" checkbox. */
const CategoryGroup: React.FC<{
  group: ProductFilterGroup;
  defaultOpen: boolean;
  selectedSlugs: string[];
  onToggle?: (slug: string) => void;
  onGroupToggle?: (slugs: string[], selectAll: boolean) => void;
}> = ({ group, defaultOpen, selectedSlugs, onToggle, onGroupToggle }) => {
  const [open, setOpen] = React.useState(group.defaultOpen ?? defaultOpen);
  const bodyId = React.useId();

  const slugs = group.options.map((option) => option.slug);
  const selectedCount = slugs.filter((slug) => selectedSlugs.includes(slug)).length;
  const allSelected = slugs.length > 0 && selectedCount === slugs.length;

  return (
    <div className="flex flex-col gap-3">
      <CollapsibleHeader
        id={bodyId}
        label={group.label}
        open={open}
        onToggle={() => setOpen((prev) => !prev)}
      />

      {open && (
        <div id={bodyId} className="flex flex-col gap-3 pr-2">
          {group.allLabel && onGroupToggle && (
            <Checkbox
              size="sm"
              label={group.allLabel}
              checked={allSelected}
              indeterminate={selectedCount > 0 && !allSelected}
              onChange={() => onGroupToggle(slugs, !allSelected)}
            />
          )}

          {group.options.map((option) => (
            <Checkbox
              key={option.id}
              size="sm"
              label={option.label}
              checked={selectedSlugs.includes(option.slug)}
              onChange={() => onToggle?.(option.slug)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Listing filters — price range, a collapsible category tree, an optional
 * brand facet and the in-stock switch. Content-agnostic: reused as-is in the
 * desktop sidebar and inside the mobile filter sheet.
 */
export const ProductFilterPanel: React.FC<ProductFilterPanelProps> = ({
  priceMin,
  priceMax,
  priceValue,
  formatPrice = (value) => String(value),
  onPriceChange,
  onPriceCommit,
  categoryGroups = [],
  selectedCategorySlugs = [],
  onCategoryToggle,
  onCategoryGroupToggle,
  brands,
  selectedBrandSlugs = [],
  onBrandToggle,
  inStock,
  onInStockChange,
  onClear,
  className,
}) => {
  const [categoriesOpen, setCategoriesOpen] = React.useState(true);
  const [brandsOpen, setBrandsOpen] = React.useState(false);
  const categoriesId = React.useId();
  const brandsId = React.useId();

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {onClear && (
        <Button
          size="xs"
          variant="ghost"
          onClick={onClear}
          className="text-warning-red hover:text-warning-red/80 w-fit p-0 hover:bg-transparent"
        >
          حذف فیلترها
        </Button>
      )}

      <FilterCard className="flex flex-col gap-1">
        <Typography variant="body-sm" className="text-gray-700">
          قیمت
        </Typography>
        <RangeSlider
          min={priceMin}
          max={priceMax}
          value={priceValue}
          formatLabel={formatPrice}
          onValueChange={onPriceChange}
          onValueCommit={onPriceCommit}
        />
      </FilterCard>

      {categoryGroups.length > 0 && (
        <FilterCard className="flex flex-col gap-4">
          <CollapsibleHeader
            id={categoriesId}
            label="دسته بندی"
            open={categoriesOpen}
            onToggle={() => setCategoriesOpen((prev) => !prev)}
          />

          {categoriesOpen && (
            <div id={categoriesId} className="flex flex-col gap-4">
              {categoryGroups.map((group, index) => (
                <CategoryGroup
                  key={group.id}
                  group={group}
                  defaultOpen={index === 0}
                  selectedSlugs={selectedCategorySlugs}
                  onToggle={onCategoryToggle}
                  onGroupToggle={onCategoryGroupToggle}
                />
              ))}
            </div>
          )}
        </FilterCard>
      )}

      {brands && brands.length > 0 && (
        <FilterCard className="flex flex-col gap-4">
          <CollapsibleHeader
            id={brandsId}
            label="برند"
            open={brandsOpen}
            onToggle={() => setBrandsOpen((prev) => !prev)}
          />

          {brandsOpen && (
            <div id={brandsId} className="flex flex-col gap-3">
              {brands.map((brand) => (
                <Checkbox
                  key={brand.id}
                  size="sm"
                  label={brand.label}
                  checked={selectedBrandSlugs.includes(brand.slug)}
                  onChange={() => onBrandToggle?.(brand.slug)}
                />
              ))}
            </div>
          )}
        </FilterCard>
      )}

      {onInStockChange && (
        <FilterCard>
          <Switch
            label="کالای موجود"
            checked={Boolean(inStock)}
            onChange={(event) => onInStockChange(event.target.checked)}
            className="w-full flex-row-reverse justify-between"
            labelClassName="text-gray-700"
          />
        </FilterCard>
      )}
    </div>
  );
};

ProductFilterPanel.displayName = 'ProductFilterPanel';
