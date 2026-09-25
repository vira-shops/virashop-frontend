import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FeedbackCard } from './feedback-card';

const product = { name: 'نوشابه کولا پپسی', image: '/images/landing/big-offer/01.png' };

const meta: Meta<typeof FeedbackCard> = {
  title: 'Shared/FeedbackCard',
  component: FeedbackCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-3xl bg-blue-50 p-10">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FeedbackCard>;

export const Review: Story = {
  args: {
    variant: 'review',
    product,
    date: '2021-08-12T08:00:00Z',
    rating: 4,
    statusLabel: 'در انتظار',
    title: 'عنوان متن لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ است.',
    pros: ['در مجموع با توجه به قیمت در شگفت انگیز می ارزه مزه اش هم خوبه', 'ارزش خرید داره'],
    cons: ['طعمش زیاد جالب نیست'],
  },
};

export const Question: Story = {
  args: {
    variant: 'question',
    product,
    date: '2021-08-12T08:00:00Z',
    question: 'تولیدی از کجاست ؟',
    answers: ['مشهد', 'مشهد و اصفهان'],
  },
};
