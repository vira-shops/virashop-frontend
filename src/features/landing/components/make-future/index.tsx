import * as React from 'react';
import { Typography } from '@/components/ui';
import { MAKE_FUTURE_ARIA_LABEL, MAKE_FUTURE_CARDS } from './constants';

export const MakeFuture: React.FC = () => {
  return (
    <section aria-label={MAKE_FUTURE_ARIA_LABEL} className="container py-8">
      <div className="rounded-8 flex flex-col items-center justify-center bg-blue-50 px-5 py-10">
        <div className="flex w-15 gap-2">
          <div className="bg-retail-500 h-0.5 w-full rounded-full" />
          <div className="bg-wholesale-500 h-0.5 w-full rounded-full" />
        </div>

        <Typography variant="h3" className="mt-4 text-blue-900">
          آینده خود را با ما بسازید
        </Typography>

        <div className="mt-12 flex flex-col items-center gap-12 lg:flex-row lg:justify-center">
          {MAKE_FUTURE_CARDS.map(({ icon: Icon, title }) => (
            <div
              key={title}
              className="rounded-8 flex h-33.25 w-50 flex-col items-center justify-center gap-2 bg-white shadow-sm"
            >
              <Icon className="size-14" />
              <Typography variant="body-md" className="text-blue-900">
                {title}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

MakeFuture.displayName = 'MakeFuture';
