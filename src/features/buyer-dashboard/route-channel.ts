import { notFound } from 'next/navigation';
import type { DashboardRole } from '@/routes/paths';
import type { Channel } from '@/validations/primitives';
import { BUYER_ROLE_CHANNELS } from './constants';

export interface BuyerRouteParams {
  params: Promise<{ role: string }>;
}

/** Every `[role]` value the buyer dashboard pre-renders. */
export const buyerRoleParams = (): Array<{ role: DashboardRole }> =>
  (Object.keys(BUYER_ROLE_CHANNELS) as DashboardRole[]).map((role) => ({ role }));

const isBuyerRole = (role: string): role is DashboardRole => role in BUYER_ROLE_CHANNELS;

/** Resolves `/dashboard/[role]` to its channel — unknown roles are a 404. */
export const getRouteChannel = async ({ params }: BuyerRouteParams): Promise<Channel> => {
  const { role } = await params;

  if (!isBuyerRole(role)) notFound();

  return BUYER_ROLE_CHANNELS[role];
};
