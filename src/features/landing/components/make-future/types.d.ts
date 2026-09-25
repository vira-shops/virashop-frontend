import type { ComponentType, SVGProps } from 'react';

export interface MakeFutureCard {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
}
