'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '@/components/ui';
import { cn } from '@/utils/ui';
import { NewsCardProps } from './types';

const READ_MORE_DEFAULT_LABEL = 'مشاهده بیشتر';

export const NewsCard: React.FC<NewsCardProps> = ({
  image,
  title,
  excerpt,
  href,
  linkLabel = READ_MORE_DEFAULT_LABEL,
  className,
  imageWrapperClassName,
  imageClassName,
  titleClassName,
  excerptClassName,
  linkClassName,
}) => {
  return (
    <article
      className={cn(
        'rounded-9 flex flex-col overflow-hidden bg-white shadow-sm transition-shadow hover:shadow-md',
        className,
      )}
    >
      <div
        className={cn('relative aspect-[400/250] w-full overflow-hidden', imageWrapperClassName)}
      >
        <Image
          src={image.src}
          alt={image.alt ?? title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={cn('object-cover', imageClassName)}
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <Typography variant="body-md" className={cn('font-semibold text-blue-900', titleClassName)}>
          {title}
        </Typography>

        <Typography
          variant="body-sm"
          className={cn('line-clamp-2 text-gray-700', excerptClassName)}
        >
          {excerpt}
        </Typography>

        {href && (
          <Link
            href={href}
            className={cn(
              'text-primary hover:text-primary-600 mt-auto w-fit text-sm font-medium transition-colors',
              linkClassName,
            )}
          >
            {linkLabel}
          </Link>
        )}
      </div>
    </article>
  );
};

NewsCard.displayName = 'NewsCard';
