import * as React from 'react';
import Image from 'next/image';
import { BrandLogoCardProps } from './types';

export const BrandLogoCard: React.FC<BrandLogoCardProps> = ({ brand }) => (
  <div className="rounded-8 flex h-14 w-14 items-center justify-center bg-white shadow-md md:h-28 md:w-28">
    <Image
      src={brand.logo}
      alt={brand.logoAlt ?? brand.name}
      width={64}
      height={64}
      className="h-10 w-10 object-contain md:h-24 md:w-24"
    />
  </div>
);

BrandLogoCard.displayName = 'BrandLogoCard';
