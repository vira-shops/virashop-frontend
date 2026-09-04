export interface UploaderProps {
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
