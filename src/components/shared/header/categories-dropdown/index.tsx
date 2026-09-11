'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  BottleIcon,
  BurgerMenuIcon,
  CackeIcon,
  CheeseIcon,
  DownArrowIcon,
  EggIcon,
  FishIcon,
  LeafIcon,
  PcIcon,
  ShopIcon,
  TeaIcon,
} from '@icons';
import { Button, Skeleton, Typography } from '@/components/ui';
import { usePopularCategories } from '@/hooks';
import { cn } from '@/utils/ui';
import type { PopularCategory, RetailSubcategory } from '@/contracts/endpoints/categories/schemas';
import {
  CATEGORIES_ARIA_LABEL,
  CATEGORIES_SKELETON_COUNT,
  CATEGORIES_TRIGGER_LABEL,
  MEGA_PANEL_COLUMNS,
  MEGA_PANEL_HEIGHT_PX,
  MEGA_PANEL_MAX_WIDTH_PX,
  MEGA_PANEL_ROWS,
  MEGA_PANEL_SIDEBAR_WIDTH_PX,
  MEGA_PANEL_TOP_OFFSET_PX,
} from './constants';
import type { CategoriesDropdownProps } from './types';

const ICON_MAP: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  BottleIcon,
  CackeIcon,
  CheeseIcon,
  EggIcon,
  FishIcon,
  LeafIcon,
  PcIcon,
  ShopIcon,
  TeaIcon,
};

const TOTAL_GROUPS = MEGA_PANEL_COLUMNS * MEGA_PANEL_ROWS;

// --- Sub-components (file-local) -------------------------------------------

const CategorySidebarItem: React.FC<{
  category: PopularCategory;
  isActive: boolean;
  onActivate: () => void;
}> = ({ category, isActive, onActivate }) => {
  const Icon = category.icon ? ICON_MAP[category.icon] : null;

  return (
    <div
      className={cn(
        'flex w-full items-center gap-3 rounded-none border-l-2 px-5 py-4 text-right transition-colors',
        isActive
          ? 'border-primary-500 text-primary-500 bg-primary-500/10'
          : 'border-transparent text-gray-700 hover:bg-gray-50',
      )}
    >
      <Button
        variant="ghost"
        size="sm"
        type="button"
        role="menuitem"
        aria-current={isActive ? 'true' : undefined}
        onMouseEnter={onActivate}
        onFocus={onActivate}
        rightIcon={Icon && <Icon className="size-10" aria-hidden="true" />}
        fullWidth
        className={cn(
          'justify-start gap-4 text-black hover:bg-transparent',
          isActive && 'text-primary-500',
        )}
      >
        {category.title}
      </Button>
    </div>
  );
};

const CategoryGroupSection: React.FC<{
  group: RetailSubcategory;
  links: { id: string; title: string; href?: string }[];
}> = ({ group, links }) => (
  <div className="flex flex-col">
    <Link href={group.href ?? '#'} className="hover:text-primary-500 mb-3 flex items-center gap-2">
      <span className="bg-primary-500 h-4 w-px shrink-0" aria-hidden="true" />
      <Typography variant="caption-lg">{group.title}</Typography>
      <DownArrowIcon className="size-5 shrink-0 rotate-90 text-gray-400" aria-hidden="true" />
    </Link>

    <ul className="flex flex-col gap-1">
      {links.map((link) => (
        <li key={link.id}>
          <Typography
            href={link.href ?? '#'}
            variant="body-xs"
            className="hover:text-primary-500 w-fit"
          >
            {link.title}
          </Typography>
        </li>
      ))}
    </ul>
  </div>
);

const CategoryContent: React.FC<{ category: PopularCategory }> = ({ category }) => {
  const groups = category.subcategories.slice(0, TOTAL_GROUPS);

  return (
    <div
      className="grid h-full gap-x-12 gap-y-8"
      style={{
        gridTemplateColumns: `repeat(${MEGA_PANEL_COLUMNS}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${MEGA_PANEL_ROWS}, minmax(0, 1fr))`,
      }}
    >
      {groups.map((group) => (
        <CategoryGroupSection key={group.id} group={group} links={group.items} />
      ))}
    </div>
  );
};

