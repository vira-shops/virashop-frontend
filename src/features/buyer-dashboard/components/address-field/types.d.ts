import type { TextareaHTMLAttributes, Ref } from 'react';
import type { LatLng } from '@/components/shared';

/**
 * The street-address box from the design: a borderless textarea and the
 * dashed «انتخاب روی نقشه» tile sharing one soft-filled panel.
 */
export interface AddressFieldProps {
  label: string;
  requiredMark?: boolean;
  /** Spread of `form.register('…')` (name / onChange / onBlur / ref). */
  textareaProps: Pick<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'name' | 'defaultValue' | 'onChange' | 'onBlur'
  > & {
    ref?: Ref<HTMLTextAreaElement>;
  };
  location: LatLng | null;
  onLocationChange: (value: LatLng) => void;
  error?: string;
  /** Shown under the panel when there is no error. */
  hint?: string;
  disabled?: boolean;
  /** `data-theme` for the portaled map modal. */
  theme: string;
  /** Size of the map tile beside the text on wide screens. @default 'md:w-1/2' */
  tileClassName?: string;
  labelClassName?: string;
  className?: string;
}
