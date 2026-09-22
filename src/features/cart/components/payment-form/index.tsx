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

/** Step 4 — how the invoice gets settled. */
export const PaymentForm: React.FC<PaymentFormProps> = ({
  methods,
  isLoading,
  draft,
  onChange,
}) => (
  <div className="rounded-9 bg-white p-5 shadow-sm">
    {isLoading ? (
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
      >
        {methods.map((method) => (
          <option key={method.id} value={method.id}>
            {method.label}
          </option>
        ))}
      </Select>
    )}
  </div>
);

PaymentForm.displayName = 'PaymentForm';
