import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ImageCarousel } from './image-carousel';

const meta: Meta<typeof ImageCarousel> = {
  title: 'Shared/ImageCarousel',
  component: ImageCarousel,
};

export default meta;
type Story = StoryObj<typeof ImageCarousel>;

export const Default: Story = {
  args: {
    images: [
      {
        id: '1',
        src: '/images/landing/slider/slider-1.png',
        alt: 'بنر کمپین اول',
        href: '/retail/offers',
      },
      { id: '2', src: '/images/landing/slider/slider-2.png', alt: 'بنر کمپین دوم' },
      { id: '3', src: '/images/landing/slider/slider-3.png', alt: 'بنر کمپین سوم' },
    ],
  },
};

export const WithoutLinksAndDots: Story = {
  args: {
    showDots: false,
    autoplayMs: 0,
    images: [
      { id: '1', src: '/images/landing/slider/slider-1.png', alt: 'اسلاید اول' },
      { id: '2', src: '/images/landing/slider/slider-2.png', alt: 'اسلاید دوم' },
    ],
  },
};
