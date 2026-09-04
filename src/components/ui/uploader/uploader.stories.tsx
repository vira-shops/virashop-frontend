import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Uploader } from './uploader';

const meta: Meta<typeof Uploader> = {
  title: 'UI/Uploader',
  component: Uploader,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Uploader>;

export const Basic: Story = {
  args: {
    label: 'عنوان فیلد',
    placeholder: 'کارت ملی خود را بارگذاری کنید',
  },
};

const sampleSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200"><rect width="300" height="200" fill="#CAD4E4"/><rect x="20" y="20" width="260" height="160" fill="#F6F9FF" stroke="#344456" stroke-width="2"/></svg>';

export const WithPreview: Story = {
  render: () => (
    <Uploader
      label="عنوان فیلد"
      file={new File([sampleSvg], 'cart-meli.svg', { type: 'image/svg+xml' })}
    />
  ),
};

export const WithPdf: Story = {
  render: () => (
    <Uploader
      label="عنوان فیلد"
      file={new File(['%PDF-1.4'], 'cart-meli.pdf', { type: 'application/pdf' })}
    />
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="flex flex-col gap-11">
      <Uploader
        label="عنوان فیلد"
        placeholder="کارت ملی خود را بارگذاری کنید"
        accept="image/*"
        maxSizeMb={1}
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: 'عنوان فیلد',
    placeholder: 'کارت ملی خود را بارگذاری کنید',
    disabled: true,
  },
};
