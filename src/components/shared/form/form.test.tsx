import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { z } from 'zod';
import { Form } from './form';
import { FormInput } from './form-input';
import { FormSelect } from './form-select';

const schema = z.object({
  firstName: z.string().min(2, 'نام باید حداقل ۲ حرف باشد'),
  channel: z.string().min(1, 'کانال را انتخاب کنید'),
});

type Values = z.infer<typeof schema>;

const renderForm = (onSubmit: (values: Values) => void) =>
  render(
    <Form<Values>
      schema={schema}
      defaultValues={{ firstName: '', channel: '' }}
      onSubmit={onSubmit}
    >
      <FormInput<Values> name="firstName" label="نام" />
      <FormSelect<Values> name="channel" label="کانال" placeholder="انتخاب کنید">
        <option value="RETAIL">خرده</option>
      </FormSelect>
      <button type="submit">ارسال</button>
    </Form>,
  );

describe('Form', () => {
  it('renders fields wired to react-hook-form', () => {
    renderForm(jest.fn());

    expect(screen.getByLabelText('نام')).toBeInTheDocument();
    expect(screen.getByLabelText('کانال')).toBeInTheDocument();
  });

  it('blocks submit and shows zod errors when values are invalid', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    renderForm(onSubmit);

    await user.click(screen.getByRole('button', { name: 'ارسال' }));

    await waitFor(() => {
      expect(screen.getByText('نام باید حداقل ۲ حرف باشد')).toBeInTheDocument();
      expect(screen.getByText('کانال را انتخاب کنید')).toBeInTheDocument();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('marks invalid fields with the error state', async () => {
    const user = userEvent.setup();
    renderForm(jest.fn());

    await user.click(screen.getByRole('button', { name: 'ارسال' }));

    await waitFor(() => {
      expect(screen.getByLabelText('نام').closest('.input')).toHaveClass('input-error');
    });
  });

  it('submits validated values through the zod resolver', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    renderForm(onSubmit);

    await user.type(screen.getByLabelText('نام'), 'سارا');
    await user.selectOptions(screen.getByLabelText('کانال'), 'RETAIL');
    await user.click(screen.getByRole('button', { name: 'ارسال' }));

    await waitFor(() => {
      // RHF hands the submit event through as the second argument.
      expect(onSubmit).toHaveBeenCalledWith(
        { firstName: 'سارا', channel: 'RETAIL' },
        expect.anything(),
      );
    });
  });

  it('exposes the form instance through the render-prop children', () => {
    render(
      <Form<Values>
        schema={schema}
        defaultValues={{ firstName: 'سارا', channel: 'RETAIL' }}
        onSubmit={jest.fn()}
      >
        {(form) => <span data-testid="values">{form.getValues().firstName}</span>}
      </Form>,
    );

    expect(screen.getByTestId('values')).toHaveTextContent('سارا');
  });
});
