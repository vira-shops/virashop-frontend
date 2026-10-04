import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ActionMenu } from './action-menu';

const setup = () => {
  const onEdit = jest.fn();
  const onRemove = jest.fn();

  render(
    <div>
      <ActionMenu
        label="گزینه‌های آدرس"
        items={[
          { key: 'edit', label: 'ویرایش', onSelect: onEdit },
          { key: 'remove', label: 'حذف', tone: 'danger', onSelect: onRemove },
        ]}
      />
      <p>بیرون</p>
    </div>,
  );

  return { onEdit, onRemove, trigger: screen.getByRole('button', { name: 'گزینه‌های آدرس' }) };
};

describe('ActionMenu', () => {
  it('is closed until the trigger is clicked, then focuses the first item', () => {
    const { trigger } = setup();

    expect(screen.queryByRole('menu')).toBeNull();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menu', { name: 'گزینه‌های آدرس' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'ویرایش' })).toHaveFocus();
    expect(screen.getByRole('menuitem', { name: 'حذف' })).toHaveClass('text-warning-red');
  });

  it('runs the action and closes', () => {
    const { trigger, onRemove } = setup();

    fireEvent.click(trigger);
    fireEvent.click(screen.getByRole('menuitem', { name: 'حذف' }));

    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('closes on outside click and on Escape (focus returns to the trigger)', () => {
    const { trigger } = setup();

    fireEvent.click(trigger);
    fireEvent.mouseDown(screen.getByText('بیرون'));
    expect(screen.queryByRole('menu')).toBeNull();

    fireEvent.click(trigger);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('menu')).toBeNull();
    expect(trigger).toHaveFocus();
  });
});
