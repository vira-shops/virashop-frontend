import { ReactNode } from 'react';

export type ToastVariant = 'success' | 'error' | 'info';

export interface ToastOptions {
  title?: string;
  description: string;
  duration?: number;
}

export interface ToastItem extends ToastOptions {
  id: string;
  variant: ToastVariant;
}

export interface ToastContextValue {
  show: (options: ToastOptions & { variant?: ToastVariant }) => string;
  success: (description: string, options?: Omit<ToastOptions, 'variant' | 'description'>) => string;
  error: (description: string, options?: Omit<ToastOptions, 'variant' | 'description'>) => string;
  info: (description: string, options?: Omit<ToastOptions, 'variant' | 'description'>) => string;
  dismiss: (id: string) => void;
}

export interface ToastContextProps {
  children: ReactNode;
}

export interface ToastProps {
  variant?: ToastVariant;
  title?: string;
  description: string;
  onClose?: () => void;
}
