'use client';

import * as React from 'react';
import Image from 'next/image';
import { Button, Typography } from '@/components/ui';
import { SellerMark } from '@/features/cart/components/invoice-header';
import { formatToman, toFaDigits } from '@/utils/format';
import {
  CART_IMAGE_FALLBACK,
  CURRENCY_LABEL,
  GRAND_TOTAL_LABEL,
  INVOICE_THUMBNAILS,
  PAY_LABEL,
} from '@/features/cart/constants';
import type { CartInvoice } from '@/hooks';

export interface InvoiceListProps {
  invoices: CartInvoice[];
  /** Opens one invoice's checkout. */
  onOpen: (sellerId: number) => void;
}

/** One seller's basket: who, what, how much, and a way in. */
const InvoiceCard: React.FC<{ invoice: CartInvoice; onOpen: () => void }> = ({
  invoice,
  onOpen,
}) => {
  const thumbnails = invoice.lines.slice(0, INVOICE_THUMBNAILS);
  const hidden = invoice.lines.length - thumbnails.length;

  return (
    <article className="rounded-9 flex flex-col gap-5 bg-white p-5 shadow-sm md:flex-row-reverse md:items-center md:justify-between">
      <div className="flex flex-col gap-4 md:w-56">
        <div className="flex items-center justify-between gap-4">
          <Typography variant="caption-md" className="text-gray-400">
            {GRAND_TOTAL_LABEL}
          </Typography>
          <Typography variant="caption-md" className="text-primary font-bold">
            {formatToman(invoice.total)} {CURRENCY_LABEL}
          </Typography>
        </div>

        <Button variant="fill" color="primary" size="md" fullWidth onClick={onOpen}>
          {PAY_LABEL}
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <SellerMark seller={invoice.seller} />
          <Typography variant="body-sm" className="font-bold text-gray-700">
            {invoice.seller.shopName}
          </Typography>
        </div>

        <div className="flex items-center gap-2">
          {thumbnails.map((line) => (
            <span
              key={line.id}
              className="rounded-6 relative size-11 shrink-0 overflow-hidden bg-gray-50"
            >
              <Image
                src={line.imageUrl ?? CART_IMAGE_FALLBACK}
                alt={line.name}
                fill
                sizes="32px"
                className="object-contain"
              />
            </span>
          ))}

          {/* Trails the thumbnails on the end side, as drawn. */}
          {hidden > 0 && (
            <Typography
              variant="caption-md"
              className="rounded-6 bg-gray-50 px-3 py-2 text-gray-400"
            >
              {toFaDigits(hidden)}+
            </Typography>
          )}
        </div>
      </div>
    </article>
  );
};

/** Step 1 — every seller in the cart gets its own invoice to settle. */
export const InvoiceList: React.FC<InvoiceListProps> = ({ invoices, onOpen }) => (
  <div className="flex flex-col gap-4">
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
