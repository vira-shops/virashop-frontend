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

/** 48px rounded square — the design draws products and the «+N» counter alike. */
const TILE_CLASS = 'rounded-4 border-gray-100 relative size-13 shrink-0 overflow-hidden border';

/** One seller's basket: who, what, how much, and a way in. */
const InvoiceCard: React.FC<{ invoice: CartInvoice; onOpen: () => void }> = ({
  invoice,
  onOpen,
}) => {
  const thumbnails = invoice.lines.slice(0, INVOICE_THUMBNAILS);
  const hidden = invoice.lines.length - thumbnails.length;

  return (
    <article className="rounded-8 flex flex-col gap-5 border border-gray-100 bg-white p-7 md:flex-row-reverse md:items-center md:justify-between">
      <div className="flex flex-col gap-7 md:w-74">
        <div className="flex items-center justify-between gap-4">
          <Typography variant="body-sm" className="text-primary">
            {GRAND_TOTAL_LABEL}
          </Typography>
          <Typography variant="body-md" className="text-primary">
            {formatToman(invoice.total)}{' '}
            <span className="text-caption-md font-light">{CURRENCY_LABEL}</span>
          </Typography>
        </div>

        <Button variant="fill" color="primary" size="md" fullWidth onClick={onOpen}>
          {PAY_LABEL}
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <SellerMark seller={invoice.seller} />
          <Typography variant="h5" className="text-black">
            {invoice.seller.shopName}
          </Typography>
        </div>

        <div className="flex items-center gap-3">
          {thumbnails.map((line) => (
            <span key={line.id} className={TILE_CLASS}>
              <Image
                src={line.imageUrl ?? CART_IMAGE_FALLBACK}
                alt={line.name}
                fill
                sizes="48px"
                className="object-contain"
              />
            </span>
          ))}

          {/* Trails the thumbnails on the end side, as drawn: the same tile,
              frosted over the row, with the count reading «+۵۲». */}
          {hidden > 0 && (
            <span className="rounded-4 flex size-13 shrink-0 items-center justify-center border border-gray-100 bg-blue-50/80 backdrop-blur-[3.5px]">
              <Typography variant="body-sm" className="text-primary-900">
                +{toFaDigits(hidden)}
              </Typography>
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

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
