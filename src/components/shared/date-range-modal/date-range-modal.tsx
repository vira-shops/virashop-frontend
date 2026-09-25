'use client';

import * as React from 'react';
import { Button, DateInput, Typography } from '@/components/ui';
import { Modal } from '@/components/shared/modal';
import { cn } from '@/utils/ui';
import type { DateRange, DateRangeModalProps } from './types';

const EMPTY_RANGE: DateRange = { from: null, to: null };

const INVALID_RANGE_MESSAGE = 'تاریخ پایان نباید قبل از تاریخ شروع باشد';

/** «جستجو تاریخ» — pick a from/to pair of Jalali days and submit them as ISO dates. */
export const DateRangeModal: React.FC<DateRangeModalProps> = ({
  open,
  onClose,
  onSubmit,
  initialRange = EMPTY_RANGE,
  title = 'جستجو تاریخ',
  description = 'شروع و پایان تاریخ را انتخاب کنید',
  submitLabel = 'جستجو',
  className,
  fieldsClassName,
}) => {
  const [range, setRange] = React.useState<DateRange>(initialRange);

  // Re-seed from the caller's current filter each time the modal opens,
  // using the "adjust state while rendering" pattern instead of an effect.
  const [wasOpen, setWasOpen] = React.useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setRange(initialRange);
  }

  // ISO `YYYY-MM-DD` strings compare correctly as plain strings.
  const invalid = Boolean(range.from && range.to && range.to < range.from);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (invalid) return;
    onSubmit(range);
  };

  return (
    <Modal open={open} onClose={onClose} title={title} size="md" className={className}>
      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-9">
        <Typography variant="body-md" as="p" className="text-black">
          {description}
        </Typography>
        <div className={cn('grid grid-cols-1 gap-5', fieldsClassName)}>
          <DateInput
            aria-label="از تاریخ"
            placeholder="از .../.../..."
            variant="ghost"
            fullWidth
            hideIcon
            value={range.from}
            maxDate={range.to ?? undefined}
            onChange={(from) => setRange((current) => ({ ...current, from }))}
            className="bg-blue-50"
            fieldClassName="text-center"
          />
          <DateInput
            aria-label="تا تاریخ"
            placeholder="تا .../.../..."
            variant="ghost"
            fullWidth
            hideIcon
            value={range.to}
            minDate={range.from ?? undefined}
            state={invalid ? 'error' : undefined}
            inputMessage={invalid ? INVALID_RANGE_MESSAGE : undefined}
            onChange={(to) => setRange((current) => ({ ...current, to }))}
            className="bg-blue-50"
            fieldClassName="text-center"
          />
        </div>
        <Button type="submit" fullWidth disabled={invalid}>
          {submitLabel}
        </Button>
      </form>
    </Modal>
  );
};

DateRangeModal.displayName = 'DateRangeModal';
