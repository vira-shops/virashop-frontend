export type UploaderVariant = 'tile' | 'bar';

export interface UploaderProps {
  /**
   * `tile` (default) — square image-preview tile for photo uploads.
   * `bar` — full-width dashed link bar for a single document upload
   * (shows the file name once picked, no image preview).
   */
  variant?: UploaderVariant;
  label?: string;
  placeholder?: string;
  accept?: string;
  maxSizeMb?: number;
  file?: File | null;
  disabled?: boolean;
  onChange?: (file: File | null) => void;
  className?: string;
  /* --- Style overrides (merged with cn; utilities outrank baked-in classes) --- */
  wrapperClassName?: string;
  labelClassName?: string;
  previewClassName?: string;
  fileNameClassName?: string;
  placeholderClassName?: string;
  removeClassName?: string;
  errorMessageClassName?: string;
}
