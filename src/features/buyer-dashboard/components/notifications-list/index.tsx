'use client';

import * as React from 'react';
import { Divider, Skeleton } from '@/components/ui';
import { EmptyState, PageHeading } from '@/components/shared';
import { PAGE_TITLES } from '@/features/buyer-dashboard/constants';
import { NOTIFICATIONS_EMPTY, NOTIFICATIONS_READ_DIVIDER, SKELETON_COUNT } from './constants';
import { NotificationGroup } from './notification-group';
import { useNotificationGroups } from './use-notification-groups';

/** Unread notifications on top, a «خوانده شده» divider, then the read ones. */
export const NotificationsList: React.FC = () => {
  const { isLoading, isEmpty, fresh, seen, unreadCount, handleExpand } = useNotificationGroups();

  return (
    <>
      <PageHeading title={PAGE_TITLES.notifications} count={unreadCount} />

      {isLoading && (
        <div className="flex flex-col gap-5" aria-busy="true">
          {Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <Skeleton key={index} className="rounded-8 h-36 w-full" />
          ))}
        </div>
      )}

      {isEmpty && (
        <EmptyState
          variant="inline"
          message={NOTIFICATIONS_EMPTY.message}
          highlight={NOTIFICATIONS_EMPTY.highlight}
        />
      )}

      {fresh.length > 0 && <NotificationGroup items={fresh} onExpand={handleExpand} />}

      {seen.length > 0 && (
        <>
          {fresh.length > 0 && <Divider label={NOTIFICATIONS_READ_DIVIDER} />}
          <NotificationGroup items={seen} read />
        </>
      )}
    </>
  );
};
