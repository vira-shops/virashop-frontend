export type ReviewTab = 'reviews' | 'answers';

export interface ReviewTabsProps {
  value: ReviewTab;
  onChange: (tab: ReviewTab) => void;
}
