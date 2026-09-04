import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CardSection } from './card-section';

const items = [
  {
    id: '1',
    image: { src: '/images/landing/big-offer/01.png', alt: 'پکیج صرفه‌جویی خانوار' },
    title: 'کارت یک',
    priceLabel: 'قیمت از',
    price: '۴۵۰٬۰۰۰',
    action: { label: 'خرید', href: '/wholesale' },
  },
  {
    id: '2',
    image: { src: '/images/landing/big-offer/02.png', alt: 'سبد پروتئین ویژه' },
    title: 'کارت دو',
    action: { label: 'خرید', href: '/wholesale' },
  },
];

describe('CardSection', () => {
  it('renders the title, header link and one ProductCard per item', () => {
    render(
      <CardSection
        title="تخفیف بزرگ"
        link={{ label: 'مشاهده همه', href: '/wholesale/offers' }}
        items={items}
      />,
    );

    expect(screen.getByText('تخفیف بزرگ')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'مشاهده همه' })).toHaveAttribute(
      'href',
      '/wholesale/offers',
    );
    expect(screen.getByText('کارت یک')).toBeInTheDocument();
    expect(screen.getByText('کارت دو')).toBeInTheDocument();
  });

  it('does not render the header link when none is given', () => {
    render(<CardSection title="پرفروش‌ترین‌ها" items={items} />);

    expect(screen.getByText('پرفروش‌ترین‌ها')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'مشاهده همه' })).not.toBeInTheDocument();
  });

  it('renders nothing when the item list is empty', () => {
    const { container } = render(<CardSection title="خالی" items={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('applies style overrides to the header, title, carousel row and items', () => {
    render(
      <CardSection
        title="تخفیف بزرگ"
        items={items}
        headerClassName="header-override"
        titleClassName="title-override"
        carouselClassName="carousel-override"
        itemClassName="item-override"
      />,
    );

    expect(screen.getByText('تخفیف بزرگ')).toHaveClass('title-override');
    expect(screen.getByText('تخفیف بزرگ').closest('.header-override')).not.toBeNull();
    expect(document.querySelector('.carousel-override')).not.toBeNull();
    expect(screen.getByText('کارت یک').closest('.item-override')).not.toBeNull();
  });

  it('renders the link as a button with a working onClick when no href is given', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(
      <CardSection
        title="تخفیف بزرگ"
        link={{ label: 'مشاهده همه', onClick: handleClick }}
        items={items}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'مشاهده همه' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
