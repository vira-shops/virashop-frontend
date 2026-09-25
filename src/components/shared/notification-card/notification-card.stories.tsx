import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { NotificationCard } from './notification-card';

const BODY =
  'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.';

const meta: Meta<typeof NotificationCard> = {
  title: 'Shared/NotificationCard',
  component: NotificationCard,
  tags: ['autodocs'],
  args: { title: 'لورم ایپسوم', body: BODY, date: '2021-08-12T08:00:00Z' },
  decorators: [
    (Story) => (
      <div className="max-w-3xl bg-blue-50 p-10">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NotificationCard>;

export const Unread: Story = {};

export const Expanded: Story = { args: { defaultExpanded: true } };

export const Read: Story = { args: { read: true } };
