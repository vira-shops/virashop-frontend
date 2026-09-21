export type PaginationColor = 'primary' | 'blue';
export type PaginationSize = 'sm' | 'md';

export interface PaginationProps {
  /** 1-indexed current page. */
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Pages shown around the current page before collapsing into an ellipsis. */
  siblingCount?: number;
  color?: PaginationColor;
  size?: PaginationSize;
  disabled?: boolean;
  className?: string;
  itemClassName?: string;
}
