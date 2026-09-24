import type { ReactNode } from 'react';

export interface SectionPanelProps {
  /** Text on the tinted pill header — «اطلاعات سفارش». */
  title: ReactNode;
  /** End-side slot inside the pill header. */
  actions?: ReactNode;
  /** Heading level used for the title. @default 'h2' */
  as?: 'h2' | 'h3' | 'h4';
  children?: ReactNode;
  className?: string;
  /* --- Style overrides (merged with cn; utilities outrank baked-in classes) --- */
  headerClassName?: string;
  titleClassName?: string;
  bodyClassName?: string;
}
