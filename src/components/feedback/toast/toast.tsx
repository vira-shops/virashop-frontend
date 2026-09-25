'use client';

import * as React from 'react';
import { cn } from '@/utils/ui';
import { CancelIcon, CloseCircleIcon, SmsIcon, TickCircleIcon } from '@icons';
import { Button } from '@/components/ui';
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
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              aria-label="بستن"
              onClick={onClose}
              icon={<CancelIcon aria-hidden="true" />}
              className="toast-close text-gray-300 hover:bg-transparent hover:text-gray-700"
            />
          )}
          <div className="toast-title-group">
            {icons[variant]}
            <span className="toast-title">{title}</span>
          </div>
        </div>
      )}
      <p className={cn('toast-description', onClose && 'pr-13')}>{description}</p>
    </div>
  );
};
