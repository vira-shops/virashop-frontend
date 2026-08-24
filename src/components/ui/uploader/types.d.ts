export interface UploaderProps {
  label?: string;
  placeholder?: string;
  accept?: string;
  maxSizeMb?: number;
  file?: File | null;
  disabled?: boolean;
  onChange?: (file: File | null) => void;
  className?: string;
}
