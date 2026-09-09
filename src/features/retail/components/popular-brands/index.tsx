'use client';

import * as React from 'react';
import Image from 'next/image';
import { Typography } from '@/components/ui';
import { cn } from '@/utils/ui';
import {
  RETAIL_POPULAR_BRANDS,
  RETAIL_POPULAR_BRANDS_SPEED_SECONDS,
  RETAIL_POPULAR_BRANDS_TITLE,
} from '@/features/retail/constants';

/**
 * Popular brands showcase — a TV-ticker style marquee: the logo row passes
 * continuously at a constant uniform speed (linear timing, duplicated track
 * for a seamless loop).
 * Two very subtle orange accent strips sit flush against the site walls
 * (viewport edges), outside the content container.
 * Logos come from the feature constants (`RETAIL_POPULAR_BRANDS`).
 */
export const PopularBrands: React.FC<{ className?: string }> = ({ className }) => {
  // Two identical copies → translating the track by -50% loops seamlessly.
  const doubledBrands = [...RETAIL_POPULAR_BRANDS, ...RETAIL_POPULAR_BRANDS];

  return (
    <section
      aria-label={RETAIL_POPULAR_BRANDS_TITLE}
      className={cn('relative my-14 w-full md:my-20', className)}
    >
      {/* Subtle orange accents flush against the site walls */}
      <div
        aria-hidden="true"
        className="bg-primary-500 absolute inset-y-8 top-1/2 right-0 z-50 h-1/3 w-1.5 rounded-l-full"
      />
      <div
        aria-hidden="true"
        className="bg-primary-500 absolute inset-y-7 top-1/2 left-0 z-50 h-1/3 w-1.5 rounded-r-full"
      />

      <div className="flex flex-col gap-8 py-10">
        <Typography variant="h4" className="text-center text-gray-900">
          {RETAIL_POPULAR_BRANDS_TITLE}
        </Typography>

        {/* Ticker — LTR track keeps the translate math direction-stable; each
            tile carries its own horizontal margin so the -50% shift is exactly
            one full copy → the loop never jumps. */}
        <div dir="ltr" className="mt-8 overflow-hidden">
          <div
            className="animate-marquee flex w-max motion-reduce:animate-none"
            style={{ animationDuration: `${RETAIL_POPULAR_BRANDS_SPEED_SECONDS}s` }}
          >
            {doubledBrands.map((brand, index) => (
              <div
                key={`${brand.id}-${index}`}
                aria-hidden={index >= RETAIL_POPULAR_BRANDS.length}
                className="mx-2 flex w-20 shrink-0 items-center justify-center lg:w-24"
              >
                <Image
                  src={brand.logo}
                  alt={index < RETAIL_POPULAR_BRANDS.length ? brand.alt : ''}
                  width={72}
                  height={72}
                  className="h-12 w-12 object-contain lg:h-14 lg:w-14"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

PopularBrands.displayName = 'PopularBrands';
