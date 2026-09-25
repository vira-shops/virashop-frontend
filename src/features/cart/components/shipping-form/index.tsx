'use client';

import * as React from 'react';
import { Button, TextInput } from '@/components/ui';
import { PlusIcon } from '@icons';
import { cn } from '@/utils/ui';
import { CARD_CLASS, RADIO_GROUPS, SHIPPING_FORM_COPY as COPY } from './constants';
import { DayPicker, OptionRadio, ShippingFormSkeleton, ShippingSection } from './parts';
import type { ShippingFormProps } from './types';

export type { ShippingFormProps } from './types';

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
      <div className={CARD_CLASS}>
        <ShippingFormSkeleton />
      </div>
    );
  }

  return (
    <div className={cn(CARD_CLASS, 'flex flex-col gap-7')}>
      <ShippingSection title={COPY.addressTitle}>
        <div className="flex flex-col gap-4">
          {addresses.map((address) => (
            <OptionRadio
              key={address.id}
              name={RADIO_GROUPS.address}
              value={String(address.id)}
              label={`${address.title} - ${address.line}`}
              checked={draft.addressId === address.id}
              onSelect={() => onChange({ addressId: address.id })}
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
          {COPY.addAddress}
        </Button>
      </ShippingSection>

      <ShippingSection title={COPY.shippingTypeTitle}>
        <div className="flex flex-col gap-4">
          {methods.map((method) => (
            <OptionRadio
              key={method.id}
              name={RADIO_GROUPS.shipping}
              value={method.id}
              label={method.label}
              checked={draft.shippingMethodId === method.id}
              onSelect={() => onChange({ shippingMethodId: method.id })}
            />
          ))}
        </div>
      </ShippingSection>

      <ShippingSection title={COPY.deliveryDateTitle}>
        <DayPicker
          days={days}
          selectedId={draft.deliveryDayId}
          onSelect={(dayId) => onChange({ deliveryDayId: dayId, deliveryTimeId: null })}
        />

        {selectedDay && (
          <div className="flex flex-col gap-4">
            {selectedDay.times.map((time) => (
              <OptionRadio
                key={time.id}
                name={RADIO_GROUPS.time}
                value={time.id}
                label={time.label}
                checked={draft.deliveryTimeId === time.id}
                onSelect={() => onChange({ deliveryTimeId: time.id })}
              />
            ))}
          </div>
        )}
      </ShippingSection>

      <TextInput
        value={draft.note}
        onChange={(event) => onChange({ note: event.target.value })}
        placeholder={COPY.notePlaceholder}
        aria-label={COPY.notePlaceholder}
        fullWidth
        variant="ghost"
        className="h-14 text-gray-700"
      />
    </div>
  );
};

ShippingForm.displayName = 'ShippingForm';
