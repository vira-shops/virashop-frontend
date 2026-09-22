'use client';

import * as React from 'react';
import { Button, Carousel, CarouselContent, CarouselItem, Typography } from '@/components/ui';
import { ProductCard } from '@/components/shared/product-card';
import { cn } from '@/utils/ui';
import { splitTitleEmphasis } from '@/utils/format';
import { CardSectionProps } from './types';

export const CardSection: React.FC<CardSectionProps> = ({
  title,
  description,
  link,
  items,
  className,
  headerClassName,
  titleClassName,
  carouselClassName,
  itemClassName,
}) => {
  if (items.length === 0) {
    return null;
  }

  const { lead, rest } = splitTitleEmphasis(title);

  // See `ProductGrid` — holds the badge row open on the cards without one so
  // the row of cards stays aligned.
  const reserveBadgeRow = items.some((item) => item.startBadge || item.endBadge);

  const linkButton = !link ? null : link.href ? (
    <Button
      size="sm"
      variant="ghost"
      color="primary"
      href={link.href}
      className="mb-2 h-fit w-fit p-0 hover:bg-transparent"
    >
      {link.label}
    </Button>
  ) : (
    <Button size="sm" variant="ghost" color="primary" onClick={link.onClick}>
      {link.label}
    </Button>
  );

  return (
    <section aria-label={title} className={className}>
      <div className="container">
        <div className={cn('mb-8 flex w-full items-end justify-between', headerClassName)}>
          <div className="flex flex-col items-start gap-4">
            <Typography variant="h4" color="primary" className={titleClassName}>
              {lead}
              {rest && <span className="text-black">{rest}</span>}
            </Typography>
            <Typography variant="body-sm" className="text-gray-300">
              {description}
            </Typography>
          </div>
          {linkButton}
        </div>

        <Carousel opts={{ loop: false }}>
          <CarouselContent className={cn('justify-between gap-11', carouselClassName)}>
            {items.map(({ id, ...item }, index) => (
              <CarouselItem
                key={id ?? `card-section-item-${index}`}
                className={cn('w-product-card', itemClassName)}
              >
                <ProductCard reserveBadgeRow={reserveBadgeRow} {...item} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

CardSection.displayName = 'CardSection';
