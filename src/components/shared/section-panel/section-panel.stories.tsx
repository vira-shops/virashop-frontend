import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SectionPanel } from './section-panel';

const meta: Meta<typeof SectionPanel> = {
  title: 'Shared/SectionPanel',
  component: SectionPanel,
  tags: ['autodocs'],
  args: {
    title: 'اطلاعات سفارش',
    children: <p className="text-body-sm text-black">محتوای بخش در اینجا قرار می‌گیرد.</p>,
  },
  decorators: [
    (Story) => (
      <div className="rounded-8 max-w-3xl bg-white p-7">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SectionPanel>;

export const Basic: Story = {};

export const WithActions: Story = {
  args: {
    title: 'محصولات',
    actions: <span className="text-caption-md text-primary">۳ کالا</span>,
  },
};
