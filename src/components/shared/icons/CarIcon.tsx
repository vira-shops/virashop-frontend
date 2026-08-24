import * as React from 'react';
import type { SVGProps } from 'react';

const CarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M30 4V24C30 26.2 28.2 28 26 28H4V12C4 7.58 7.58 4 12 4H30Z"
      stroke="#222222"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M44 28V34C44 37.32 41.32 40 38 40H36C36 37.8 34.2 36 32 36C29.8 36 28 37.8 28 40H20C20 37.8 18.2 36 16 36C13.8 36 12 37.8 12 40H10C6.68 40 4 37.32 4 34V28H26C28.2 28 30 26.2 30 24V10H33.68C35.12 10 36.44 10.78 37.16 12.02L40.58 18H38C36.9 18 36 18.9 36 20V26C36 27.1 36.9 28 38 28H44Z"
      stroke="#222222"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 44C18.2091 44 20 42.2091 20 40C20 37.7909 18.2091 36 16 36C13.7909 36 12 37.7909 12 40C12 42.2091 13.7909 44 16 44Z"
      stroke="#222222"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M32 44C34.2091 44 36 42.2091 36 40C36 37.7909 34.2091 36 32 36C29.7909 36 28 37.7909 28 40C28 42.2091 29.7909 44 32 44Z"
      stroke="#222222"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M44 24V28H38C36.9 28 36 27.1 36 26V20C36 18.9 36.9 18 38 18H40.58L44 24Z"
      stroke="#222222"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CarIcon;
