'use client';

import * as React from 'react';
import { cn } from '@/utils/ui';
import type { ValueSliderColor, ValueSliderProps } from './types';

const colorClasses: Record<ValueSliderColor, string> = {
  primary: 'value-slider-primary',
  blue: 'value-slider-blue',
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/**
 * Single-handle slider with a value bubble riding the thumb and the range
 * ends printed underneath. Laid out LTR (low on the start side) like
 * `RangeSlider`, which is how the design draws it even on RTL pages.
 */
export const ValueSlider: React.FC<ValueSliderProps> = ({
  min,
  max,
  step = 1,
  value,
  defaultValue,
  onValueChange,
  onValueCommit,
  formatLabel = (v) => String(v),
  'aria-label': ariaLabel,
  disabled,
  color = 'primary',
  className,
  trackClassName,
  rangeClassName,
  bubbleClassName,
  labelsClassName,
}) => {
  const [innerValue, setInnerValue] = React.useState(defaultValue ?? min);
  const currentValue = clamp(value ?? innerValue, min, max);
  const percent = ((currentValue - min) / (max - min || 1)) * 100;

  const update = (raw: number) => {
    const next = clamp(raw, min, max);
    setInnerValue(next);
    onValueChange?.(next);
  };

  return (
    <div
      dir="ltr"
      className={cn(
        'value-slider',
        colorClasses[color],
        disabled && 'value-slider-disabled',
        className,
      )}
    >
      {/* The wrapper is LTR so the track runs low → high; the labels carry
          Persian text, so they opt back into RTL for correct bidi order.
          Offset uses physical `left` on purpose — `inset-inline-start` would
          resolve against the bubble's own RTL direction and jump to the far
          side of the track. */}
      <span
        dir="rtl"
        aria-hidden="true"
        style={{ left: `${percent}%` }}
        className={cn('value-slider-bubble', bubbleClassName)}
      >
        {formatLabel(currentValue)}
      </span>

      <div className={cn('value-slider-track', trackClassName)}>
        <div
          className={cn('value-slider-range', rangeClassName)}
          style={{ width: `${percent}%` }}
        />
      </div>

      <input
        type="range"
        aria-label={ariaLabel}
        min={min}
        max={max}
        step={step}
        value={currentValue}
        disabled={disabled}
        onChange={(event) => update(Number(event.target.value))}
        onPointerUp={() => onValueCommit?.(currentValue)}
        onBlur={() => onValueCommit?.(currentValue)}
        className="value-slider-input"
      />

      <div dir="rtl" className={cn('value-slider-labels', labelsClassName)}>
        <span>{formatLabel(max)}</span>
        <span>{formatLabel(min)}</span>
      </div>
    </div>
  );
};

ValueSlider.displayName = 'ValueSlider';
