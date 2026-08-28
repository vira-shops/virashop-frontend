import { Button } from '@/components/ui';
import type { UserAction } from './types';

interface UserActionsProps {
  actions: UserAction[];
}

export function UserActions({ actions }: UserActionsProps) {
  return (
    <div className="flex items-center gap-4">
      {actions.map(({ icon, ariaLabel, href }) => (
        <Button
          key={ariaLabel}
          variant="ghost"
          size="md"
          color="primary"
          icon={icon}
          aria-label={ariaLabel}
          href={href}
        />
      ))}
    </div>
  );
}
