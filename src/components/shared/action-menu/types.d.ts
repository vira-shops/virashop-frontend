import type { ComponentType, SVGProps } from 'react';

export type ActionMenuTone = 'default' | 'danger';

export interface ActionMenuItem {
  key: string;
  label: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  /** `danger` paints the item in the error color (e.g. «حذف»). @default 'default' */
  tone?: ActionMenuTone;
  onSelect: () => void;
}

export interface ActionMenuProps {
  items: ActionMenuItem[];
  /** Accessible name of the «⋮» trigger and the menu, e.g. «گزینه‌های آدرس». */
  label: string;
  /** Which side of the trigger the panel lines up with. @default 'end' (left in RTL) */
  align?: 'start' | 'end';
  disabled?: boolean;
  className?: string;
  /* --- Style overrides (merged with cn; utilities outrank baked-in classes) --- */
  triggerClassName?: string;
  menuClassName?: string;
}
