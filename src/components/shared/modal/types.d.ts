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
}
