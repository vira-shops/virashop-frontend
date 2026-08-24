'use client';

import * as React from 'react';
import { cn } from '@/utils/ui';
import { CancelIcon, CloseCircleIcon, SmsIcon, TickCircleIcon } from '@icons';
import { ToastProps, ToastVariant } from './types';

const variantClasses: Record<ToastVariant, string> = {
  success: 'toast-success',
  error: 'toast-error',
  info: 'toast-info',
};

const icons: Record<ToastVariant, React.ReactNode> = {
  success: <TickCircleIcon className="toast-icon" />,
  error: <CloseCircleIcon className="toast-icon" />,
  info: <SmsIcon className="toast-icon" />,
};

export const Toast: React.FC<ToastProps> = ({ variant = 'info', title, description, onClose }) => {
  return (
    <div role="status" aria-live="polite" className={cn('toast', variantClasses[variant])}>
      {title && (
        <div className="toast-header">
          <div className="toast-title-group">
            {icons[variant]}
            <span className="toast-title">{title}</span>
          </div>
          {onClose && (
            <button type="button" aria-label="بستن" className="toast-close" onClick={onClose}>
              <CancelIcon />
            </button>
          )}
        </div>
      )}
      <p className="toast-description">{description}</p>
    </div>
  );
};
