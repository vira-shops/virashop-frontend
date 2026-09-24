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
  const [innerValue, setInnerValue] = React.useState<RangeSliderValue>(
    value ?? defaultValue ?? [min, max],
  );

  /*
    A controlled `value` is only the committed range — callers that listen to
    `onValueCommit` alone (e.g. a URL-backed filter) never feed drag frames
    back. The thumbs therefore track a local draft while dragging, re-synced
    whenever the parent's `value` actually changes.
  */
  const [syncedValue, setSyncedValue] = React.useState(value);
  if (value && (value[0] !== syncedValue?.[0] || value[1] !== syncedValue?.[1])) {
    setSyncedValue(value);
    setInnerValue(value);
  }

  const [lower, upper] = innerValue;

  // Reads the draft, which is always current by release — React flushes the
  // `change` re-render before `pointerup`/`keyup` fires.
  const commit = () => onValueCommit?.(innerValue);

  const update = (next: RangeSliderValue) => {
    setInnerValue(next);
    onValueChange?.(next);
  };

  const updateLower = (raw: number) => update([clamp(raw, min, upper), upper]);

  const updateUpper = (raw: number) => update([lower, clamp(raw, lower, max)]);

  const percentOf = (v: number) => ((v - min) / (max - min || 1)) * 100;
  const lowerPercent = percentOf(lower);
  const upperPercent = percentOf(upper);

  return (
    // RTL so the min thumb/label sit on the right and the max thumb/label
    // on the left, matching Persian reading order (right = start = min).
    // The colored range bar uses logical inset-inline-* (mirrors with dir),
    // and the labels below inherit this same dir, so both thumbs and their
    // labels stay in the same physical order.
    <div
      dir="rtl"
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
        onPointerUp={commit}
        onKeyUp={commit}
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
        onPointerUp={commit}
        onKeyUp={commit}
        className={cn('range-slider-input', thumbInputClassName)}
      />
      {/*
        Inherits `dir="ltr"` from the slider wrapper — the labels must stay
        in the SAME physical order as the two thumbs (lower on the left,
        upper on the right). An explicit `dir="rtl"` here would flip only
        the labels, so the lower thumb (left) sits under the upper label
        and dragging it looks like it changes the "wrong" price.
      */}
      <div className={cn('range-slider-labels', labelsClassName)}>
        <span>{formatLabel(lower)}</span>
        <span>{formatLabel(upper)}</span>
      </div>
    </div>
  );
};
