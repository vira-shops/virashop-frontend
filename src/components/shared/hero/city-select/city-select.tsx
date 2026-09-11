'use client';

import * as React from 'react';
import { Select } from '@/components/ui';
import { LocationIcon } from '@icons';
import { cn } from '@/utils/ui';
import { CitySelectProps } from './types';

export const CitySelect: React.FC<CitySelectProps> = ({
  cities,
  value,
  defaultValue,
  onChange,
  disabled,
  className,
  'aria-label': ariaLabel = 'انتخاب شهر',
}) => {
  const fallback = defaultValue ?? cities[0]?.value ?? '';
  const [inner, setInner] = React.useState(fallback);

  const current = value ?? inner;

  const handleChange = (next: string) => {
    if (value === undefined) setInner(next);
    onChange?.(next);
  };

  return (
    <div className={cn('w-full md:w-fit', className)}>
      <Select
        variant="fill"
        size="md"
        value={current}
        onValueChange={handleChange}
        aria-label={ariaLabel}
        disabled={disabled}
        placeholder="انتخاب شهر"
        searchable
        fullWidth
        rightIcon={<LocationIcon className="size-12" />}
        className="rounded-6"
      >
        {cities.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
};

CitySelect.displayName = 'CitySelect';
