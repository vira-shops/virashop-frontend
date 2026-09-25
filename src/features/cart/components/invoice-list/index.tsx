'use client';

import * as React from 'react';
import { InvoiceCard } from './invoice-card';
import type { InvoiceListProps } from './types';

export type { InvoiceListProps } from './types';

/** Step 1 — every seller in the cart gets its own invoice to settle. */
export const InvoiceList: React.FC<InvoiceListProps> = ({ invoices, onOpen }) => (
  <div className="flex flex-col gap-7">
    {invoices.map((invoice) => (
      <InvoiceCard
        key={invoice.seller.id}
        invoice={invoice}
        onOpen={() => onOpen(invoice.seller.id)}
      />
    ))}
  </div>
);

InvoiceList.displayName = 'InvoiceList';
