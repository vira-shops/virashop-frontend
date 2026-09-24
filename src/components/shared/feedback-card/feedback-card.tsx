import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MinusIcon, PlusIcon } from '@icons';
import { Rating, Typography } from '@/components/ui';
import { cn } from '@/utils/ui';
import { formatJalaliDate } from '@/utils/format';
import type {
  FeedbackCardProps,
  FeedbackProduct,
  QuestionFeedbackCardProps,
  ReviewFeedbackCardProps,
} from './types';

const ProductRow: React.FC<{ product: FeedbackProduct; children?: React.ReactNode }> = ({
  product,
  children,
}) => (
  <div className="flex items-center gap-5">
    <span className="rounded-4 relative size-13 shrink-0 overflow-hidden border border-blue-100 bg-white">
      <Image src={product.image} alt="" fill sizes="48px" className="object-contain p-1" />
    </span>
    {product.href ? (
      <Link href={product.href} className="text-body-md hover:text-primary text-black">
        {product.name}
      </Link>
    ) : (
      <Typography variant="body-md" as="h3" className="text-black">
        {product.name}
      </Typography>
    )}
    {children}
  </div>
);

const PointList: React.FC<{ items: string[]; tone: 'pro' | 'con' }> = ({ items, tone }) => {
  const Icon = tone === 'pro' ? PlusIcon : MinusIcon;

  return (
    <ul aria-label={tone === 'pro' ? 'نقاط قوت' : 'نقاط ضعف'} className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="text-body-sm flex items-start gap-3 text-blue-900">
          <Icon
            aria-hidden="true"
            className={cn(
              'mt-0.5 size-8 shrink-0',
              tone === 'pro' ? 'text-warning-green' : 'text-warning-red',
            )}
          />
          {item}
        </li>
      ))}
    </ul>
  );
};

const ReviewBody: React.FC<ReviewFeedbackCardProps> = ({ title, pros = [], cons = [] }) => (
  <>
    <Typography variant="body-sm" as="p" className="font-medium text-black">
      {title}
    </Typography>
    {(pros.length > 0 || cons.length > 0) && (
      <div className="flex flex-col gap-3">
        {pros.length > 0 && <PointList items={pros} tone="pro" />}
        {cons.length > 0 && <PointList items={cons} tone="con" />}
      </div>
    )}
  </>
);

const QuestionBody: React.FC<QuestionFeedbackCardProps> = ({
  question,
  answers,
  questionLabel = 'پرسش',
  answerLabel = 'پاسخ',
}) => (
  <dl className="flex flex-col gap-5">
    <div className="flex items-baseline gap-3">
      <dt className="text-caption-md text-blue-300">{questionLabel}</dt>
      <dd className="text-body-sm text-black">{question}</dd>
    </div>
    {answers.map((answer, index) => (
      <div key={`${answer}-${index}`} className="flex items-baseline gap-3">
        <dt className="text-caption-md text-blue-300">{answerLabel}</dt>
        <dd className="text-body-sm text-black">{answer}</dd>
      </div>
    ))}
  </dl>
);

/** One of the buyer's own reviews or questions, anchored to its product. */
export const FeedbackCard: React.FC<FeedbackCardProps> = (props) => {
  const { product, date, className } = props;

  return (
    <article
      className={cn(
        'rounded-8 relative flex flex-col gap-7 border border-blue-100 bg-white p-7',
        className,
      )}
    >
      {props.variant === 'review' && props.statusLabel && (
        <span className="text-caption-md absolute top-5 left-7 text-blue-300">
          {props.statusLabel}
        </span>
      )}

      <ProductRow product={product}>
        {props.variant === 'review' && <Rating value={props.rating} />}
      </ProductRow>

      {props.variant === 'review' ? <ReviewBody {...props} /> : <QuestionBody {...props} />}

      <time dateTime={date} className="text-caption-md self-end text-blue-300">
        {formatJalaliDate(date)}
      </time>
    </article>
  );
};

FeedbackCard.displayName = 'FeedbackCard';
