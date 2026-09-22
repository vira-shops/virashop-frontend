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

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <fieldset className="flex flex-col gap-4">
    <legend className="mb-4">
      <Typography variant="caption-md" className="text-gray-300">
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
      <div className="rounded-9 bg-white p-5 shadow-sm">
        <ShippingFormSkeleton />
      </div>
    );
  }

  return (
    <div className="rounded-9 flex flex-col gap-8 bg-white p-5 shadow-sm">
      <Section title={ADDRESS_TITLE}>
        {addresses.map((address) => (
          <Radio
            key={address.id}
            name="checkout-address"
            value={String(address.id)}
            checked={draft.addressId === address.id}
            onChange={() => onChange({ addressId: address.id })}
            className="w-full"
            label={`${address.title} - ${address.line}`}
          />
        ))}

        <Button
          variant="ghost"
          size="xs"
          onClick={onAddAddress}
          rightIcon={<PlusIcon className="size-7" />}
          className="w-fit self-start p-0 text-gray-400 hover:bg-transparent hover:text-gray-700"
        >
          {ADD_ADDRESS_LABEL}
        </Button>
      </Section>

      <Section title={SHIPPING_TYPE_TITLE}>
        {methods.map((method) => (
          <Radio
            key={method.id}
            name="checkout-shipping"
            value={method.id}
            checked={draft.shippingMethodId === method.id}
            onChange={() => onChange({ shippingMethodId: method.id })}
            className="w-full"
            label={method.label}
          />
        ))}
      </Section>

      <Section title={DELIVERY_DATE_TITLE}>
        <div role="radiogroup" aria-label={DELIVERY_DATE_TITLE} className="flex flex-wrap gap-3">
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
                  'rounded-8 flex w-20 flex-col items-center gap-1 border px-3 py-3 transition-colors',
                  isSelected
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200',
                )}
              >
                <Typography variant="caption-md" className="text-current">
                  {day.weekday}
                </Typography>
                <Typography variant="caption-md" className="font-bold text-current">
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
      />
    </div>
  );
};

ShippingForm.displayName = 'ShippingForm';
