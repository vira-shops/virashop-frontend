import type { StorefrontSegment } from '@/routes/paths';
import type { Channel } from '@/validations/primitives';
import { retailChannel } from './retail';
import { wholesaleChannel } from './wholesale';
import type { StorefrontChannel } from './types';

export const STOREFRONT_SEGMENTS: readonly StorefrontSegment[] = ['retail', 'wholesale'];

const REGISTRY: Record<StorefrontSegment, StorefrontChannel> = {
  retail: retailChannel,
  wholesale: wholesaleChannel,
};

const REGISTRY_BY_CHANNEL: Record<Channel, StorefrontChannel> = {
  RETAIL: retailChannel,
  WHOLESALE: wholesaleChannel,
};

/** Returns null for an unknown URL segment so the route can 404. */
export const getStorefrontChannel = (segment: string): StorefrontChannel | null =>
  (REGISTRY as Record<string, StorefrontChannel>)[segment] ?? null;

/**
 * Resolves a `Channel` value ('RETAIL' | 'WHOLESALE') to its full config.
 * For client components that only receive the plain `channel` string as a
 * prop (a Server Component can't pass the full StorefrontChannel — its
 * `header`/`footer` embed icon components and `paths` embeds functions,
 * neither of which survive the server→client boundary) and need to resolve
 * `paths`/`priceMax` themselves once safely inside client code.
 */
export const getStorefrontChannelByChannel = (channel: Channel): StorefrontChannel =>
  REGISTRY_BY_CHANNEL[channel];
