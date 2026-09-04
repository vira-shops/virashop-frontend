import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/utils/ui';
import { CardProps, CardRadius, CardShadow, CardVariant } from './types';

const variantClasses: Record<CardVariant, string> = {
  outline: 'card-outline',
  fill: 'card-fill',
  ghost: 'card-ghost',
};

const radiusClasses: Record<CardRadius, string> = {
  sm: 'card-radius-sm',
  md: 'card-radius-md',
  lg: 'card-radius-lg',
  xl: 'card-radius-xl',
  '2xl': 'card-radius-2xl',
};

const shadowClasses: Record<CardShadow, string> = {
  none: '',
  sm: 'card-shadow-sm',
  md: 'card-shadow-md',
  lg: 'card-shadow-lg',
};

const renderImage = (image: NonNullable<CardProps['image']>) => {
  const {
    src,
    alt = '',
    badge,
    secondaryBadge,
    href,
    imageWrapperClassName,
    imageClassName,
  } = image;

  const img = (
    <div className={cn('card-image-wrapper', imageWrapperClassName)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 320px"
        className={cn('card-image', imageClassName)}
      />
      {secondaryBadge && <div className="card-image-badge-secondary">{secondaryBadge}</div>}
      {badge && <div className="card-image-badge">{badge}</div>}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="card-image-link">
        {img}
      </Link>
    );
  }

  return img;
};

export const Card: React.FC<CardProps> = ({
  variant = 'outline',
  radius = 'lg',
  shadow = 'sm',
  header,
  image,
  title,
  description,
  price,
  action,
  stock,
  contentClassName,
  titleClassName,
  descriptionClassName,
  priceClassName,
  actionClassName,
  className,
  children,
  ...rest
}) => {
  return (
    <div
      dir="rtl"
      data-slot="card"
      className={cn(
        'card',
        variantClasses[variant],
        radiusClasses[radius],
        shadowClasses[shadow],
        className,
      )}
      {...rest}
    >
      {header}

      {image && renderImage(image)}

      {(title || description || price || action || stock || children) && (
        <div className={cn('card-content', contentClassName)}>
          {(title || description) && (
            <div className="card-header">
              {title && <div className={cn('card-title', titleClassName)}>{title}</div>}
              {description && (
                <div className={cn('card-description', descriptionClassName)}>{description}</div>
              )}
            </div>
          )}

          {price &&
            (price.label ? (
              <div className={cn('card-price-row', priceClassName)}>
                <span className="card-price-label">{price.label}</span>
                <div className="card-price">
                  <span className="card-price-current">{price.current}</span>
                  {price.original && <span className="card-price-original">{price.original}</span>}
                  <span className="card-price-currency">{price.currency ?? 'تومان'}</span>
                </div>
              </div>
            ) : (
              <div className={cn('card-price', priceClassName)}>
                <span className="card-price-current">{price.current}</span>
                {price.original && <span className="card-price-original">{price.original}</span>}
                <span className="card-price-currency">{price.currency ?? 'تومان'}</span>
              </div>
            ))}

          {(action || stock) && (
            <div
              className={cn(
                'card-action-row',
                stock && action && 'card-action-row-with-stock',
                actionClassName,
              )}
            >
              {stock && <div className="card-stock">{stock}</div>}
              {action && <div className="card-action">{action}</div>}
            </div>
          )}

          {children}
        </div>
      )}
    </div>
  );
};
