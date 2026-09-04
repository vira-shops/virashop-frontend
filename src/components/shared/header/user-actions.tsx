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
    <div className={cn('flex items-center gap-11', className)}>
      {actions.map(({ icon, ariaLabel, href }) => (
        <Button
          key={ariaLabel}
          variant="ghost"
          size="md"
          color="primary"
          icon={icon}
          aria-label={ariaLabel}
          href={href}
          className={itemClassName}
        />
      ))}
    </div>
  );
}
