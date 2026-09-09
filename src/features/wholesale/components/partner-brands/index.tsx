'use client';

import * as React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { usePartnerBrands } from '@/features/landing/hooks';
import { cn } from '@/utils/ui';
import { WHOLESALE_BRANDS_TITLE } from '@/features/wholesale/constants';

export const PartnerBrandsStrip: React.FC<{ className?: string }> = ({ className }) => {
  const brandsQuery = usePartnerBrands();
  const brands = brandsQuery.data ?? [];

  const rowCount = 3;

  const rows: { id: string; logo: string; name: string; logoAlt?: string }[][] = Array.from(
    { length: rowCount },
    () => [],
  );

  brands.forEach((brand, index) => {
    rows[index % rowCount].push(brand);
  });

  return (
    <section
      aria-label="برندهای همکار"
      className={cn('relative my-14 h-[320px] w-full overflow-hidden bg-white md:my-20', className)}
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
      <div className="absolute inset-0 flex flex-col justify-between py-5">
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
                    className="mx-5 flex h-14 w-24 shrink-0 items-center justify-center opacity-[0.22] md:mx-7 md:h-16 md:w-28"
                  >
                    <Image
                      src={brand.logo}
                      alt={index < rowBrands.length ? (brand.logoAlt ?? brand.name) : ''}
                      width={80}
                      height={80}
                      className="h-14 w-14 object-contain grayscale md:h-16 md:w-16"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Center CTA */}
      <div className="absolute inset-0 z-30 flex items-center justify-center">
        <Button
          variant="fill"
          size="xxl"
          color="primary"
          className="shadow-primary-500 shadow-[0_0_100px_12px_rgba(0,172,172,0.5)] backdrop-blur-2xl"
        >
          {WHOLESALE_BRANDS_TITLE}
        </Button>
      </div>
    </section>
  );
};

PartnerBrandsStrip.displayName = 'PartnerBrandsStrip';
