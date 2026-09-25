import * as React from 'react';
import type { SVGProps } from 'react';

const LogoutIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.1 16.44C14.79 20.04 12.94 21.51 8.89 21.51H8.76C4.29 21.51 2.5 19.72 2.5 15.25V8.73C2.5 4.26 4.29 2.47 8.76 2.47H8.89C12.91 2.47 14.76 3.92 15.09 7.46"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 12H20.38"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.15 8.65L21.5 12L18.15 15.35"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default LogoutIcon;
