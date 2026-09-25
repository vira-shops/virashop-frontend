import * as React from 'react';
import { Radio, Skeleton, Typography } from '@/components/ui';
import { cn } from '@/utils/ui';
import {
  DAY_TILE_CLASS,
  DAY_TILE_HOLIDAY_CLASS,
  DAY_TILE_IDLE_CLASS,
  DAY_TILE_SELECTED_CLASS,
  SHIPPING_FORM_COPY as COPY,
  SKELETON_SECTION_COUNT,
} from './constants';
import type { DayPickerProps, OptionRadioProps, ShippingSectionProps } from './types';

/** Sections are divided by a rule, not by whitespace. */
export const ShippingSection: React.FC<ShippingSectionProps> = ({
  title,
  children,
  last = false,
}) => (
  <fieldset className={cn('flex flex-col gap-7 pb-7', !last && 'border-b border-gray-100')}>
    <legend>
      <Typography variant="body-xs" className="text-primary-900">
        {title}
      </Typography>
    </legend>
    {children}
  </fieldset>
);

/**
 * The picked option is the only one in the storefront's darkest primary; the
 * rest stay gray. Passed per-row because the checked state comes from the
 * draft, not from CSS.
 */
export const OptionRadio: React.FC<OptionRadioProps> = ({
  name,
  value,
  label,
  checked,
  onSelect,
}) => (
  <Radio
    name={name}
    value={value}
    checked={checked}
    onChange={onSelect}
    className="w-full"
    labelClassName={checked ? 'text-primary-900' : 'text-gray-700'}
    label={label}
  />
);

/**
 * Delivery-day strip — a composite radio group (tiles with two lines each),
 * so the tiles stay native `role="radio"` buttons rather than `Button`s.
 */
export const DayPicker: React.FC<DayPickerProps> = ({ days, selectedId, onSelect }) => (
  <div
    role="radiogroup"
    aria-label={COPY.deliveryDateTitle}
    className="no-scrollbar flex gap-3 overflow-x-auto"
  >
    {days.map((day) => {
      const isSelected = day.id === selectedId;

      return (
        <button
          key={day.id}
          type="button"
          role="radio"
          aria-checked={isSelected}
          onClick={() => onSelect(day.id)}
          className={cn(
            DAY_TILE_CLASS,
            isSelected
              ? DAY_TILE_SELECTED_CLASS
              : day.isHoliday
                ? DAY_TILE_HOLIDAY_CLASS
                : DAY_TILE_IDLE_CLASS,
          )}
        >
          <Typography variant="body-sm" className="text-current">
            {day.weekday}
          </Typography>
          <Typography variant="body-sm" className="text-current">
            {day.day}
          </Typography>
        </button>
      );
    })}
  </div>
);

export const ShippingFormSkeleton: React.FC = () => (
  <div className="flex flex-col gap-6">
    {Array.from({ length: SKELETON_SECTION_COUNT }, (_, index) => (
      <div key={index} className="flex flex-col gap-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-5 w-1/2" />
      </div>
    ))}
  </div>
);
