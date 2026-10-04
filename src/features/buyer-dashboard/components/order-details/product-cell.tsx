import * as React from 'react';
import Image from 'next/image';
import type { ProductCellProps } from './types';

/** Product thumbnail + name. */
export const ProductCell: React.FC<ProductCellProps> = ({ line }) => (
  <span className="flex items-center gap-5">
    <span className="rounded-4 relative size-13 shrink-0 overflow-hidden border border-blue-100 bg-white">
      <Image src={line.image} alt="" fill sizes="48px" className="object-contain p-1" />
    </span>
    <span className="text-body-md text-black">{line.name}</span>
  </span>
);
