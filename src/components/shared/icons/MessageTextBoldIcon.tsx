import * as React from 'react';
import type { SVGProps } from 'react';

const MessageTextBoldIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2ZM7 7.25C6.59 7.25 6.25 7.59 6.25 8C6.25 8.41 6.59 8.75 7 8.75H17C17.41 8.75 17.75 8.41 17.75 8C17.75 7.59 17.41 7.25 17 7.25H7ZM7 12.25C6.59 12.25 6.25 12.59 6.25 13C6.25 13.41 6.59 13.75 7 13.75H13C13.41 13.75 13.75 13.41 13.75 13C13.75 12.59 13.41 12.25 13 12.25H7Z"
      fill="currentColor"
    />
  </svg>
);

export default MessageTextBoldIcon;
