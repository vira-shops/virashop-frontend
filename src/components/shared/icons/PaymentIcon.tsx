import * as React from 'react';
import type { SVGProps } from 'react';

const PaymentIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 20H44"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M23.1005 41H12.8805C5.78049 41 3.98047 39.24 3.98047 32.22V15.78C3.98047 9.42003 5.46053 7.38003 11.0405 7.06003C11.6005 7.04003 12.2205 7.02002 12.8805 7.02002H35.1005C42.2005 7.02002 44.0005 8.78002 44.0005 15.8V24.62"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 32H20"
      stroke="#ffac00"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M44 36C44 37.5 43.58 38.92 42.84 40.12C41.46 42.44 38.92 44 36 44C33.08 44 30.54 42.44 29.16 40.12C28.42 38.92 28 37.5 28 36C28 31.58 31.58 28 36 28C40.42 28 44 31.58 44 36Z"
      stroke="#ffac00"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M32.8809 36L34.8608 37.98L39.1208 34.04"
      stroke="#ffac00"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default PaymentIcon;
