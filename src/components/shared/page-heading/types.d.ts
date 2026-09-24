import type { ReactNode } from 'react';

export interface PageHeadingProps {
  title: ReactNode;
  /** Red count chip after the title (e.g. unread notifications). Hidden when 0/undefined. */
  count?: number;
  /** Renders a back chevron link before the title. */
  backHref?: string;
  /** @default 'بازگشت' */
  backLabel?: string;
  /** End-side slot (the left edge in RTL) — «ویرایش», «مشاهده فاکتور», … */
  actions?: ReactNode;
  /** Heading level of the title. @default 'h1' */
  as?: 'h1' | 'h2' | 'h3';
  /** Hairline under the whole row. */
  bordered?: boolean;
  className?: string;
  /* --- Style overrides (merged with cn; utilities outrank baked-in classes) --- */
  titleClassName?: string;
  actionsClassName?: string;
}
