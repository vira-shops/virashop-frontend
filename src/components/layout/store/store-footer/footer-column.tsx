import { Typography } from '@/components/ui';
import { StoreFooterConfig } from './types';
import { cn } from '@/utils/ui';

type FooterColumnProps = {
  title: string;
  links: StoreFooterConfig['columns'][number]['links'];
  className?: string;
};

export function FooterColumn({ title, links, className }: FooterColumnProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-4 text-center',
        'lg:items-start lg:text-right',
        className,
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
              className={cn(
                'text-gray-500 transition-colors',
                'hover:text-primary-500',
                'md:text-right',
              )}
            >
              {label}
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  );
}
