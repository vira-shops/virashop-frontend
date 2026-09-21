'use client';

import * as React from 'react';
import { cn } from '@/utils/ui';
import { TabsProps, TabsVariant, TabsColor, TabsSize, TabItem } from './types';

const variantClasses: Record<TabsVariant, string> = {
  fill: 'tabs-fill',
  outline: 'tabs-outline',
  underline: 'tabs-underline',
};

const colorClasses: Record<TabsColor, string> = {
  primary: 'tabs-primary',
  blue: 'tabs-blue',
  yellow: 'tabs-yellow',
  retail: 'tabs-retail',
  wholesale: 'tabs-wholesale',
};

const sizeClasses: Record<TabsSize, string> = {
  sm: 'tabs-size-sm',
  md: 'tabs-size-md',
  lg: 'tabs-size-lg',
};

export const Tabs: React.FC<TabsProps> = ({
  items,
  value,
  defaultValue,
  onChange,
  variant = 'fill',
  color = 'primary',
  size = 'md',
  fullWidth,
  disabled,
  'aria-label': ariaLabel,
  className,
  itemClassName,
}) => {
  const [innerValue, setInnerValue] = React.useState(defaultValue ?? items[0]?.value ?? '');
  const itemRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

  const currentValue = value ?? innerValue;
  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.value === currentValue),
  );

  const isItemDisabled = (item: TabItem) => disabled || item.disabled;

  const select = (item: TabItem) => {
    if (isItemDisabled(item)) return;

    setInnerValue(item.value);
    onChange?.(item.value);
  };

  const moveSelection = (index: number) => {
    const next = items[index];

    if (!next) return;

    select(next);
    itemRefs.current[index]?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    // RTL: the first item renders on the right, so ArrowRight walks backwards.
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      moveSelection(Math.max(0, index - 1));
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      moveSelection(Math.min(items.length - 1, index + 1));
    } else if (event.key === 'Home') {
      event.preventDefault();
      moveSelection(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      moveSelection(items.length - 1);
    }
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        'tabs',
        variantClasses[variant],
        colorClasses[color],
        sizeClasses[size],
        fullWidth && 'tabs-fullWidth',
        disabled && 'tabs-disabled',
        className,
      )}
    >
      {items.map((item, index) => (
        <button
          key={item.value}
          ref={(node) => {
            itemRefs.current[index] = node;
          }}
          type="button"
          role="tab"
          aria-selected={item.value === currentValue}
          tabIndex={index === activeIndex ? 0 : -1}
          disabled={isItemDisabled(item)}
          onClick={() => select(item)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          className={cn(
            'tab-item',
            item.value === currentValue && 'tab-item-active',
            isItemDisabled(item) && 'tab-item-disabled',
            itemClassName,
          )}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </div>
  );
};
