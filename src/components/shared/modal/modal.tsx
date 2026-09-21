'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/ui';
import { CancelIcon } from '@icons';
import { ModalProps, ModalSize } from './types';
import { Button } from '@/components/ui';

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
  theme,
  icon,
  closeOnBackdrop = true,
  children,
  className,
  containerClassName,
  backdropClassName,
  headerClassName,
  titleClassName,
  closeClassName,
  bodyClassName,
  footerClassName,
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
    <div data-theme={theme} className={cn('modal-container', containerClassName)}>
      <div
        className={cn('modal-backdrop', backdropClassName)}
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
        <div className={cn('modal-header', headerClassName)}>
          <Button
            icon={<CancelIcon className="text-black" />}
            variant="ghost"
            aria-label="بستن"
            className={cn('modal-close', closeClassName)}
            onClick={onClose}
          />
          {title && (
            <h2 id={titleId} className={cn('modal-title', titleClassName)}>
              <span>{icon}</span>
              {title}
            </h2>
          )}
        </div>
        <div className={cn('modal-body', bodyClassName)}>{children}</div>
        {footer && <div className={cn('modal-footer', footerClassName)}>{footer}</div>}
      </div>
    </div>,
    document.body,
  );
};
