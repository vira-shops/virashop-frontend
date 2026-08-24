'use client';

import * as React from 'react';
import { Toast } from './toast';
import {
  ToastContextProps,
  ToastContextValue,
  ToastItem,
  ToastOptions,
  ToastVariant,
} from './types';

const ToastContext = React.createContext<ToastContextValue | null>(null);

const DEFAULT_DURATION = 5000;

export const ToastProvider: React.FC<ToastContextProps> = ({ children }) => {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);
  const timersRef = React.useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = React.useCallback((id: string) => {
    const timer = timersRef.current.get(id);

    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }

    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const show = React.useCallback(
    ({
      variant = 'info',
      duration = DEFAULT_DURATION,
      ...options
    }: ToastOptions & { variant?: ToastVariant }) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

      setToasts((current) => [...current, { id, variant, ...options }]);

      if (duration > 0) {
        timersRef.current.set(
          id,
          setTimeout(() => dismiss(id), duration),
        );
      }

      return id;
    },
    [dismiss],
  );

  const showVariant = React.useCallback(
    (variant: ToastVariant) =>
      (description: string, options?: Omit<ToastOptions, 'variant' | 'description'>) =>
        show({ ...options, description, variant }),
    [show],
  );

  React.useEffect(() => {
    const timers = timersRef.current;

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
    };
  }, []);

  const contextValue = React.useMemo<ToastContextValue>(
    () => ({
      show,
      dismiss,
      success: showVariant('success'),
      error: showVariant('error'),
      info: showVariant('info'),
    }),
    [show, dismiss, showVariant],
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className="toast-viewport" aria-label="اطلاع‌رسانی">
        {toasts.map(({ id, variant, title, description }) => (
          <Toast
            key={id}
            variant={variant}
            title={title}
            description={description}
            onClose={title ? () => dismiss(id) : undefined}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};
