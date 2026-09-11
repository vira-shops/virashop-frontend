'use client';

import * as React from 'react';
import { cn } from '@/utils/ui';
import { OtpInputProps, OtpInputSize, OtpInputState } from './types';

const sizeClasses: Record<OtpInputSize, string> = {
  sm: 'otp-size-sm',
  md: 'otp-size-md',
  lg: 'otp-size-lg',
};

const stateClasses: Record<OtpInputState, string> = {
  error: 'otp-input-error',
  success: 'otp-input-success',
};

const stateMessageClasses: Record<OtpInputState, string> = {
  error: 'text-warning-red',
  success: 'text-warning-green',
};

/** Normalizes Persian/Arabic digits to ASCII and strips non-digits. */
const toDigits = (raw: string): string =>
  raw
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
    .replace(/\D/g, '');

export const OtpInput: React.FC<OtpInputProps> = ({
  value,
  defaultValue = '',
  onChange,
  onComplete,
  length = 6,
  size = 'md',
  state,
  disabled,
  autoFocus,
  label = 'کد تایید',
  message,
  dir = 'ltr',
  className,
  cellClassName,
  messageClassName,
  ref,
}) => {
  const [innerValue, setInnerValue] = React.useState(defaultValue);
  const cellRefs = React.useRef<Array<HTMLInputElement | null>>([]);

  const currentValue = value ?? innerValue;
  const cells = Array.from({ length }, (_, index) => currentValue[index] ?? '');
  const showMessage = Boolean(message);

  const commit = (next: string) => {
    setInnerValue(next);
    onChange?.(next);

    if (next.length === length) {
      onComplete?.(next);
    }
  };

  const focusCell = (index: number) => {
    cellRefs.current[Math.max(0, Math.min(length - 1, index))]?.focus();
  };

  const handleCellChange = (index: number, raw: string) => {
    const digits = toDigits(raw);
    const arr = [...cells];

    if (digits.length > 1) {
      // Autofill-like input — distribute from this cell onward.
      for (let offset = 0; offset < digits.length && index + offset < length; offset += 1) {
        arr[index + offset] = digits[offset];
      }
    } else {
      arr[index] = digits;
    }

    commit(arr.join(''));

    if (digits.length > 0) {
      focusCell(index + digits.length);
    }
  };

  const handleCellKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !cells[index] && index > 0) {
      event.preventDefault();
      const arr = [...cells];
      arr[index - 1] = '';
      commit(arr.join(''));
      focusCell(index - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      focusCell(index - 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      focusCell(index + 1);
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    event.preventDefault();
    const digits = toDigits(event.clipboardData.getData('text')).slice(0, length);
    const arr = Array.from({ length }, (_, index) => digits[index] ?? '');

    commit(arr.join(''));
    focusCell(digits.length);
  };

  React.useEffect(() => {
    if (autoFocus && !disabled) {
      cellRefs.current[0]?.focus();
    }
    // Run once on mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div dir={dir} className={cn('flex flex-col items-center gap-5', className)}>
      <div
        role="group"
        aria-label={label}
        onPaste={handlePaste}
        className={cn(
          'otp-input',
          sizeClasses[size],
          state && stateClasses[state],
          disabled && 'otp-input-disabled',
        )}
      >
        {cells.map((digit, index) => (
          <input
            key={index}
            ref={(node) => {
              cellRefs.current[index] = node;
              if (index === 0 && ref) {
                if (typeof ref === 'function') ref(node);
                else ref.current = node;
              }
            }}
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            maxLength={1}
            value={digit}
            disabled={disabled}
            aria-label={`${label} — رقم ${index + 1}`}
            onChange={(event) => handleCellChange(index, event.target.value)}
            onKeyDown={(event) => handleCellKeyDown(index, event)}
            onFocus={(event) => event.target.select()}
            className={cn('otp-cell', cellClassName)}
          />
        ))}
      </div>
      {showMessage && (
        <p className={cn('otp-message', state && stateMessageClasses[state], messageClassName)}>
          {message}
        </p>
      )}
    </div>
  );
};
