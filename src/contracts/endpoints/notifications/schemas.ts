import { z } from 'zod';

export const NotificationSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  /** ISO timestamp. */
  createdAt: z.string(),
  read: z.boolean(),
});
export type UserNotification = z.infer<typeof NotificationSchema>;

export const NotificationsListResponseSchema = z.array(NotificationSchema);
export type NotificationsListResponse = z.infer<typeof NotificationsListResponseSchema>;

/** Dashboard banner messages — the dark announcement carousel. */
export const AnnouncementSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  href: z.string().nullable(),
});
export type Announcement = z.infer<typeof AnnouncementSchema>;

export const AnnouncementsResponseSchema = z.array(AnnouncementSchema);
export type AnnouncementsResponse = z.infer<typeof AnnouncementsResponseSchema>;
