'use client';

import * as React from 'react';
import { UserIcon } from '@icons';
import { Button, Typography } from '@/components/ui';
import { toFaDigits } from '@/utils/format';
import { cn } from '@/utils/ui';
import type { UserMenuProps } from './types';

const ARIA_LABEL = 'حساب کاربری';

/**
 * Signed-in header identity — an icon-only trigger that opens a small
 * dropdown with the user's name/phone and a sign-out action, replacing the
 * previous bare "name + خروج button" pair. Mirrors `CategoriesDropdown`'s
 * open/outside-click/Escape interaction pattern.
 */
export const UserMenu: React.FC<UserMenuProps> = ({ user, onSignOut, isPending, className }) => {
  const [open, setOpen] = React.useState(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;

    const handleMouseDown = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const handleSignOut = () => {
    setOpen(false);
    onSignOut();
  };

  return (
    <div ref={wrapperRef} className={cn('relative', className)}>
      <Button
        variant="outline"
        size="xl"
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={ARIA_LABEL}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'border-primary-500/40',
          'hover:bg-primary-500/20',
          open && 'bg-primary-500/20',
        )}
        icon={<UserIcon className="size-7" />}
      />

      {open && (
        <div
          role="menu"
          aria-label={ARIA_LABEL}
          className="rounded-6 absolute top-full left-0 z-40 mt-4 w-56 border border-gray-100 bg-white shadow-md"
        >
          <div className="flex flex-col gap-1 px-5 py-3">
            <Typography variant="caption-lg" className="truncate text-gray-900">
              {user.fullName}
            </Typography>
            <Typography variant="body-xs" dir="ltr" className="text-gray-400">
              {toFaDigits(user.phone)}
            </Typography>
          </div>

          <div role="separator" className="border-t border-gray-100" aria-hidden="true" />

          <Button
            type="button"
            size="xs"
            role="menuitem"
            fullWidth
            disabled={isPending}
            onClick={handleSignOut}
            className="rounded-t-none"
          >
            {isPending ? 'در حال خروج...' : 'خروج از حساب'}
          </Button>
        </div>
      )}
    </div>
  );
};

UserMenu.displayName = 'UserMenu';
