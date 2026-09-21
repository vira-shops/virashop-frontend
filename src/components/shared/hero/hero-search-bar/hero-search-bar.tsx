'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button, TextInput, Typography } from '@/components/ui';
import { ClockIcon, SearchIcon } from '@icons';
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

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
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
        }}
        aria-label="جستجو"
        fullWidth
      />

      {showDropdown && (
        <div className="rounded-4 absolute inset-x-0 top-full z-30 mt-2 max-h-96 overflow-y-auto bg-white p-4 text-start shadow-xl">
          {query.trim() === '' ? (
            recentTerms.length > 0 && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <ClockIcon className="size-5 text-blue-200" />
                  <Typography variant="caption-md" className="text-blue-200">
                    جستجوهای اخیر
                  </Typography>
                </div>
                <div className="flex flex-wrap gap-3">
                  {recentTerms.map((term) => (
                    <Button
                      size="xs"
                      key={term}
                      onClick={() => handleSubmit(term)}
                      className="rounded-2 bg-blue-50 text-blue-300 hover:bg-blue-100"
                    >
                      {term}
                    </Button>
                  ))}
                </div>
              </div>
            )
          ) : (
            <div className="flex flex-col">
              {categorized.map((suggestion, index) => (
                <button
                  key={`${suggestion.category.slug}-${index}`}
                  type="button"
                  onClick={() => handleCategoryClick(suggestion)}
                  className="flex flex-col gap-1 border-b border-gray-50 py-3 text-start"
                >
                  <Typography variant="body-md" className="font-bold text-black">
                    {suggestion.text}
                  </Typography>
                  <Typography variant="caption-md" className="text-gray-400">
                    در دسته <span className="text-primary-500">{suggestion.category.name}</span>
                  </Typography>
                </button>
              ))}

              {categorized.length > 0 && terms.length > 0 && <div className="h-px bg-gray-100" />}

              {terms.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handleSubmit(term)}
                  className="border-b border-gray-50 py-3 text-start last:border-0"
                >
                  <Typography variant="body-sm" className="text-gray-700">
                    {term}
                  </Typography>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

HeroSearchBar.displayName = 'HeroSearchBar';
