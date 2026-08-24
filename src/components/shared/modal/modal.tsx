'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/ui';
import { CancelIcon } from '@icons';
import { ModalProps, ModalSize } from './types';

const sizeClasses: Record<ModalSize, string> = {
  sm: 'modal-sm',
  md: 'modal-md',
  lg: 'modal-lg',
};

const subscribe = () => () => {};

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  footer,
  size = 'sm',
  closeOnBackdrop = true,
  children,
  className,
}) => {
  const titleId = React.useId();
  const mounted = React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="modal-container">
      <div
        className="modal-backdrop"
        data-testid="modal-backdrop"
        onClick={closeOnBackdrop ? onClose : undefined}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className={cn('modal-panel', sizeClasses[size], className)}
        dir="rtl"
      >
        <div className="modal-header">
          {title && (
            <h2 id={titleId} className="modal-title">
              {title}
            </h2>
          )}
          <button type="button" aria-label="بستن" className="modal-close" onClick={onClose}>
            <CancelIcon />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
};
