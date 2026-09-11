import type { ReactNode } from 'react';

export type TabsVariant = 'fill' | 'outline';

export type TabsColor = 'primary' | 'blue' | 'yellow' | 'retail' | 'wholesale';

export type TabsSize = 'sm' | 'md' | 'lg';

export interface TabItem {
  value: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  variant?: TabsVariant;
  color?: TabsColor;
  size?: TabsSize;
  fullWidth?: boolean;
  disabled?: boolean;
  'aria-label'?: string;
  className?: string;
  /* --- Style overrides (merged with cn; utilities outrank baked-in classes) --- */
  itemClassName?: string;
}
