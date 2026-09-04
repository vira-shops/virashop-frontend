'use client';

import * as React from 'react';
import { TextInput } from '@/components/ui';
import { SearchIcon } from '@icons';
import { cn } from '@/utils/ui';
import { SearchBarProps } from './types';

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  defaultValue,
  onChange,
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
        placeholder="برای جست و جو بهتر مکان خود را ثبت کنید"
        rightIcon={<SearchIcon className="size-7" />}
        onChange={handleChange}
        aria-label="جستجو"
        fullWidth
      />
    </div>
  );
};

SearchBar.displayName = 'SearchBar';
