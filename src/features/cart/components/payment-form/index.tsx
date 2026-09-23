'use client';

import * as React from 'react';
import { Select, Skeleton } from '@/components/ui';
import { PAYMENT_TYPE_LABEL } from '@/features/cart/constants';
import type { PaymentMethod } from '@/contracts/endpoints/checkout';
import type { CheckoutDraft } from '@/hooks';

export interface PaymentFormProps {
  methods: PaymentMethod[];
  isLoading: boolean;
  draft: CheckoutDraft;
  onChange: (patch: Partial<CheckoutDraft>) => void;
}

/**
 * Step 4 — how the invoice gets settled.
 *
 * The design puts the picker straight on the page: no surrounding card, the
 * field itself carries the white fill, the Gray/2 hairline and the 16px
 * radius.
 */
export const PaymentForm: React.FC<PaymentFormProps> = ({ methods, isLoading, draft, onChange }) =>
  isLoading ? (
    <Skeleton className="rounded-8 h-13 w-full" />
  ) : (
    <Select
      placeholder={PAYMENT_TYPE_LABEL}
      aria-label={PAYMENT_TYPE_LABEL}
      searchable
      filterable={false}
      fullWidth
      value={draft.paymentMethodId ?? ''}
      onValueChange={(value) => onChange({ paymentMethodId: value })}
      className="rounded-8 h-13 border-gray-100 bg-white px-10"
    >
      {methods.map((method) => (
        <option key={method.id} value={method.id}>
          {method.label}
        </option>
      ))}
    </Select>
  );

PaymentForm.displayName = 'PaymentForm';
