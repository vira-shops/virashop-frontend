import * as React from 'react';
import { NotificationCard } from '@/components/shared';
import type { NotificationGroupProps } from './types';

export const NotificationGroup: React.FC<NotificationGroupProps> = ({ items, read, onExpand }) => (
  <ul className="flex flex-col gap-5">
    {items.map((item) => (
      <li key={item.id}>
        <NotificationCard
          title={item.title}
          body={item.body}
          date={item.createdAt}
          read={read}
          onExpandedChange={onExpand ? (expanded) => onExpand(item, expanded) : undefined}
        />
      </li>
    ))}
  </ul>
);
