import * as React from 'react';
import type { SVGProps } from 'react';

const StarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M34.58 8.27999L34.44 15.8599C34.42 16.8999 35.0801 18.28 35.9201 18.9L40.88 22.6599C44.06 25.0599 43.54 28 39.74 29.2L33.2801 31.2199C32.2001 31.5599 31.0601 32.74 30.7801 33.84L29.24 39.7199C28.02 44.3599 24.98 44.8199 22.46 40.7399L18.94 35.0399C18.3 33.9999 16.78 33.22 15.58 33.28L8.90007 33.62C4.12007 33.86 2.76005 31.1 5.88005 27.46L9.84001 22.8599C10.58 21.9999 10.92 20.4 10.58 19.32L8.5601 12.8599C7.3801 9.05994 9.50007 6.95997 13.2801 8.19997L19.1801 10.14C20.1801 10.46 21.6801 10.24 22.5201 9.61995L28.6801 5.17995C32.0001 2.77995 34.66 4.17999 34.58 8.27999Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M43.8197 43.9999L37.7598 37.9399"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default StarIcon;
