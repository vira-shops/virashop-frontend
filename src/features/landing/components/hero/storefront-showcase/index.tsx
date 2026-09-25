'use client';

import * as React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { cn } from '@/utils/ui';
import { useStorefrontShowcase } from '@/hooks';
import { SHOWCASE_ARIA_LABEL, SHOWCASE_IMAGE_SIZES, STOREFRONT_HREF } from './constants';
import type { StorefrontShowcaseProps } from './types';
import { StorefrontShowcaseSkeleton } from './skeleton';

export const StorefrontShowcase: React.FC<StorefrontShowcaseProps> = ({ className }) => {
  const showcaseQuery = useStorefrontShowcase();
  const items = showcaseQuery.data ?? null;

  if (showcaseQuery.isLoading) {
    return <StorefrontShowcaseSkeleton />;
  }

  return (
    <section
      dir="rtl"
      aria-label={SHOWCASE_ARIA_LABEL}
      className={cn('relative container', className)}
    >
      <div className="relative mx-auto flex max-w-[752px] items-start justify-between gap-7 md:gap-11">
        {items?.map((item, index) => (
          <div
            key={index}
            className="md:w-storefront mt-12 flex w-[calc(50%-var(--spacing-5))] flex-col items-center gap-7 md:mt-0 md:gap-11"
          >
            <div className="aspect-storefront rounded-9 relative w-full overflow-hidden">
              <Image
                src={item.image}
                alt={item.imageAlt ?? ''}
                fill
                sizes={SHOWCASE_IMAGE_SIZES}
                className="object-cover"
              />
            </div>

            <div className="md:w-storefront-button w-full">
              <Button
                href={STOREFRONT_HREF[item.buttonColor]}
                variant="fill"
                color={item.buttonColor}
                fullWidth
                size="xl"
                className="max-md:h-12 max-md:min-w-0"
              >
                {item.buttonLabel}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

StorefrontShowcase.displayName = 'StorefrontShowcase';
