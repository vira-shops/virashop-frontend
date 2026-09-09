import * as React from 'react';
import type { SVGProps } from 'react';

const HeroObjIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 89 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect y={24} width={24} height={24} rx={6} transform="rotate(-30 0 24)" fill="#FF4A4A" />
    <rect
      x={71.9688}
      y={5}
      width={24}
      height={24}
      rx={6}
      transform="rotate(45 71.9688 5)"
      fill="#58C0F9"
    />
    <rect x={36} width={16} height={16} rx={4} transform="rotate(30 36 0)" fill="#FFB800" />
    <rect
      x={59.5977}
      y={32.1406}
      width={16}
      height={16}
      rx={4}
      transform="rotate(105 59.5977 32.1406)"
      fill="#35CB98"
    />
  </svg>
);

export default HeroObjIcon;
