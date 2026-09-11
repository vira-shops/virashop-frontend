import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { z } from 'zod';
import { Button } from '@/components/ui';
import { Form } from './form';
import { FormInput } from './form-input';
import { FormSelect } from './form-select';

const meta: Meta<typeof Form> = {
  title: 'Shared/Form',
  component: Form,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Form>;

const schema = z.object({
  firstName: z.string().min(2, 'نام باید حداقل ۲ حرف باشد'),
  channel: z.string().min(1, 'کانال را انتخاب کنید'),
});

type Values = z.infer<typeof schema>;

export const Basic: Story = {
  render: () => (
    <Form<Values>
      schema={schema}
      defaultValues={{ firstName: '', channel: '' }}
      onSubmit={(values) => window.alert(JSON.stringify(values))}
      className="w-96"
    >
      <FormInput<Values> name="firstName" label="نام" placeholder="نام خود را وارد کنید" />
      <FormSelect<Values> name="channel" label="کانال" placeholder="انتخاب کنید">
        <option value="RETAIL">خرده</option>
        <option value="WHOLESALE">عمده</option>
      </FormSelect>
      <Button type="submit" color="primary">
        ارسال
      </Button>
    </Form>
  ),
};

export const WithErrors: Story = {
  render: () => (
    <Form<Values>
      schema={schema}
      defaultValues={{ firstName: '', channel: '' }}
      onSubmit={() => {}}
      className="w-96"
    >
      <FormInput<Values> name="firstName" label="نام" />
      <FormSelect<Values> name="channel" label="کانال" placeholder="انتخاب کنید">
        <option value="RETAIL">خرده</option>
      </FormSelect>
      <Button type="submit" color="primary">
        ارسال
      </Button>
    </Form>
  ),
};
