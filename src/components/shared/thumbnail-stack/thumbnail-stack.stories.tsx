import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ThumbnailStack } from './thumbnail-stack';

const IMAGES = [1, 2, 3, 4, 5, 1, 2].map((n, index) => ({
  src: `/images/landing/big-offer/0${n}.png`,
  alt: `کالا ${index + 1}`,
}));

const meta: Meta<typeof ThumbnailStack> = {
  title: 'Shared/ThumbnailStack',
  component: ThumbnailStack,
  tags: ['autodocs'],
  argTypes: { size: { control: 'radio', options: ['sm', 'md', 'lg'] } },
  args: { images: IMAGES, max: 4, size: 'md' },
};

export default meta;
type Story = StoryObj<typeof ThumbnailStack>;

export const Overflowing: Story = {};

export const Few: Story = { args: { images: IMAGES.slice(0, 2) } };

export const Sizes: Story = {
  name: 'اندازه‌ها',
  render: () => (
    <div className="flex flex-col gap-7">
      <ThumbnailStack images={IMAGES} size="sm" />
      <ThumbnailStack images={IMAGES} size="md" />
      <ThumbnailStack images={IMAGES} size="lg" />
    </div>
  ),
};
