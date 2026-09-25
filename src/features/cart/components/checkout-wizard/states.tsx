import * as React from 'react';
import { Button, Skeleton, Typography } from '@/components/ui';
import { CHECKOUT_WIZARD_COPY as COPY } from './constants';
import type { EmptyCartProps } from './types';

/** While the persisted cart rehydrates. */
export const CheckoutSkeleton: React.FC = () => (
  <div className="flex flex-col gap-6">
    <Skeleton className="rounded-8 h-14 w-full" />
    <Skeleton className="rounded-9 h-40 w-full" />
  </div>
);

export const EmptyCart: React.FC<EmptyCartProps> = ({ href }) => (
  <div className="flex flex-col items-center gap-5 py-20">
    <Typography variant="body-md" className="text-gray-300">
      {COPY.emptyTitle}
    </Typography>
    <Button variant="fill" color="primary" size="md" href={href}>
      {COPY.emptyAction}
    </Button>
  </div>
);
