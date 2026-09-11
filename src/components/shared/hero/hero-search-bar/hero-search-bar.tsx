'use client';

import * as React from 'react';
import { TextInput } from '@/components/ui';
import { SearchIcon } from '@icons';
import { cn } from '@/utils/ui';
import { HeroSearchBarProps } from './types';

const DEFAULT_SEARCH_PLACEHOLDER = 'برای جست و جو بهتر مکان خود را ثبت کنید';

export const HeroSearchBar: React.FC<HeroSearchBarProps> = ({
  value,
  defaultValue,
  onChange,
  placeholder,
  className,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <div className={cn('w-full', className)}>
      <TextInput
        variant="fill"
        type="search"
        size="md"
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder ?? DEFAULT_SEARCH_PLACEHOLDER}
        rightIcon={<SearchIcon className="size-7" />}
        onChange={handleChange}
        aria-label="جستجو"
        fullWidth
      />
    </div>
  );
};

HeroSearchBar.displayName = 'HeroSearchBar';
