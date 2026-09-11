'use client';

import * as React from 'react';
import Link from 'next/link';
import { BurgerMenuIcon, CancelIcon, DownArrowIcon, HeartIcon, ShopIcon } from '@icons';
import { Button, Typography } from '@/components/ui';
import { LocationBadge, Logo } from '@/components/shared';
import { usePopularCategories } from '@/hooks';
import { cn } from '@/utils/ui';
import type { PopularCategory } from '@/contracts/endpoints/categories/schemas';
import { CATEGORIES_SECTION_TITLE, MOBILE_NAV_ITEMS } from './constants';

interface RetailMobileSidebarProps {
  logo: { src: string; alt: string };
  /** Fallback city for the location badge — comes from the header config. */
  city?: string;
}

// --- Icon map for dynamic icon rendering ------------------------------------
const ICON_MAP: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  HeartIcon,
  ShopIcon,
};

// --- File-local sub-components ----------------------------------------------

const SidebarBackdrop: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
);

const SidebarHeader: React.FC<{ logo: { src: string; alt: string }; onClose: () => void }> = ({
  logo,
  onClose,
}) => (
  <div className="container flex items-center justify-between border-b border-gray-100 py-8">
    <Logo src={logo.src} alt={logo.alt} className="flex flex-1 justify-center" />
    <Button
      variant="ghost"
      size="sm"
      color="primary"
      icon={<CancelIcon className="size-9" />}
      aria-label="بستن"
      onClick={onClose}
    />
  </div>
);

/** Navigation links at the top of the sidebar (Favorites, Blog, Offers, About, Best Sellers). */
const NavigationLinks: React.FC<{ onItemClick: () => void }> = ({ onItemClick }) => (
  <nav className="flex flex-col gap-8 px-4 py-10">
    {MOBILE_NAV_ITEMS.map(({ label, href, icon }) => {
      const Icon = icon ? ICON_MAP[icon] : null;
      return (
        <Link
          key={href}
          href={href}
          onClick={onItemClick}
          className="flex items-center justify-between px-4"
        >
          <Typography variant="body-md" className="text-gray-400">
            {label}
          </Typography>
          {Icon && <Icon className="size-8 shrink-0 text-gray-400" aria-hidden="true" />}
        </Link>
      );
    })}
  </nav>
);

/** Horizontal divider between Navigation and Categories sections. */
const Divider: React.FC = () => (
  <div
    role="separator"
    data-testid="sidebar-divider"
    className="mx-4 my-2 border-t border-gray-100"
    aria-hidden="true"
  />
);

/** Categories section header with title. */
const CategoriesSectionHeader: React.FC = () => (
  <div className="border-b border-gray-100 px-8 py-3">
    <Typography variant="h6" className="font-semibold text-gray-900">
      {CATEGORIES_SECTION_TITLE}
    </Typography>
  </div>
);

/** Leaf links of one expanded group (زیرمجموعه‌های سرگروه). */
const GroupItemsList: React.FC<{
  items: { id: string; title: string; href?: string }[];
  onItemClick: () => void;
}> = ({ items, onItemClick }) => (
  <div className="flex flex-col gap-3 pr-6 pb-4">
    {items.map((item) => (
      <Typography
        variant="caption-md"
        key={item.id}
        href={item.href ?? '#'}
        onClick={onItemClick}
        className="hover:text-primary-500 block text-gray-500 transition-colors"
      >
        {item.title}
      </Typography>
    ))}
  </div>
);

/**
 * A single سرگروه (group) row inside the expanded category — same title style
 * as the desktop mega menu (orange bar + chevron), expandable to its items.
 */