const MegaPanel: React.FC<{
  categories: PopularCategory[];
  activeCategoryId: string | null;
  onCategoryActivate: (id: string) => void;
}> = ({ categories, activeCategoryId, onCategoryActivate }) => {
  const activeCategory = categories.find((c) => c.id === activeCategoryId) ?? categories[0];

  return (
    <div
      role="menu"
      aria-label={CATEGORIES_ARIA_LABEL}
      className={cn(
        'fixed left-1/2 z-40 -translate-x-1/2 -translate-y-px',
        'rounded-b-8 shodow-t-none border border-t-0 border-gray-100 bg-white shadow-sm',
      )}
      style={{
        top: MEGA_PANEL_TOP_OFFSET_PX,
        maxWidth: MEGA_PANEL_MAX_WIDTH_PX,
        width: 'calc(100% - 32px)',
        height: MEGA_PANEL_HEIGHT_PX,
      }}
    >
      <div className="flex h-full">
        <aside
          className="overflow-y-auto border-l border-gray-100"
          style={{ width: MEGA_PANEL_SIDEBAR_WIDTH_PX }}
        >
          {categories.map((category) => (
            <CategorySidebarItem
              key={category.id}
              category={category}
              isActive={category.id === activeCategory?.id}
              onActivate={() => onCategoryActivate(category.id)}
            />
          ))}
        </aside>

        <div className="flex-1 overflow-y-auto p-8">
          {activeCategory ? (
            <CategoryContent category={activeCategory} />
          ) : (
            <Skeleton className="h-full w-full" />
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main component --------------------------------------------------------

export const CategoriesDropdown: React.FC<CategoriesDropdownProps> = ({ className }) => {
  const { data, isLoading } = usePopularCategories();
  const categories = data ?? [];
  const [open, setOpen] = React.useState(false);
  // Lazy initial state — picks the first category as default on first render
  // when data is already available, otherwise stays null until data arrives.
  const [activeCategoryId, setActiveCategoryId] = React.useState<string | null>(
    () => categories[0]?.id ?? null,
  );

  // Once the query resolves and we have categories, seed the default active.
  // Only depend on the first category's id (string) to keep the effect stable.
  // The synchronous setState here is intentional — it only runs once when the
  // initial data arrives and the linter's "cascading render" warning does not
  // apply to this single-shot initialization.
  const firstCategoryId = categories[0]?.id;
  React.useEffect(() => {
    if (!activeCategoryId && firstCategoryId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveCategoryId(firstCategoryId);
    }
  }, [activeCategoryId, firstCategoryId]);

  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;

    const handleMouseDown = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className={cn('relative', className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={CATEGORIES_ARIA_LABEL}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-transparent"
      >
        <BurgerMenuIcon className="size-10 text-gray-600" aria-hidden="true" />
        <Typography variant="caption-lg" className="text-gray-600">
          {CATEGORIES_TRIGGER_LABEL}
        </Typography>
      </button>

      {open &&
        (isLoading ? (
          <div
            role="menu"
            aria-label={CATEGORIES_ARIA_LABEL}
            className={cn(
              'fixed left-1/2 z-40 -translate-x-1/2',
              'rounded-b-8 border border-gray-100 bg-white p-11 shadow-sm',
            )}
            style={{
              top: MEGA_PANEL_TOP_OFFSET_PX,
              maxWidth: MEGA_PANEL_MAX_WIDTH_PX,
              width: 'calc(100% - 32px)',
              height: MEGA_PANEL_HEIGHT_PX,
            }}
            aria-hidden="true"
          >
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: CATEGORIES_SKELETON_COUNT }).map((_, index) => (
                <Skeleton key={index} className="h-9 w-full" />
              ))}
            </div>
          </div>
        ) : (
          <MegaPanel
            categories={categories}
            activeCategoryId={activeCategoryId}
            onCategoryActivate={setActiveCategoryId}
          />
        ))}
    </div>
  );
};

CategoriesDropdown.displayName = 'CategoriesDropdown';
