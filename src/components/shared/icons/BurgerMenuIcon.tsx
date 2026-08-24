import * as React from 'react';
import type { SVGProps } from 'react';

const BurgerMenuIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M3 7H21" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <path d="M3 12H21" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <path d="M3 17H21" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

export default BurgerMenuIcon;
