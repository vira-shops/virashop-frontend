import * as React from 'react';
import type { SVGProps } from 'react';

const BottleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M36 30V38C36 41.3 33.3 44 30 44H18C14.7 44 12 41.3 12 38V27.96"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M36 30V21.66C36 20.74 35.4799 19.48 34.8199 18.82L30.58 14.58C30.22 14.22 30 13.7 30 13.18V10H18V13.18C18 13.7 17.78 14.22 17.42 14.58L13.1801 18.82C12.5201 19.48 12 20.74 12 21.66V27.96"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M36 32V30"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 29.96V27.96"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M29 10C30.66 10 32 8.64 32 7C32 5.36 30.66 4 29 4H19C17.34 4 16 5.36 16 7C16 8.64 17.34 10 19 10"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default BottleIcon;
