import * as React from 'react';
import { render, screen, within } from '@testing-library/react';
import { FeedbackCard } from './feedback-card';

const product = { name: 'نوشابه کولا پپسی', image: '/images/landing/big-offer/01.png' };

describe('FeedbackCard', () => {
  it('renders a review with stars, status, pros and cons', () => {
    render(
      <FeedbackCard
        variant="review"
        product={product}
        date="2021-08-12T08:00:00Z"
        rating={4}
        title="عنوان نظر"
        statusLabel="در انتظار"
        pros={['ارزش خرید داره']}
        cons={['طعمش زیاد جالب نیست']}
      />,
    );

    expect(screen.getByRole('heading', { name: product.name })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'امتیاز ۴ از ۵' })).toBeInTheDocument();
    expect(screen.getByText('در انتظار')).toBeInTheDocument();
    expect(
      within(screen.getByRole('list', { name: 'نقاط قوت' })).getByText('ارزش خرید داره'),
    ).toBeInTheDocument();
    expect(
      within(screen.getByRole('list', { name: 'نقاط ضعف' })).getByText('طعمش زیاد جالب نیست'),
    ).toBeInTheDocument();
    expect(screen.getByText('۱۴۰۰/۵/۲۱')).toBeInTheDocument();
  });

  it('renders a question with its answers', () => {
    render(
      <FeedbackCard
        variant="question"
        product={{ ...product, href: '/retail/pepsi' }}
        date="2021-08-12T08:00:00Z"
        question="تولیدی از کجاست ؟"
        answers={['مشهد', 'مشهد و اصفهان']}
      />,
    );

    expect(screen.getByRole('link', { name: product.name })).toHaveAttribute(
      'href',
      '/retail/pepsi',
    );
    expect(screen.getByText('تولیدی از کجاست ؟')).toBeInTheDocument();
    expect(screen.getAllByText('پاسخ')).toHaveLength(2);
    expect(screen.queryByRole('img', { name: /امتیاز/ })).toBeNull();
  });
});
