'use client';

import * as React from 'react';
import { cn } from '@/utils/ui';
import type { RangeSliderColor, RangeSliderProps, RangeSliderValue } from './types';

const colorClasses: Record<RangeSliderColor, string> = {
  primary: 'range-slider-primary',
  blue: 'range-slider-blue',
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step = 1,
  value,
  defaultValue,
  onValueChange,
  onValueCommit,
  formatLabel = (v) => String(v),
  disabled,
  color = 'primary',
  className,
  trackClassName,
  rangeClassName,
  thumbInputClassName,
  labelsClassName,
}) => {
  const [innerValue, setInnerValue] = React.useState<RangeSliderValue>(defaultValue ?? [min, max]);

  const currentValue = value ?? innerValue;
  const [lower, upper] = currentValue;

  const commit = (next: RangeSliderValue) => {
    onValueCommit?.(next);
  };

  const updateLower = (raw: number) => {
    const next: RangeSliderValue = [clamp(raw, min, upper), upper];
    setInnerValue(next);
    onValueChange?.(next);
  };

  const updateUpper = (raw: number) => {
    const next: RangeSliderValue = [lower, clamp(raw, lower, max)];
    setInnerValue(next);
    onValueChange?.(next);
  };

  const percentOf = (v: number) => ((v - min) / (max - min || 1)) * 100;
  const lowerPercent = percentOf(lower);
  const upperPercent = percentOf(upper);

  return (
    <div
      dir="ltr"
      className={cn(
        'range-slider',
        colorClasses[color],
        disabled && 'range-slider-disabled',
        className,
      )}
    >
      <div className={cn('range-slider-track', trackClassName)}>
        <div
          className={cn('range-slider-range', rangeClassName)}
          style={{ insetInlineStart: `${lowerPercent}%`, insetInlineEnd: `${100 - upperPercent}%` }}
        />
      </div>
      <input
        type="range"
        aria-label="حداقل قیمت"
        min={min}
        max={max}
        step={step}
        value={lower}
        disabled={disabled}
        onChange={(event) => updateLower(Number(event.target.value))}
        onMouseUp={() => commit(currentValue)}
        onTouchEnd={() => commit(currentValue)}
        onKeyUp={() => commit(currentValue)}
        className={cn('range-slider-input', thumbInputClassName)}
      />
      <input
        type="range"
        aria-label="حداکثر قیمت"
        min={min}
        max={max}
        step={step}
        value={upper}
        disabled={disabled}
        onChange={(event) => updateUpper(Number(event.target.value))}
        onMouseUp={() => commit(currentValue)}
        onTouchEnd={() => commit(currentValue)}
        onKeyUp={() => commit(currentValue)}
        className={cn('range-slider-input', thumbInputClassName)}
      />
      <div dir="rtl" className={cn('range-slider-labels', labelsClassName)}>
        <span>{formatLabel(lower)}</span>
        <span>{formatLabel(upper)}</span>
      </div>
    </div>
  );
};
