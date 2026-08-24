import * as React from 'react';
import type { SVGProps } from 'react';

const PencilIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M42.9399 38V10C42.9399 6 40.9399 4 36.9399 4H28.9399C24.9399 4 22.9399 6 22.9399 10V38C22.9399 42 24.9399 44 28.9399 44H36.9399C40.9399 44 42.9399 42 42.9399 38Z"
      stroke="#222222"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <path d="M22.9399 12H32.9399" stroke="#222222" strokeWidth={1.5} strokeLinecap="round" />
    <path d="M22.9399 36H30.9399" stroke="#222222" strokeWidth={1.5} strokeLinecap="round" />
    <path d="M22.9399 27.9L32.9399 28" stroke="#222222" strokeWidth={1.5} strokeLinecap="round" />
    <path d="M22.9399 20H28.9399" stroke="#222222" strokeWidth={1.5} strokeLinecap="round" />
    <path
      d="M10.9801 4C7.72006 4 5.06006 6.66 5.06006 9.9V35.82C5.06006 36.72 5.44006 38.08 5.90006 38.86L7.54006 41.58C9.42006 44.72 12.5201 44.72 14.4001 41.58L16.0401 38.86C16.5001 38.08 16.8801 36.72 16.8801 35.82V9.9C16.8801 6.66 14.2201 4 10.9801 4Z"
      stroke="#222222"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <path d="M16.8801 14H5.06006" stroke="#222222" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

export default PencilIcon;