const CategoryGroupAccordion: React.FC<{
  group: PopularCategory['subcategories'][number];
  isExpanded: boolean;
  onToggle: () => void;
  onItemClick: () => void;
}> = ({ group, isExpanded, onToggle, onItemClick }) => (
  <div>
    <button
      type="button"
      aria-expanded={isExpanded}
      aria-controls={`group-${group.id}`}
      onClick={onToggle}
      className="flex w-full items-center gap-2 py-2 text-right"
    >
      <span className="bg-primary-500 h-4 w-px shrink-0" aria-hidden="true" />
      <Typography variant="caption-lg" className="text-gray-900">
        {group.title}
      </Typography>
      <DownArrowIcon
        className={cn(
          'size-5 shrink-0 text-gray-400 transition-transform duration-200',
          isExpanded ? 'rotate-0' : 'rotate-90',
        )}
        aria-hidden="true"
      />
    </button>
    {isExpanded && <GroupItemsList items={group.items} onItemClick={onItemClick} />}
  </div>
);

/** Content shown when a category is expanded — its سرگروه‌ها as nested accordion. */
const CategoryGroupsPanel: React.FC<{
  category: PopularCategory;
  expandedGroupId: string | null;
  onGroupToggle: (id: string) => void;
  onItemClick: () => void;
}> = ({ category, expandedGroupId, onGroupToggle, onItemClick }) => (
  <div id={`category-${category.id}`} className="pt-1 pr-4 pb-4">
    {category.subcategories.length === 0 ? (
      <Typography
        variant="body-sm"
        color="primary"
        href={category.href ?? `/retail/category/${category.slug}`}
        onClick={onItemClick}
      >
        مشاهده همهٔ {category.title}
      </Typography>
    ) : (
      category.subcategories.map((group) => (
        <CategoryGroupAccordion
          key={group.id}
          group={group}
          isExpanded={expandedGroupId === group.id}
          onToggle={() => onGroupToggle(group.id)}
          onItemClick={onItemClick}
        />
      ))
    )}
  </div>
);

/** Accordion item for a single category with subcategories. */
const CategoryAccordion: React.FC<{
  category: PopularCategory;
  isExpanded: boolean;
  isActive: boolean;
  expandedGroupId: string | null;
  onToggle: () => void;
  onActivate: () => void;
  onGroupToggle: (id: string) => void;
  onItemClick: () => void;
}> = ({
  category,
  isExpanded,
  isActive,
  expandedGroupId,
  onToggle,
  onActivate,
  onGroupToggle,
  onItemClick,
}) => {
  const CategoryIcon = category.icon ? ICON_MAP[category.icon] : null;

  return (
    <div
      className={cn(
        'transition-colors',
        isActive && 'border-primary-500 rounded-r-2 bg-primary-500/10 border-l-2',
      )}
    >
      <Button
        variant="ghost"
        size="sm"
        aria-expanded={isExpanded}
        aria-controls={`category-${category.id}`}
        onClick={() => {
          onToggle();
          onActivate();
        }}
        onMouseEnter={onActivate}
        onFocus={onActivate}
        fullWidth
        rightIcon={
          CategoryIcon && (
            <CategoryIcon
              className={cn('size-9 shrink-0', isActive ? 'text-primary-500' : 'text-gray-400')}
              aria-hidden="true"
            />
          )
        }
        leftIcon={
          <DownArrowIcon
            data-testid={`category-arrow-${category.id}`}
            className={cn(
              'size-9 shrink-0 text-gray-300 transition-transform duration-200',
              isExpanded && 'rotate-180',
            )}
            aria-hidden="true"
          />
        }
        className={cn(
          'justify-between hover:bg-transparent',
          isActive ? 'text-primary-500' : 'text-gray-950',
        )}
      >
        {category.title}
      </Button>

      {isExpanded && (
        <CategoryGroupsPanel
          category={category}
          expandedGroupId={expandedGroupId}
          onGroupToggle={onGroupToggle}
          onItemClick={onItemClick}
        />
      )}
    </div>
  );
};

const SidebarFooter: React.FC<{ city?: string }> = ({ city }) => (
  <div className="mt-auto border-t border-gray-100 px-11 py-11">
    <LocationBadge city={city ?? ''} />
  </div>
);

