import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Toast } from './toast';
import { ToastProvider, useToast } from './toast-provider';

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['success', 'error', 'info'] },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

const description =
  'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.';

export const Simple: Story = {
  render: () => (
    <div className="flex flex-col gap-11">
      <Toast variant="success" description={description} />
      <Toast variant="error" description={description} />
      <Toast variant="info" description={description} />
    </div>
  ),
};

export const WithTitle: Story = {
  render: () => (
    <div className="flex flex-col gap-11">
      <Toast
        variant="success"
        title="عنوان پیام تایید"
        description={description}
        onClose={() => {}}
      />
      <Toast variant="error" title="عنوان پیام نشده" description={description} onClose={() => {}} />
      <Toast variant="info" title="عنوان پیام نشده" description={description} onClose={() => {}} />
    </div>
  ),
};

const ToastDemo = () => {
  const { success, error, info } = useToast();

  return (
    <div className="flex flex-wrap gap-11">
      <button
        type="button"
        className="bg-warning-green rounded-5 px-11 py-5 text-white"
        onClick={() => success('پرداخت با موفقیت انجام شد', { title: 'عنوان پیام تایید' })}
      >
        نمایش موفقیت
      </button>
      <button
        type="button"
        className="bg-warning-red rounded-5 px-11 py-5 text-white"
        onClick={() => error('خطایی رخ داد، دوباره تلاش کنید')}
      >
        نمایش خطا
      </button>
      <button
        type="button"
        className="bg-warning-blue rounded-5 px-11 py-5 text-white"
        onClick={() => info('پیام جدید دریافت شد', { title: 'عنوان پیام' })}
      >
        نمایش اطلاع‌رسانی
      </button>
    </div>
  );
};

export const Interactive: Story = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
};
