'use client';

import * as React from 'react';
import { Divider, Skeleton } from '@/components/ui';
import { EmptyState, NotificationCard, PageHeading } from '@/components/shared';
import type { UserNotification } from '@/contracts/endpoints/notifications';
import { useMarkNotificationRead, useNotifications } from '@/hooks';
import {
  NOTIFICATIONS_EMPTY,
  NOTIFICATIONS_READ_DIVIDER,
  PAGE_TITLES,
} from '@/features/buyer-dashboard/constants';

/**
 * Unread notifications on top, a «خوانده شده» divider, then the read ones.
 * Opening an unread card marks it read, but it stays in the top group until
 * the next visit — a card jumping sections under the cursor is disorienting.
 */
export const NotificationsList: React.FC = () => {
  const notifications = useNotifications();
  const markRead = useMarkNotificationRead();

  // Snapshot of which ids were unread when the list first arrived — kept
  // with the "adjust state while rendering" pattern, no effect needed.
  const [unreadAtLoad, setUnreadAtLoad] = React.useState<Set<number> | null>(null);
  if (unreadAtLoad === null && notifications.data) {
    setUnreadAtLoad(new Set(notifications.data.filter((n) => !n.read).map((n) => n.id)));
  }

  const all = notifications.data ?? [];
  const fresh = all.filter((item) => unreadAtLoad?.has(item.id));
  const seen = all.filter((item) => !unreadAtLoad?.has(item.id));
  const unreadCount = all.filter((item) => !item.read).length;

  const handleExpand = (item: UserNotification) => (expanded: boolean) => {
    if (expanded && !item.read) markRead.mutate(item.id);
  };

  return (
    <>
      <PageHeading title={PAGE_TITLES.notifications} count={unreadCount} />

      {notifications.isLoading && (
        <div className="flex flex-col gap-5" aria-busy="true">
          {Array.from({ length: 3 }, (_, index) => (
            <Skeleton key={index} className="rounded-8 h-36 w-full" />
          ))}
        </div>
      )}

      {!notifications.isLoading && all.length === 0 && (
        <EmptyState
          variant="inline"
          message={NOTIFICATIONS_EMPTY.message}
          highlight={NOTIFICATIONS_EMPTY.highlight}
        />
      )}

      {fresh.length > 0 && (
        <ul className="flex flex-col gap-5">
          {fresh.map((item) => (
            <li key={item.id}>
              <NotificationCard
                title={item.title}
                body={item.body}
                date={item.createdAt}
                onExpandedChange={handleExpand(item)}
              />
            </li>
          ))}
        </ul>
      )}

      {seen.length > 0 && (
        <>
          {fresh.length > 0 && <Divider label={NOTIFICATIONS_READ_DIVIDER} />}
          <ul className="flex flex-col gap-5">
            {seen.map((item) => (
              <li key={item.id}>
                <NotificationCard title={item.title} body={item.body} date={item.createdAt} read />
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};
