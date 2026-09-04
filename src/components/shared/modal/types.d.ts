import { ReactNode } from 'react';

export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  footer?: ReactNode;
  size?: ModalSize;
  closeOnBackdrop?: boolean;
  children?: ReactNode;
  className?: string;
  /* --- Style overrides (merged with cn; utilities outrank baked-in classes) --- */
  containerClassName?: string;
  backdropClassName?: string;
  headerClassName?: string;
  titleClassName?: string;
  closeClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
}
