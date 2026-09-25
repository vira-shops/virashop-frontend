export interface FeedbackProduct {
  name: string;
  image: string;
  /** Links the product name to its page. */
  href?: string;
}

interface FeedbackCardBase {
  product: FeedbackProduct;
  /** ISO timestamp — rendered as a Jalali date. */
  date: string;
  className?: string;
}

/** A buyer's product review — stars, a title, and pros / cons. */
export interface ReviewFeedbackCardProps extends FeedbackCardBase {
  variant: 'review';
  rating: number;
  title: string;
  pros?: string[];
  cons?: string[];
  /** Moderation label in the top corner — «در انتظار». */
  statusLabel?: string;
}

/** A buyer's question with the answers it received. */
export interface QuestionFeedbackCardProps extends FeedbackCardBase {
  variant: 'question';
  question: string;
  answers: string[];
  /** @default 'پرسش' */
  questionLabel?: string;
  /** @default 'پاسخ' */
  answerLabel?: string;
}

export type FeedbackCardProps = ReviewFeedbackCardProps | QuestionFeedbackCardProps;
