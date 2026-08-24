import * as React from 'react';
import type { SVGProps } from 'react';

const DownArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.9201 8.9494L13.4001 15.4694C12.6301 16.2394 11.3701 16.2394 10.6001 15.4694L4.08008 8.9494"
      stroke="#222222"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default DownArrowIcon;
