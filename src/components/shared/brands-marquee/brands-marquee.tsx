'use client';

import * as React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { cn } from '@/utils/ui';
import type { BrandsMarqueeBrand, BrandsMarqueeLogoSize, BrandsMarqueeProps } from './types';

/** Distributes brands round-robin across `rowCount` rows. */
const distributeRows = (brands: BrandsMarqueeBrand[], rowCount: number): BrandsMarqueeBrand[][] => {
  const rows: BrandsMarqueeBrand[][] = Array.from({ length: rowCount }, () => []);
  brands.forEach((brand, index) => {
    rows[index % rowCount].push(brand);
  });
  return rows;
};

/** Logo tile + image sizing per `logoSize`. */
const LOGO_SIZE_CLASSES: Record<BrandsMarqueeLogoSize, { tile: string; image: string }> = {
  md: { tile: 'h-14 w-24 md:h-16 md:w-28', image: 'h-14 w-14 md:h-16 md:w-16' },
  sm: { tile: 'h-10 w-18 md:h-12 md:w-22', image: 'h-10 w-10 md:h-12 md:w-12' },
};

export const BrandsMarquee: React.FC<BrandsMarqueeProps> = ({
  brands,
  ctaLabel,
  ctaHref,
  onCtaClick,
  showCta = true,
  rowCount = 3,
  logoSize = 'md',
  ariaLabel,
  className,
  ctaClassName,
}) => {
  const rows = distributeRows(brands, rowCount);
  const sizeClasses = LOGO_SIZE_CLASSES[logoSize];
  const visibleRowCount = rows.filter((row) => row.length > 0).length;

  return (
    <section
      aria-label={ariaLabel ?? ctaLabel}
      className={cn('relative h-80 w-full overflow-hidden bg-white', className)}
    >
      {/* Side accents */}
      <div
        aria-hidden="true"
        className="bg-primary-500 animate-shine absolute top-1/2 left-0 z-20 h-28 w-1.5 -translate-y-1/2 rounded-r-full"
      />

      <div
        aria-hidden="true"
        className="bg-primary-500 animate-shine absolute top-1/2 right-0 z-20 h-28 w-1.5 -translate-y-1/2 rounded-l-full"
      />

      {/* Logo rows */}
      <div
        className={cn(
          'absolute inset-0 flex flex-col py-5',
          visibleRowCount > 1 ? 'justify-between' : 'justify-center',
        )}
      >
        {rows.map((rowBrands, rowIndex) => {
          if (!rowBrands.length) return null;

          const repeatedBrands = [...rowBrands, ...rowBrands, ...rowBrands, ...rowBrands];

          return (
            <div key={rowIndex} dir="ltr" className="relative overflow-hidden">
              <div
                className="animate-marquee flex w-max items-center motion-reduce:animate-none"
                style={{
                  animationDuration: `${35 + rowIndex * 6}s`,
                  animationDirection: rowIndex % 2 === 0 ? 'normal' : 'reverse',
                }}
              >
                {repeatedBrands.map((brand, index) => (
                  <div
                    key={`${brand.id}-${rowIndex}-${index}`}
                    aria-hidden={index >= rowBrands.length}
                    className={cn(
                      'mx-5 flex shrink-0 items-center justify-center opacity-[0.22] md:mx-7',
                      sizeClasses.tile,
                    )}
                  >
                    <Image
                      src={brand.logo}
                      alt={index < rowBrands.length ? (brand.logoAlt ?? brand.name) : ''}
                      width={80}
                      height={80}
                      className={cn('object-contain grayscale', sizeClasses.image)}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Center CTA */}
      {showCta && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <Button
            variant="fill"
            size="xxl"
            color="primary"
            href={ctaHref}
            onClick={ctaHref ? undefined : onCtaClick}
            className={ctaClassName}
          >
            {ctaLabel}
          </Button>
        </div>
      )}
    </section>
  );
};

BrandsMarquee.displayName = 'BrandsMarquee';
