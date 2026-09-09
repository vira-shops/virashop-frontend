import { Button, Typography } from '@/components/ui';
import { DownArrowIcon, SiteFooter } from '@/components/shared';
import { cn } from '@/utils/ui';
import type { StoreFooterConfig } from './types';

/**
 * Horizontal placement per grid cell so both rows share one rhythm:
 * the 1st item hugs the container start, the two middle items sit centered
 * in their tracks, and the last item hugs the container end — evenly spaced,
 * with the feature band and the link columns aligned column-by-column.
 * (`lg:` only — smaller breakpoints keep the natural start alignment.)
 */
const cellAlignClass = (index: number, total: number): string => {
  if (index === 0) return 'lg:justify-self-start';
  if (index === total - 1) return 'lg:justify-self-end';
  return 'lg:justify-self-center';
};

/**
 * Full store footer — shared by the retail and wholesale storefronts.
 * Composes the config-driven store pre-section (feature band + link columns
 * + contact) with the shared SiteFooter (brand band + copyright), so layouts
 * render a single footer component. Content comes from the store footer
 * config; swap configs, not components — mirrors the StoreHeader pattern.
 * All items center on mobile and align by the grid rhythm on desktop.
 */
export function StoreFooter({ config }: { config: StoreFooterConfig }) {
  const { features, columns, contact, scrollTargetId } = config;

  const scrollToTarget = () => {
    document
      .getElementById(scrollTargetId ?? '')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div>
      {/* Store pre-section */}
      <div>
        {/* Feature band — same grid tracks as the link area below */}
        <div className="border-b border-gray-100 py-10">
          <div className="container grid grid-cols-2 items-center gap-8 py-8 lg:grid-cols-4">
            {features.map(({ id, title, Icon }, index) => (
              <div
                key={id}
                className={cn(
                  'flex flex-col items-center gap-4 md:flex-row',
                  cellAlignClass(index, features.length),
                )}
              >
                {Icon && <Icon className="size-12 shrink-0" aria-hidden="true" />}
                <Typography variant="h5" className="flex-1 text-gray-700">
                  {title}
                </Typography>
              </div>
            ))}
          </div>
        </div>

        {/* Link columns + contact — same alignment rhythm as the feature band */}
        <div className="relative bg-blue-50">
          {/* Ribbon — scrolls back to the configured section (retail only) */}
          {scrollTargetId && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center">
              <Button
                type="button"
                variant="fill"
                onClick={scrollToTarget}
                aria-label="برو به سکشن بعدی"
                icon={
                  <DownArrowIcon className="size-7 -rotate-45 text-yellow-100" aria-hidden="true" />
                }
                className={cn(
                  'pointer-events-auto flex translate-y-1/3 items-center justify-center',
                  'rounded-10 size-14 rotate-45 bg-[#FFF9ED]',
                  '-z-50 transition-transform hover:scale-105',
                )}
              />
            </div>
          )}

          <div className="container grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
            {columns.map(({ title, links }, index) => (
              <div
                key={title}
                className={cn(
                  'flex flex-col items-center gap-4 text-center lg:items-start',
                  cellAlignClass(index, 4),
                )}
              >
                <Typography variant="h5" color="primary">
                  {title}
                </Typography>
                <ul className="flex flex-col gap-3">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Typography
                        variant="body-sm"
                        href={href}
                        className="hover:text-primary-500 text-gray-500 transition-colors md:text-right"
                      >
                        {label}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact column (پل های ارتباطی) — last cell hugs the container end edge */}
            <div
              className={cn(
                'flex flex-col items-center gap-4 text-center lg:items-start',
                cellAlignClass(3, 4),
              )}
            >
              <Typography variant="h5" color="primary">
                {contact.title}
              </Typography>
              <div className="flex flex-col items-center gap-1 lg:items-start">
                <Typography variant="body-sm" className="text-gray-500">
                  {contact.phoneLabel}
                </Typography>
                <Typography
                  variant="body-md"
                  href={contact.phoneHref}
                  className="w-fit text-gray-900"
                  dir="ltr"
                >
                  {contact.phone}
                </Typography>
              </div>
              <div className="mt-2 flex items-center justify-center gap-4 lg:justify-start">
                {contact.socials.map(({ id, label, href, Icon }) => (
                  <Button
                    key={id}
                    variant="fill"
                    size="lg"
                    href={href}
                    aria-label={label}
                    icon={<Icon className="text-primary size-5" aria-hidden="true" />}
                    className="bg-white shadow-md"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shared site footer (brand band + copyright) */}
      <SiteFooter />
    </div>
  );
}
