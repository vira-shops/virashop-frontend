import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { AnnouncementCarousel } from './announcement-carousel';

const items = [
  { id: 1, title: 'سفارش شما ارسال شد', body: 'متن اول', href: '/orders/1' },
  { id: 2, title: 'تخفیف ویژه', body: 'متن دوم' },
];

describe('AnnouncementCarousel', () => {
  it('renders one slide per announcement', () => {
    render(<AnnouncementCarousel items={items} autoplayMs={0} />);

    expect(screen.getByRole('heading', { name: 'سفارش شما ارسال شد' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'تخفیف ویژه' })).toBeInTheDocument();
  });

  it('links the details label only when an href exists', () => {
    render(<AnnouncementCarousel items={items} autoplayMs={0} />);

    const links = screen.getAllByRole('link', { name: 'مشاهده جزئیات' });

    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute('href', '/orders/1');
  });

  it('shows dots for multiple slides only', () => {
    const { rerender } = render(<AnnouncementCarousel items={items} autoplayMs={0} />);
    expect(screen.getAllByRole('tab')).toHaveLength(2);

    rerender(<AnnouncementCarousel items={items.slice(0, 1)} autoplayMs={0} />);
    expect(screen.queryByRole('tab')).toBeNull();
  });

  it('renders nothing without items', () => {
    const { container } = render(<AnnouncementCarousel items={[]} />);

    expect(container).toBeEmptyDOMElement();
  });
});
