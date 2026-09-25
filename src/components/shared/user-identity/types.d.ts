import type { AvatarSize } from '@/components/ui';

export interface UserIdentityProps {
  name: string;
  /** Second line under the name — e.g. the shop / platform name. */
  subtitle?: string;
  avatarSrc?: string | null;
  /** @default 'lg' */
  avatarSize?: AvatarSize;
  /** Avatar only — the name stays as its accessible label (mobile bar). */
  compact?: boolean;
  className?: string;
  /* --- Style overrides (merged with cn; utilities outrank baked-in classes) --- */
  avatarClassName?: string;
  nameClassName?: string;
  subtitleClassName?: string;
}
