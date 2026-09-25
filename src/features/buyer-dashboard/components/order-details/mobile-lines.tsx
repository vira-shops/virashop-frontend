import * as React from 'react';
import Link from 'next/link';
import { DescriptionList } from '@/components/shared';
import { buildLineItems } from './items';
import { ProductCell, productHref } from './product-cell';
import type { MobileLinesProps } from './types';

/** Phones: each line stacks its product row over a label/value list. */
export const MobileLines: React.FC<MobileLinesProps> = ({ lines }) => (
  <ul className="flex flex-col divide-y divide-blue-100 md:hidden">
    {lines.map((line) => (
      <li key={line.id} className="flex flex-col gap-5 py-7 first:pt-0 last:pb-0">
        <Link href={productHref(line)}>
          <ProductCell line={line} />
        </Link>
        <DescriptionList items={buildLineItems(line)} className="gap-y-5" />
      </li>
    ))}
  </ul>
);
