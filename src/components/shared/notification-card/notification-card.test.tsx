import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { NotificationCard } from './notification-card';

const props = {
  title: 'سفارش شما ارسال شد',
  body: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ است.',
  date: '2021-08-12T08:00:00Z',
};

describe('NotificationCard', () => {
  it('renders the title, clamped body and a Jalali date', () => {
    render(<NotificationCard {...props} />);

    expect(screen.getByRole('heading', { name: props.title })).toBeInTheDocument();
    expect(screen.getByText(props.body)).toHaveClass('line-clamp-2');
    expect(screen.getByText('۱۴۰۰/۵/۲۱')).toHaveAttribute('dateTime', props.date);
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
  });

  it('expands on click and reports the change', () => {
    const onExpandedChange = jest.fn();
    render(<NotificationCard {...props} onExpandedChange={onExpandedChange} />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(props.body)).not.toHaveClass('line-clamp-2');
    expect(screen.getByRole('article')).toHaveClass('border-primary');
    expect(onExpandedChange).toHaveBeenCalledWith(true);
  });

  it('honours the controlled state', () => {
    render(<NotificationCard {...props} expanded />);

    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('mutes read notifications', () => {
    render(<NotificationCard {...props} read />);

    expect(screen.getByRole('article')).toHaveAttribute('data-read', 'true');
    expect(screen.getByRole('button', { name: props.title })).toHaveClass('text-blue-300');
  });

  it('toggles when the card itself is clicked', () => {
    render(<NotificationCard {...props} />);

    fireEvent.click(screen.getByText(props.body));

    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });
});
