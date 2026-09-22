'use client';

import * as React from 'react';
import Image from 'next/image';
import { Typography } from '@/components/ui';
import { cn } from '@/utils/ui';
import type { CategoryCardProps } from './types';

/**
 * Category card — a white square tile with the image centered inside and the
 * title OUTSIDE below the card. Shared by the retail hero category row and
 * the header menus. With `moreLabel` it renders a "…more" overlay instead of
 * the image (truncated rows on mobile).
 */
export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  image,
  imageAlt,
  href,
  onClick,
  moreLabel,
  className,
}) => {
  const cardClass = cn(
    'group relative flex aspect-square w-full items-center justify-center',
    'rounded-6 border border-gray-100 bg-white p-4 shadow-sm',
    'transition-shadow hover:shadow-md',
    className,
  );

  const inner = moreLabel ? (
    <Typography variant="body-sm" className="text-gray-600">
      {moreLabel}
    </Typography>
  ) : (
    <Image
      src={image}
      alt={imageAlt ?? ''}
      fill
      sizes="(max-width: 1024px) 25vw, 140px"
      className="object-contain p-3"
    />
  );

  const content = (
    <div className="w-[80px] md:w-[128px]">
      <div className={cardClass}>{inner}</div>
      <Typography
        variant="caption-lg"
        className="group-hover:text-primary-500 mt-3 line-clamp-2 text-center text-gray-700 transition-colors"
      >
        {title}
      </Typography>
    </div>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className="group flex w-full flex-col items-center">
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className="group flex w-full flex-col items-center">
      {content}
    </button>
  );
};

CategoryCard.displayName = 'CategoryCard';
