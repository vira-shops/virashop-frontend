import { cn } from '@/utils/ui';
import { Button } from '@/components/ui';
import type { UserAction } from './types';

interface UserActionsProps {
  actions: UserAction[];
  className?: string;
  itemClassName?: string;
}

export function UserActions({ actions, className, itemClassName }: UserActionsProps) {
  return (
    <div
      className={cn(
        'rounded-4 flex items-center gap-4 border border-gray-300 p-[6.2px]',
        className,
      )}
    >
      {actions.map(({ icon, ariaLabel, href }) => (
        <Button
          key={ariaLabel}
          variant="ghost"
          size="md"
          icon={icon}
          aria-label={ariaLabel}
          href={href}
          className={cn(itemClassName, 'hover:text-primary-500 text-gray-300 hover:bg-transparent')}
        />
      ))}
    </div>
  );
}
