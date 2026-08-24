import * as React from 'react';
import type { SVGProps } from 'react';

const CheeseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.75 24.7969L15.4473 9.33971C16.7362 7.63651 19.1359 7.24646 20.8979 8.45375L44.75 24.7969V37.7969C44.75 40.006 42.9591 41.7969 40.75 41.7969H39.75C39.1977 41.7969 38.7538 41.3474 38.6738 40.8009C38.3938 38.8862 37.2752 36.2969 34.25 36.2969C31.2248 36.2969 30.1062 38.8862 29.8262 40.8009C29.7462 41.3474 29.3023 41.7969 28.75 41.7969H7.75C5.54086 41.7969 3.75 40.006 3.75 37.7969V24.7969ZM44.75 24.7969H3.75"
      stroke="currentColor"
      strokeWidth={1.5}
    />
    <circle cx={16.75} cy={31.2969} r={3.25} stroke="currentColor" strokeWidth={1.5} />
    <circle cx={24.25} cy={17.7969} r={1.75} stroke="currentColor" strokeWidth={1.5} />
    <circle cx={40.25} cy={30.7969} r={1.75} stroke="currentColor" strokeWidth={1.5} />
  </svg>
);

export default CheeseIcon;
