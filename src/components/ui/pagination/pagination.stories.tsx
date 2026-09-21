import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Pagination } from './pagination';

const meta: Meta<typeof Pagination> = {
  title: 'UI/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'radio', options: ['primary', 'blue'] },
    size: { control: 'radio', options: ['sm', 'md'] },
  },
  args: {
    page: 1,
    totalPages: 54,
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: (args) => {
    function Controlled() {
      const [page, setPage] = useState(args.page);
      return <Pagination {...args} page={page} onPageChange={setPage} />;
    }
    return <Controlled />;
  },
};

export const MiddleOfRange: Story = {
  args: { page: 27 },
  render: Default.render,
};

export const FewPages: Story = {
  args: { page: 2, totalPages: 4 },
  render: Default.render,
};

export const Disabled: Story = {
  args: { disabled: true, onPageChange: () => {} },
};
