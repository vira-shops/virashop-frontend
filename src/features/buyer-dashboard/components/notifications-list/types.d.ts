import type { UserNotification } from '@/contracts/endpoints/notifications';

export interface NotificationGroupProps {
  items: UserNotification[];
  /** Render every card muted (the «خوانده شده» group). */
  read?: boolean;
  onExpand?: (item: UserNotification, expanded: boolean) => void;
}
