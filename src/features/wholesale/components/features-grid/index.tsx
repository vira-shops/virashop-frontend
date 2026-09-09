'use client';

import * as React from 'react';
import { TickCircleIcon, ShopIcon, CarIcon } from '@icons';
import { Typography } from '@/components/ui';
import { cn } from '@/utils/ui';
import {
  WHOLESALE_FEATURES,
  WHOLESALE_FEATURES_DESCRIPTION,
  WHOLESALE_FEATURES_TITLE,
} from '@/features/wholesale/constants';

const FEATURE_ICONS = [TickCircleIcon, ShopIcon, CarIcon];

export const FeaturesGrid: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <section aria-label={WHOLESALE_FEATURES_TITLE} className={cn('w-full', className)}>
      <div className="container flex flex-col items-center gap-3 py-14 text-center">
        <Typography variant="h3" className="text-gray-900">
          {WHOLESALE_FEATURES_TITLE}
        </Typography>
        <Typography variant="body-md" className="max-w-2xl text-gray-600">
          {WHOLESALE_FEATURES_DESCRIPTION}
        </Typography>

        <div className="mt-8 grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
          {WHOLESALE_FEATURES.map((feature, index) => {
            const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length];

            return (
              <div
                key={feature.id}
                className="rounded-9 flex flex-col items-center gap-3 bg-white p-8 text-center shadow-sm"
              >
                {Icon && <Icon className="size-12 shrink-0" aria-hidden="true" />}
                <Typography variant="h5" color="primary">
                  {feature.title}
                </Typography>
                <Typography variant="body-sm" className="text-gray-500">
                  {feature.description}
                </Typography>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

FeaturesGrid.displayName = 'FeaturesGrid';
