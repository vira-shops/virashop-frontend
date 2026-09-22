import * as React from 'react';
import { Badge, Button, Card, Typography } from '@/components/ui';
import { cn } from '@/utils/ui';
import { ProductCardOrientation, ProductCardProps } from './types';

/**
 * Shell + image sizing per orientation. `horizontal` lays the image beside the
 * content as a fixed 96px square (`size-18` on this project's spacing scale);
 * `vertical` keeps the full-bleed banner image above the content.
 */
const shellClasses: Record<ProductCardOrientation, string> = {
  // `h-full` lets a grid/carousel cell stretch the card, which is what keeps
  // the bottom group (price + action) on one line across a row.
  vertical: 'w-product-card h-full',
  horizontal: 'w-full flex-row items-center gap-3 p-3',
};

const imageWrapperClasses: Record<ProductCardOrientation, string> = {
  vertical: 'aspect-product-card',
  horizontal: 'rounded-8 size-18 shrink-0',
};

const contentClasses: Record<ProductCardOrientation, string> = {
  vertical: 'flex-1',
  horizontal: 'min-w-0 flex-1 p-0',
};

const badgeRowClasses: Record<ProductCardOrientation, string> = {
  vertical: 'px-3 pt-5',
  horizontal: '',
};

/** The horizontal box is a 96px thumbnail — without this it would fetch a full-width source. */
const imageSizes: Record<ProductCardOrientation, string | undefined> = {
  vertical: undefined,
  horizontal: '96px',
};

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  startBadge,
  endBadge,
  title,
  priceLabel,
  price,
  priceCurrency = 'تومان',
  stockNote,
  action,
  orientation = 'vertical',
  reserveBadgeRow = false,
  className,
  headerClassName,
  imageWrapperClassName,
  imageClassName,
  contentClassName,
  titleClassName,
  separatorClassName,
  priceRowClassName,
  priceLabelClassName,
  priceClassName,
  priceCurrencyClassName,
  stockNoteClassName,
  actionRowClassName,
  actionClassName,
}) => {
  const isHorizontal = orientation === 'horizontal';

  const buyButton = !action ? null : action.href ? (
    <Button
      size="xs"
      variant="fill"
      color="primary"
      href={action.href}
      // `button-text-xs` grows to a 44px touch target on coarse pointers
      // (button.css) — right for a standalone button, but here it sits in a
      // row next to the stock-note pill and only needs to match its ~32px
      // height, so the bump is pinned back to the desktop size.
      className={cn('h-11!', actionClassName)}
    >
      {action.label}
    </Button>
  ) : (
    <Button
      size="sm"
      variant="fill"
      color="primary"
      onClick={action.onClick}
      disabled={action.disabled}
      // Same touch-target override as the `xs` branch above, for `sm`'s own
      // desktop height.
      className={cn('h-[36px]!', actionClassName)}
    >
      {action.label}
    </Button>
  );

  const hasBadges = Boolean(startBadge || endBadge);

  const badgeRow =
    hasBadges || reserveBadgeRow ? (
      <div
        className={cn(
          'flex items-center justify-between gap-2',
          badgeRowClasses[orientation],
          headerClassName,
        )}
      >
        {startBadge && (
          <Badge variant="soft" color="warning-blue" size="sm" radius="sm">
            {startBadge}
          </Badge>
        )}
        {endBadge && (
          <Badge variant="soft" color="warning-green" size="sm" radius="sm">
            {endBadge}
          </Badge>
        )}
        {/*
          Holds the row open at exactly one badge's height so a card with no
          badge still starts its image on the same line as its neighbours —
          no magic pixel value to keep in sync with the Badge sizes.
        */}
        {!hasBadges && (
          <Badge
            variant="soft"
            color="gray"
            size="sm"
            radius="sm"
            aria-hidden
            className="invisible"
          >
            &zwnj;
          </Badge>
        )}
      </div>
    ) : null;

  return (
    <Card
      variant="fill"
      className={cn(shellClasses[orientation], className)}
      // Horizontal puts the badges inside the content column, next to the
      // title — Card renders `header` above the image, which only works for
      // the vertical layout.
      header={isHorizontal ? undefined : badgeRow}
      image={{
        src: image.src,
        alt: image.alt,
        sizes: imageSizes[orientation],
        imageWrapperClassName: cn(imageWrapperClasses[orientation], imageWrapperClassName),
        imageClassName: cn('object-contain', imageClassName),
      }}
      contentClassName={cn(contentClasses[orientation], contentClassName)}
    >
      {isHorizontal && badgeRow}

      <Typography variant="body-sm" className={cn('line-clamp-2 text-gray-400', titleClassName)}>
        {title}
      </Typography>

      {/*
        Everything below the title is bottom-aligned, so a one-line and a
        two-line title still leave their prices and buy buttons on the same
        line across a row of cards.
      */}
      <div className="mt-auto flex flex-col gap-2">
        <div
          className={cn('border-t border-dotted border-gray-300', separatorClassName)}
          aria-hidden="true"
        />

        {(priceLabel || price) && (
          <div className={cn('flex items-center justify-between gap-5', priceRowClassName)}>
            {priceLabel && (
              <Typography variant="caption-md" className={cn('text-gray-700', priceLabelClassName)}>
                {priceLabel}
              </Typography>
            )}
            {price && (
              // The unit is its own node so the amount keeps a single text
              // node (tests and copy-paste both read the bare number) and can
              // be sized independently of it.
              <div className="flex items-baseline gap-1">
                <Typography
                  variant="body-md"
                  className={cn('font-bold text-black', priceClassName)}
                >
                  {price}
                </Typography>
                {priceCurrency && (
                  <Typography
                    variant="caption-md"
                    className={cn('shrink-0 text-gray-700', priceCurrencyClassName)}
                  >
                    {priceCurrency}
                  </Typography>
                )}
              </div>
            )}
          </div>
        )}

        {(stockNote || buyButton) && (
          <div className={cn('flex items-center justify-between gap-5', actionRowClassName)}>
            {stockNote && (
              <Typography
                variant="caption-md"
                className={cn(
                  'rounded-5 bg-blue-100 px-9 py-1.5 text-gray-400',
                  stockNoteClassName,
                )}
              >
                {stockNote}
              </Typography>
            )}
            {buyButton}
          </div>
        )}
      </div>
    </Card>
  );
};

ProductCard.displayName = 'ProductCard';
