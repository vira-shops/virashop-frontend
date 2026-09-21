import type { StorefrontSegment } from '@/routes/paths';
import { retailChannel } from './retail';
import { wholesaleChannel } from './wholesale';
import type { StorefrontChannel } from './types';

export const STOREFRONT_SEGMENTS: readonly StorefrontSegment[] = ['retail', 'wholesale'];

const REGISTRY: Record<StorefrontSegment, StorefrontChannel> = {
  retail: retailChannel,
  wholesale: wholesaleChannel,
};

/** Returns null for an unknown URL segment so the route can 404. */
export const getStorefrontChannel = (segment: string): StorefrontChannel | null =>
  (REGISTRY as Record<string, StorefrontChannel>)[segment] ?? null;
