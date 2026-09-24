'use client';

import * as React from 'react';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { CalendarIcon } from '@icons';
import { TextInput } from '@/components/ui/text-input';
import { cn } from '@/utils/ui';
import { DateInputProps } from './types';
import { JALALI_DISPLAY_FORMAT, dateObjectToIso, isoToJalali } from './utils';

/**
 * Jalali date field — `TextInput` as the trigger, `react-multi-date-picker`
 * as the popover. The value is a Gregorian `YYYY-MM-DD` string so forms and
 * APIs never deal with Jalali dates; only the screen does.
 */
export const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  hideIcon = false,
  disabled,
  placeholder = '.../.../...',
  calendarClassName,
  onBlur,
  ...inputProps
}) => {
  const selected = React.useMemo(() => isoToJalali(value), [value]);

  const icon = hideIcon ? undefined : <CalendarIcon aria-hidden="true" />;

  return (
    <DatePicker
      value={selected}
      onChange={(date) => onChange?.(date ? dateObjectToIso(date) : null)}
      calendar={persian}
      locale={persian_fa}
      format={JALALI_DISPLAY_FORMAT}
      minDate={isoToJalali(minDate) ?? undefined}
      maxDate={isoToJalali(maxDate) ?? undefined}
      disabled={disabled}
      calendarPosition="bottom-right"
      // The popover lives in <body> so it escapes modals' overflow and
      // stacks above their z-50 overlay.
      portal
      zIndex={60}
      editable={false}
      className={cn('rmdp-rtl date-input-calendar', calendarClassName)}
      containerClassName={cn('date-input', inputProps.fullWidth && 'w-full')}
      render={(displayValue, openCalendar) => (
        <TextInput
          {...inputProps}
          readOnly
          disabled={disabled}
          value={displayValue}
          placeholder={placeholder}
          onClick={openCalendar}
          onFocus={openCalendar}
          onBlur={onBlur}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
              event.preventDefault();
              openCalendar();
            }
          }}
          leftIcon={icon}
          fieldClassName={cn('cursor-pointer', inputProps.fieldClassName)}
        />
      )}
    />
  );
};

DateInput.displayName = 'DateInput';
