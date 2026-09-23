'use client';

import * as React from 'react';
import { Button, Radio, Skeleton, TextInput, Typography } from '@/components/ui';
import { PlusIcon } from '@icons';
import { cn } from '@/utils/ui';
import {
  ADDRESS_TITLE,
  ADD_ADDRESS_LABEL,
  DELIVERY_DATE_TITLE,
  NOTE_PLACEHOLDER,
  SHIPPING_TYPE_TITLE,
} from '@/features/cart/constants';
import type { Address, DeliveryDay, ShippingMethod } from '@/contracts/endpoints/checkout';
import type { CheckoutDraft } from '@/hooks';

export interface ShippingFormProps {
  addresses: Address[];
  methods: ShippingMethod[];
  days: DeliveryDay[];
  isLoading: boolean;
  draft: CheckoutDraft;
  onChange: (patch: Partial<CheckoutDraft>) => void;
  onAddAddress?: () => void;
}

/**
 * The picked option is the only one in the storefront's darkest primary; the
 * rest stay gray. Passed per-row because the checked state comes from the
 * draft, not from CSS.
 */
const radioLabelClass = (checked: boolean) => (checked ? 'text-primary-900' : 'text-gray-700');

/** Sections are divided by a rule, not by whitespace. */
const Section: React.FC<{ title: string; children: React.ReactNode; last?: boolean }> = ({
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

const ShippingFormSkeleton: React.FC = () => (
  <div className="flex flex-col gap-6">
    {Array.from({ length: 3 }, (_, index) => (
      <div key={index} className="flex flex-col gap-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-5 w-1/2" />
      </div>
    ))}
  </div>
);

/** Step 3 — where it goes, how it travels, and when it lands. */
export const ShippingForm: React.FC<ShippingFormProps> = ({
  addresses,
  methods,
  days,
  isLoading,
  draft,
  onChange,
  onAddAddress,
}) => {
  const selectedDay = days.find((day) => day.id === draft.deliveryDayId) ?? days[0];

  if (isLoading) {
    return (
      <div className="rounded-8 border border-gray-100 bg-white p-7">
        <ShippingFormSkeleton />
      </div>
    );
  }

  return (
    <div className="rounded-8 flex flex-col gap-7 border border-gray-100 bg-white p-7">
      <Section title={ADDRESS_TITLE}>
        <div className="flex flex-col gap-4">
          {addresses.map((address) => (
            <Radio
              key={address.id}
              name="checkout-address"
              value={String(address.id)}
              checked={draft.addressId === address.id}
              onChange={() => onChange({ addressId: address.id })}
              className="w-full"
              labelClassName={radioLabelClass(draft.addressId === address.id)}
              label={`${address.title} - ${address.line}`}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="xs"
          onClick={onAddAddress}
          rightIcon={<PlusIcon className="size-10" />}
          className="w-fit self-start p-0 text-gray-700 hover:bg-transparent hover:text-black"
        >
          {ADD_ADDRESS_LABEL}
        </Button>
      </Section>

      <Section title={SHIPPING_TYPE_TITLE}>
        <div className="flex flex-col gap-4">
          {methods.map((method) => (
            <Radio
              key={method.id}
              name="checkout-shipping"
              value={method.id}
              checked={draft.shippingMethodId === method.id}
              onChange={() => onChange({ shippingMethodId: method.id })}
              className="w-full"
              labelClassName={radioLabelClass(draft.shippingMethodId === method.id)}
              label={method.label}
            />
          ))}
        </div>
      </Section>

      <Section title={DELIVERY_DATE_TITLE}>
        <div
          role="radiogroup"
          aria-label={DELIVERY_DATE_TITLE}
          className="no-scrollbar flex gap-3 overflow-x-auto"
        >
          {days.map((day) => {
            const isSelected = day.id === draft.deliveryDayId;

            return (
              <button
                key={day.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onChange({ deliveryDayId: day.id, deliveryTimeId: null })}
                className={cn(
                  'rounded-4 flex size-14 shrink-0 flex-col items-center justify-center border transition-colors',
                  isSelected
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-300 bg-white hover:border-gray-700',
                  // A holiday keeps its red label until it is the picked day.
                  !isSelected && day.isHoliday ? 'text-warning-red' : '',
                  !isSelected && !day.isHoliday ? 'text-black' : '',
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

        {selectedDay && (
          <div className="flex flex-col gap-4">
            {selectedDay.times.map((time) => (
              <Radio
                key={time.id}
                name="checkout-time"
                value={time.id}
                checked={draft.deliveryTimeId === time.id}
                onChange={() => onChange({ deliveryTimeId: time.id })}
                className="w-full"
                labelClassName={radioLabelClass(draft.deliveryTimeId === time.id)}
                label={time.label}
              />
            ))}
          </div>
        )}
      </Section>

      <TextInput
        value={draft.note}
        onChange={(event) => onChange({ note: event.target.value })}
        placeholder={NOTE_PLACEHOLDER}
        aria-label={NOTE_PLACEHOLDER}
        fullWidth
        variant="ghost"
        className="h-14 text-gray-700"
      />
    </div>
  );
};

ShippingForm.displayName = 'ShippingForm';
