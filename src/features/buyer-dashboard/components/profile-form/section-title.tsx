import * as React from 'react';
import { Typography } from '@/components/ui';
import type { SectionTitleProps } from './types';

export const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => (
  <Typography variant="h6" as="h2" className="text-primary">
    {children}
  </Typography>
);
