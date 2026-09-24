export interface AnnouncementItem {
  id: string | number;
  title: string;
  body: string;
  href?: string;
}

export interface AnnouncementCarouselProps {
  items: AnnouncementItem[];
  /** Link text under the body. @default 'مشاهده جزئیات' */
  linkLabel?: string;
  /** Auto-advance interval; `0` disables. @default 6000 */
  autoplayMs?: number;
  className?: string;
  /* --- Style overrides (merged with cn; utilities outrank baked-in classes) --- */
  slideClassName?: string;
  /**
   * The bell artwork on the end side. The caller owns breakpoints — e.g.
   * `max-md:hidden` to drop it on phones as the design does.
   */
  illustrationClassName?: string;
  dotsClassName?: string;
}
