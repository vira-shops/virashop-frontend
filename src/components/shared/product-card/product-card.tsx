import * as React from 'react';
import { Badge, Button, Card, Typography } from '@/components/ui';
import { cn } from '@/utils/ui';
import { ProductCardProps } from './types';

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  startBadge,
  endBadge,
  title,
  priceLabel,
  price,
  stockNote,
  action,
  className,
  headerClassName,
  imageWrapperClassName,
  imageClassName,
  titleClassName,
  separatorClassName,
  priceRowClassName,
  priceLabelClassName,
  priceClassName,
  stockNoteClassName,
  actionRowClassName,
}) => {
  const buyButton = !action ? null : action.href ? (
    <Button size="xs" variant="fill" color="primary" href={action.href}>
      {action.label}
    </Button>
  ) : (
    <Button
      size="sm"
      variant="fill"
      color="primary"
      onClick={action.onClick}
      disabled={action.disabled}
    >
      {action.label}
    </Button>
  );

  return (
    <Card
      variant="fill"
      className={cn('w-product-card', className)}
      header={
        startBadge || endBadge ? (
          <div className={cn('flex items-center justify-between gap-2 px-3 pt-5', headerClassName)}>
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
          </div>
        ) : undefined
      }
      image={{
        src: image.src,
        alt: image.alt,
        imageWrapperClassName: cn('aspect-product-card', imageWrapperClassName),
        imageClassName: cn('object-contain', imageClassName),
      }}
    >
      <Typography variant="body-sm" className={cn('line-clamp-2 text-gray-400', titleClassName)}>
        {title}
      </Typography>

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
            <Typography variant="body-md" className={cn('font-bold text-black', priceClassName)}>
              {price}
            </Typography>
          )}
        </div>
      )}

      {(stockNote || buyButton) && (
        <div className={cn('flex items-center justify-between gap-5', actionRowClassName)}>
          {stockNote && (
            <Typography
              variant="caption-md"
              className={cn('rounded-5 bg-blue-100 px-9 py-1.5 text-gray-400', stockNoteClassName)}
            >
              {stockNote}
            </Typography>
          )}
          {buyButton}
        </div>
      )}
    </Card>
  );
};

ProductCard.displayName = 'ProductCard';
