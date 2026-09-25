import * as React from 'react';
import Image from 'next/image';
import { Button, Typography } from '@/components/ui';
import { formatToman, toFaDigits } from '@/utils/format';
import { SellerMark } from '@/features/cart/components/invoice-header';
import {
  CART_IMAGE_FALLBACK,
  CURRENCY_LABEL,
  GRAND_TOTAL_LABEL,
  PAY_LABEL,
} from '@/features/cart/constants';
import { INVOICE_THUMBNAILS, MORE_TILE_CLASS, TILE_CLASS } from './constants';
import type { InvoiceCardProps } from './types';

/** One seller's basket: who, what, how much, and a way in. */
export const InvoiceCard: React.FC<InvoiceCardProps> = ({ invoice, onOpen }) => {
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

          {hidden > 0 && (
            <span className={MORE_TILE_CLASS}>
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