// --- Main component ---------------------------------------------------------

export const RetailMobileSidebar: React.FC<RetailMobileSidebarProps> = ({ logo, city }) => {
  const { data: categories } = usePopularCategories();
  const catList = categories ?? [];

  const [open, setOpen] = React.useState(false);
  const [expandedCategoryId, setExpandedCategoryId] = React.useState<string | null>(
    catList[0]?.id ?? null,
  );
  const [activeCategoryId, setActiveCategoryId] = React.useState<string | null>(
    catList[0]?.id ?? null,
  );
  // The سرگروه (group) expanded inside the currently open category — the first
  // group of a category auto-expands when the category opens (matches the
  // desktop mega menu where the first group's items are visible).
  const [expandedGroupId, setExpandedGroupId] = React.useState<string | null>(null);

  // Seed the default expanded/active category (and its first سرگروه) once the
  // query resolves — React Query data arrives after the first render.
  const firstCategoryId = catList[0]?.id;
  const firstGroupId = catList[0]?.subcategories[0]?.id ?? null;
  React.useEffect(() => {
    if (firstCategoryId) {
      // Single-shot seed after the query resolves; the linter's "cascading
      // render" warning does not apply to this one-time initialization.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setExpandedCategoryId((prev) => prev ?? firstCategoryId);
      setActiveCategoryId((prev) => prev ?? firstCategoryId);
    }
  }, [firstCategoryId]);

  React.useEffect(() => {
    if (firstGroupId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setExpandedGroupId((prev) => prev ?? firstGroupId);
    }
  }, [firstGroupId]);

  const close = React.useCallback(() => setOpen(false), []);
  const openSidebar = () => setOpen(true);

  // Opening a category auto-expands its first سرگروه; toggling it closed
  // clears the group state. (Matches the desktop mega menu, where the first
  // group of the active category shows its items.)
  const toggleCategory = (id: string) => {
    const category = catList.find((c) => c.id === id);
    setExpandedCategoryId((prev) => {
      const next = prev === id ? null : id;
      setExpandedGroupId(next ? (category?.subcategories[0]?.id ?? null) : null);
      return next;
    });
  };

  const activateCategory = (id: string) => {
    setActiveCategoryId(id);
  };

  const toggleGroup = (id: string) => {
    setExpandedGroupId((prev) => (prev === id ? null : id));
  };

  // Handle escape key and body scroll lock
  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <>
      {/* Burger menu trigger button */}
      <Button
        variant="ghost"
        size="md"
        color="primary"
        icon={<BurgerMenuIcon className="size-9" />}
        aria-label="منو"
        onClick={openSidebar}
      />

      {/* Sidebar dialog */}
      {open && (
        <div className="fixed inset-0 z-50 max-h-svh">
          <SidebarBackdrop onClose={close} />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="منوی موبایل"
            dir="rtl"
            className="absolute top-0 right-0 flex h-full w-full flex-col bg-white shadow-xl"
          >
            <SidebarHeader logo={logo} onClose={close} />

            <div className="flex flex-1 flex-col overflow-y-auto">
              {/* Navigation Links */}
              <NavigationLinks onItemClick={close} />

              {/* Divider */}
              <Divider />

              {/* Categories Section Header */}
              <CategoriesSectionHeader />

              {/* Category Accordion List */}
              <nav className="flex flex-1 flex-col px-4 py-2">
                {catList.map((category) => (
                  <CategoryAccordion
                    key={category.id}
                    category={category}
                    isExpanded={expandedCategoryId === category.id}
                    isActive={activeCategoryId === category.id}
                    expandedGroupId={expandedGroupId}
                    onToggle={() => toggleCategory(category.id)}
                    onActivate={() => activateCategory(category.id)}
                    onGroupToggle={toggleGroup}
                    onItemClick={close}
                  />
                ))}
              </nav>

              <SidebarFooter city={city} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

RetailMobileSidebar.displayName = 'RetailMobileSidebar';
