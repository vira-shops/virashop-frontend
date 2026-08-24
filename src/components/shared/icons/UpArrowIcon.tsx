import * as React from 'react';
import type { SVGProps } from 'react';

const UpArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.07992 15.05L10.5999 8.52999C11.3699 7.75999 12.6299 7.75999 13.3999 8.52999L19.9199 15.05"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default UpArrowIcon;
