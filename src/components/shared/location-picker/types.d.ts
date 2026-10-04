export interface LatLng {
  lat: number;
  lng: number;
}

export interface LocationPickerProps {
  /** Selected point; `null` centers on the default city without a pin. */
  value: LatLng | null;
  onChange: (value: LatLng) => void;
  /** Map center when there is no value. @default Yazd */
  defaultCenter?: LatLng;
  /** @default 15 */
  zoom?: number;
  /** Size the map with height / aspect utilities. @default 'h-80' */
  className?: string;
}

export interface LocationPickerModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (value: LatLng) => void;
  /** Pre-selected point when editing an existing address. */
  initialValue?: LatLng | null;
  /** @default 'آدرس' */
  title?: string;
  /** @default 'آدرس خود را روی نقشه انتخاب کنید' */
  description?: string;
  /** @default 'تایید' */
  confirmLabel?: string;
  /** `data-theme` for the portal (it renders outside the page's themed wrapper). */
  theme?: string;
}

export interface LocationPickerFieldProps {
  value: LatLng | null;
  onChange: (value: LatLng) => void;
  disabled?: boolean;
  /** Modal heading. @default 'آدرس' */
  title?: string;
  /** `data-theme` for the modal portal. */
  theme?: string;
  /** Size the dashed tile with height / width utilities. @default 'h-26 w-full' */
  className?: string;
}

export interface MapThumbnailProps {
  value: LatLng;
  /** @default 15 */
  zoom?: number;
  /** Accessible name. @default 'موقعیت روی نقشه' */
  label?: string;
  /** Size the thumbnail with size utilities. @default 'size-14' */
  className?: string;
}

export interface PlaceSearchProps {
  /** A match was found — center the map and drop the pin there. */
  onFound: (value: LatLng) => void;
}
