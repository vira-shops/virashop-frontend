'use client';

import * as React from 'react';
import { Button } from '@/components/ui';
import { MoreIcon } from '@icons';
import { cn } from '@/utils/ui';
import type { ActionMenuProps, ActionMenuTone } from './types';

const ALIGN_CLASSES: Record<NonNullable<ActionMenuProps['align']>, string> = {
  start: 'start-0',
  end: 'end-0',
};

const TONE_CLASSES: Record<ActionMenuTone, string> = {
  default: 'text-gray-700',
  danger: 'text-warning-red',
};

/**
 * «⋮» trigger with a small popover of row actions (ویرایش / حذف …). Closes on
 * selection, outside click and Escape — Escape hands focus back to the trigger.
 */
export const ActionMenu: React.FC<ActionMenuProps> = ({
  items,
  label,
  align = 'end',
  disabled = false,
  className,
  triggerClassName,
  menuClassName,
}) => {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const menuId = React.useId();

  React.useEffect(() => {
    if (!open) return;

    menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();

    const handleMouseDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      rootRef.current?.querySelector<HTMLElement>('[aria-haspopup]')?.focus();
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <Button
        type="button"
        variant="ghost"
        color="blue"
        size="sm"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
        className={cn('text-gray-300', triggerClassName)}
        icon={<MoreIcon />}
      />

      {open && (
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-label={label}
          className={cn(
            'rounded-6 absolute top-full z-30 mt-2 flex min-w-32 flex-col gap-1 bg-white p-3 shadow-md',
            ALIGN_CLASSES[align],
            menuClassName,
          )}
        >
          {items.map(({ key, label: itemLabel, icon: Icon, tone = 'default', onSelect }) => (
            <Button
              key={key}
              type="button"
              role="menuitem"
              variant="ghost"
              color="blue"
              size="xs"
              fullWidth
              onClick={() => {
                setOpen(false);
                onSelect();
              }}
              rightIcon={Icon ? <Icon className="size-6" aria-hidden="true" /> : undefined}
              className={cn(
                'text-body-xs justify-start whitespace-nowrap hover:bg-blue-50',
                TONE_CLASSES[tone],
              )}
            >
              {itemLabel}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

ActionMenu.displayName = 'ActionMenu';
