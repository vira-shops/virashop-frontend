'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button, TextInput, Typography } from '@/components/ui';
import { CancelIcon, ClockIcon, SearchIcon } from '@icons';
import { useRecentSearches, useSearchSuggestions } from '@/hooks';
import { cn } from '@/utils/ui';
import type { SearchCategorizedSuggestion } from '@/contracts/endpoints/search';
import { HeroSearchBarProps } from './types';

const DEFAULT_SEARCH_PLACEHOLDER = 'برای جست و جو بهتر مکان خود را ثبت کنید';

export const HeroSearchBar: React.FC<HeroSearchBarProps> = ({
  placeholder,
  hrefForCategory,
  hrefForSearch,
  className,
}) => {
  const router = useRouter();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [query, setQuery] = React.useState('');
  const [debouncedQuery, setDebouncedQuery] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const { terms: recentTerms, add: addRecentSearch } = useRecentSearches();

  const dropdownEnabled = Boolean(hrefForCategory && hrefForSearch);

  React.useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query), 300);

    return () => window.clearTimeout(timer);
  }, [query]);

  React.useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);

    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [open]);

  const suggestionsQuery = useSearchSuggestions(dropdownEnabled ? debouncedQuery : '');
  const categorized = suggestionsQuery.data?.categorized ?? [];
  const terms = suggestionsQuery.data?.terms ?? [];

  const handleSubmit = (term: string) => {
    const trimmed = term.trim();

    if (!trimmed || !hrefForSearch) return;

    addRecentSearch(trimmed);
    setOpen(false);
    router.push(hrefForSearch(trimmed));
  };

  const handleCategoryClick = (suggestion: SearchCategorizedSuggestion) => {
    if (!hrefForCategory) return;

    addRecentSearch(suggestion.text);
    setOpen(false);
    router.push(hrefForCategory(suggestion.category.slug));
  };

  const showDropdown = dropdownEnabled && open;
  const hasQuery = query.trim() !== '';
  const hasResults = categorized.length > 0 || terms.length > 0;

  const close = () => {
    setOpen(false);
    setQuery('');
  };

  return (
    // Open, the field rises above a dimmed page — the overlay lives inside
    // this stacking context, so it sits under the field and its cards.
    <div ref={containerRef} className={cn('relative w-full', showDropdown && 'z-50', className)}>
      {showDropdown && (
        <div aria-hidden="true" className="fixed inset-0 -z-10 bg-black/50" onClick={close} />
      )}

      <TextInput
        variant="fill"
        type="search"
        size="md"
        value={query}
        placeholder={placeholder ?? DEFAULT_SEARCH_PLACEHOLDER}
        rightIcon={<SearchIcon className="size-7" />}
        onChange={(event) => setQuery(event.target.value)}
        onFocus={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') handleSubmit(query);
          if (event.key === 'Escape') close();
        }}
        aria-label="جستجو"
        fullWidth
      />

      {showDropdown && (
        <Button
          variant="ghost"
          size="md"
          aria-label="بستن جستجو"
          onClick={close}
          icon={<CancelIcon className="size-7" />}
          className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-400 hover:bg-transparent hover:text-gray-700"
        />
      )}

      {showDropdown && (recentTerms.length > 0 || (hasQuery && hasResults)) && (
        <div className="absolute inset-x-0 top-full mt-7 flex max-h-[70vh] flex-col gap-1 overflow-y-auto text-start">
          {recentTerms.length > 0 && (
            <div className="rounded-4 flex flex-col gap-3 bg-white p-7 shadow-xl">
              <div className="flex items-center gap-2 text-gray-400">
                <ClockIcon className="size-7" />
                <Typography variant="caption-md" className="text-current">
                  جستجوهای اخیر
                </Typography>
              </div>
              <div className="flex flex-wrap gap-3">
                {recentTerms.map((term) => (
                  <Button
                    size="xs"
                    key={term}
                    onClick={() => handleSubmit(term)}
                    className="rounded-2 h-[30px] min-w-0 bg-gray-100 px-3 font-normal text-gray-700 hover:bg-gray-100 hover:text-black"
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {hasQuery && hasResults && (
            <div className="rounded-4 flex flex-col gap-7 bg-white p-7 shadow-xl">
              {categorized.length > 0 && (
                <div className="flex flex-col gap-3">
                  {categorized.map((suggestion, index) => (
                    <button
                      key={`${suggestion.category.slug}-${index}`}
                      type="button"
                      onClick={() => handleCategoryClick(suggestion)}
                      className="flex cursor-pointer flex-col text-start"
                    >
                      <Typography variant="body-md" className="text-black">
                        {suggestion.text}
                      </Typography>
                      <Typography variant="caption-md" className="text-gray-400">
                        در دسته <span className="text-primary-500">{suggestion.category.name}</span>
                      </Typography>
                    </button>
                  ))}
                </div>
              )}

              {categorized.length > 0 && terms.length > 0 && (
                <div className="h-px bg-gray-100" aria-hidden="true" />
              )}

              {terms.length > 0 && (
                <div className="flex flex-col gap-3">
                  {terms.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => handleSubmit(term)}
                      className="cursor-pointer text-start"
                    >
                      <Typography variant="body-md" className="text-black">
                        {term}
                      </Typography>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

HeroSearchBar.displayName = 'HeroSearchBar';
