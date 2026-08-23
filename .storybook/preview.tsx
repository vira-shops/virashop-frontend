import type { Preview } from '@storybook/nextjs-vite';
import type { Decorator } from '@storybook/react-vite';
import '../src/styles/tailwind.css';

const withRtl: Decorator = (Story) => (
  <div dir="rtl" lang="fa">
    <Story />
  </div>
);

const preview: Preview = {
  decorators: [withRtl],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
};

export default preview;
