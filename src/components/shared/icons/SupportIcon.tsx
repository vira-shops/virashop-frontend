import * as React from 'react';
import type { SVGProps } from 'react';

const SupportIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M44 24C44 35.04 35.04 44 24 44C12.96 44 4 35.04 4 24C4 12.96 12.96 4 24 4C35.04 4 44 12.96 44 24Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M31.4198 30.36L25.2198 26.66C24.1398 26.02 23.2598 24.48 23.2598 23.22V15.02"
      stroke="#ffac00"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SupportIcon;
