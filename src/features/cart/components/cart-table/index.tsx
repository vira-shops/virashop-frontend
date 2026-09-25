'use client';

import * as React from 'react';
import { DesktopHeader, DesktopRow, MobileRow } from './rows';
import type { CartTableProps } from './types';

export type { CartTableProps } from './types';

/**
 * Step 2 — the seller's lines with their quantities. Desktop keeps the
 * columns of the design; below `md` each line stacks into labelled rows so
 * the steppers stay usable on a phone.
 */
export const CartTable: React.FC<CartTableProps> = ({ lines, ...handlers }) => (
  <div className="rounded-8 overflow-hidden border border-gray-100 bg-white md:pt-7">
    <div className="hidden md:block">
      <DesktopHeader />
      <div className="flex flex-col divide-y divide-gray-100 border-t border-gray-100">
        {lines.map((line) => (
          <DesktopRow key={line.id} line={line} {...handlers} />
        ))}
      </div>
    </div>

    <div className="flex flex-col divide-y divide-gray-100 md:hidden">
      {lines.map((line) => (
        <MobileRow key={line.id} line={line} {...handlers} />
      ))}
    </div>
  </div>
);

CartTable.displayName = 'CartTable';
