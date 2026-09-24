import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AnnouncementCarousel } from './announcement-carousel';

const BODY =
  'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است...';

const meta: Meta<typeof AnnouncementCarousel> = {
  title: 'Shared/AnnouncementCarousel',
  component: AnnouncementCarousel,
  tags: ['autodocs'],
  args: {
    items: [
      { id: 1, title: 'سفارش شما ارسال شد', body: BODY, href: '#' },
      { id: 2, title: 'تخفیف ویژه آخر هفته', body: BODY, href: '#' },
      { id: 3, title: 'به‌روزرسانی قوانین', body: BODY },
    ],
  },
  decorators: [
    (Story) => (
      <div className="max-w-4xl bg-blue-50 p-10">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AnnouncementCarousel>;

export const Basic: Story = {};

export const Single: Story = {
  args: { items: [{ id: 1, title: 'سفارش شما ارسال شد', body: BODY, href: '#' }] },
};

export const WithoutArtwork: Story = {
  name: 'بدون تصویر (موبایل)',
  args: { illustrationClassName: 'hidden' },
};
