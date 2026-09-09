import { Button, Typography } from '@/components/ui';
import { cn } from '@/utils/ui';
import { StoreFooterConfig } from './types';

type ContactColumnProps = {
  contact: StoreFooterConfig['contact'];
  className?: string;
};

export function ContactColumn({ contact, className }: ContactColumnProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-4 text-center',
        'lg:items-start lg:text-right',
        className,
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
          dir="ltr"
          className="w-fit text-gray-900"
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
  );
}
