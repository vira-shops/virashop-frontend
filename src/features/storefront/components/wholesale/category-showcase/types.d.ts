import type { FC, SVGProps } from 'react';

export interface CategoryShowcaseProps {
  className?: string;
}

/** Category slug → icon for the gradient tiles. */
export type CategoryIconMap = Record<string, FC<SVGProps<SVGSVGElement>>>;
