'use client';

import { Typography } from '@/components/ui';
import { SiteFooter } from '@/components/shared';
import { cn } from '@/utils/ui';

import type { StoreFooterConfig } from './types';
import { FooterApp } from './footer-app';
import { ContactColumn } from './contact-column';
import { FooterColumn } from './footer-column';

const getAlignmentClass = (index: number, total: number) => {
  if (index === 0) return 'lg:justify-self-start';
  if (index === total - 1) return 'lg:justify-self-end';

  return 'lg:justify-self-center';
};

export function StoreFooter({ config }: { config: StoreFooterConfig }) {
  const { features, columns, contact, featureBandClassName } = config;

  const totalColumns = columns.length + 1;

  return (
    <footer>
      {/* Features */}
      <section className={cn('relative border-b border-gray-100 py-10', featureBandClassName)}>
        <div className="container grid grid-cols-2 items-center gap-8 lg:grid-cols-4">
          {features.map(({ id, title, Icon }, index) => (
            <div
              key={id}
              className={cn(
                'flex flex-col items-center gap-4 md:flex-row',
                getAlignmentClass(index, features.length),
              )}
            >
              {Icon && <Icon className="size-12 shrink-0" aria-hidden="true" />}

              <Typography variant="h5" className="flex-1 text-gray-700">
                {title}
              </Typography>
            </div>
          ))}
        </div>
      </section>

      {/* Links & Contact */}
      <section className="bg-blue-50">
        <div
          className={cn('container grid grid-cols-1 gap-8 py-10', 'sm:grid-cols-2 lg:grid-cols-4')}
        >
          {columns.map(({ title, links }, index) => (
            <FooterColumn
              key={title}
              title={title}
              links={links}
              className={getAlignmentClass(index, totalColumns)}
            />
          ))}

          <ContactColumn
            contact={contact}
            className={getAlignmentClass(totalColumns - 1, totalColumns)}
          />
        </div>

        <FooterApp />
      </section>

      <SiteFooter />
    </footer>
  );
}
