'use client';

import { useState, useEffect, useCallback } from 'react';
import { BurgerMenuIcon, CancelIcon } from '@icons';
import { Button, Typography } from '@/components/ui';
import { Logo } from './logo';
import { SearchBar } from './search-bar';
import type { NavItem, UserAction, HeaderCTA } from './types';
import { UserActions } from './user-actions';

interface MobileMenuProps {
  items: NavItem[];
  logo?: { src: string; alt: string };
  brandName?: string;
  userActions?: UserAction[];
  ctas?: HeaderCTA[];
  showSearch?: boolean;
  onSearch?: (value: string) => void;
}

export function MobileMenu({
  items,
  logo,
  userActions,
  ctas,
  showSearch = false,
  onSearch,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    document.addEventListener('keydown', handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <>
      <Button
        variant="ghost"
        size="md"
        color="primary"
        icon={<BurgerMenuIcon className="size-6" />}
        aria-label="منو"
        onClick={() => setOpen(true)}
      />

      {open && (
        <div className="fixed inset-0 z-50 max-h-svh">
          <div className="absolute inset-0 bg-black/40" onClick={close} aria-hidden="true" />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="منوی موبایل"
            dir="rtl"
            className="absolute top-0 right-0 flex h-full w-svw flex-col bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-gray-100 p-4">
              {logo && <Logo src={logo.src} alt={logo.alt} />}

              <Button
                variant="ghost"
                size="sm"
                color="primary"
                icon={<CancelIcon className="size-6" />}
                aria-label="بستن"
                onClick={close}
              />
            </div>

            {showSearch && (
              <div className="p-4">
                <SearchBar onSearch={onSearch} />
              </div>
            )}

            <nav className="flex flex-1 flex-col pt-4">
              {items.map(({ label, href, children }) => (
                <div key={href}>
                  <Typography
                    variant="caption-lg"
                    href={href}
                    className="block py-4 pr-8 text-gray-400"
                    onClick={close}
                  >
                    {label}
                  </Typography>

                  {children?.map((child) => (
                    <Typography
                      key={child.href}
                      variant="body-sm"
                      href={child.href}
                      className="block py-2 pr-4 text-gray-700"
                      onClick={close}
                    >
                      {child.label}
                    </Typography>
                  ))}
                </div>
              ))}
            </nav>

            {userActions && (
              <div className="border-t border-gray-100 p-4">
                <UserActions actions={userActions} />
              </div>
            )}

            {ctas && ctas.length > 0 && (
              <div className="flex w-full flex-col gap-3 border-t border-gray-100 p-4">
                {ctas.map(({ label, href, color }) => (
                  <Button key={href} href={href} color={color} fullWidth>
                    {label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
