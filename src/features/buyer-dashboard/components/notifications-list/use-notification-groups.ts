'use client';

import * as React from 'react';
import { useMarkNotificationRead, useNotifications } from '@/hooks';
import type { UserNotification } from '@/contracts/endpoints/notifications';

/**
 * Splits notifications into «new» and «seen». Opening a new one marks it read
 * but it stays in the new group until the next visit — a card jumping
 * sections under the cursor is disorienting.
 */
export const useNotificationGroups = () => {
  const notifications = useNotifications();
  const markRead = useMarkNotificationRead();

  // Snapshot of which ids were unread when the list first arrived — kept
  // with the "adjust state while rendering" pattern, no effect needed.
  const [unreadAtLoad, setUnreadAtLoad] = React.useState<Set<number> | null>(null);
  if (unreadAtLoad === null && notifications.data) {
    setUnreadAtLoad(new Set(notifications.data.filter((n) => !n.read).map((n) => n.id)));
  }

  const all = notifications.data ?? [];

  const handleExpand = (item: UserNotification, expanded: boolean) => {
    if (expanded && !item.read) markRead.mutate(item.id);
  };

  return {
    isLoading: notifications.isLoading,
    isEmpty: !notifications.isLoading && all.length === 0,
    fresh: all.filter((item) => unreadAtLoad?.has(item.id)),
    seen: all.filter((item) => !unreadAtLoad?.has(item.id)),
    unreadCount: all.filter((item) => !item.read).length,
    handleExpand,
  };
};
