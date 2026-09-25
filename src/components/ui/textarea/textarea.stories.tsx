import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Textarea } from './textarea';

const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['outline', 'fill', 'ghost'] },
    color: { control: 'radio', options: ['primary', 'blue', 'yellow'] },
    state: { control: 'radio', options: [undefined, 'error', 'success', 'warning'] },
    disabled: { control: 'boolean' },
  },
  args: { label: 'آدرس', placeholder: 'آدرس کامل را وارد کنید', fullWidth: true },
  decorators: [
    (Story) => (
      <div className="max-w-md p-10">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Basic: Story = {};

export const Variants: Story = {
  name: 'انواع ظاهر',
  render: (args) => (
    <div className="flex flex-col gap-10">
      <Textarea {...args} variant="outline" label="outline" />
      <Textarea {...args} variant="fill" label="fill" />
      <Textarea {...args} variant="ghost" label="ghost" />
    </div>
  ),
};

export const States: Story = {
  name: 'وضعیت‌ها',
  render: (args) => (
    <div className="flex flex-col gap-10">
      <Textarea {...args} state="error" inputMessage="آدرس الزامی است" />
      <Textarea {...args} state="success" inputMessage="ذخیره شد" />
      <Textarea {...args} state="warning" inputMessage="آدرس کوتاه است" />
      <Textarea {...args} disabled defaultValue="یزد - خیابان ۱۷ شهریور - کوچه ۲" />
    </div>
  ),
};
