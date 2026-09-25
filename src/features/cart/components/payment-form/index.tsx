'use client';

import * as React from 'react';
import { Select, Skeleton } from '@/components/ui';
import { PAYMENT_SELECT_CLASS, PAYMENT_TYPE_LABEL } from './constants';
import type { PaymentFormProps } from './types';

export type { PaymentFormProps } from './types';

/** Step 4 — how the invoice gets settled. */
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
      className={PAYMENT_SELECT_CLASS}
    >
      {methods.map((method) => (
        <option key={method.id} value={method.id}>
          {method.label}
        </option>
      ))}
    </Select>
  );

PaymentForm.displayName = 'PaymentForm';
