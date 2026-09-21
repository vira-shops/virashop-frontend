import * as React from 'react';
import { render, screen, within } from '@testing-library/react';
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

    // The title's emphasized segment renders in its own <span> (see the
    // two-tone emphasis test below), so it's split across elements — match
    // on the heading's full text content instead of a single text node.
    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('تخفیف بزرگ');
    expect(screen.getByRole('link', { name: 'مشاهده همه' })).toHaveAttribute(
      'href',
      '/wholesale/offers',
    );
    expect(screen.getByText('کارت یک')).toBeInTheDocument();
    expect(screen.getByText('کارت دو')).toBeInTheDocument();
  });

  it('does not render the header link when none is given', () => {
    render(<CardSection title="پرفروش‌ترین‌ها" items={items} />);

    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('پرفروش‌ترین‌ها');
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

    const heading = screen.getByRole('heading', { level: 4 });

    expect(heading).toHaveTextContent('تخفیف بزرگ');
    expect(heading).toHaveClass('title-override');
    expect(heading.closest('.header-override')).not.toBeNull();
    expect(document.querySelector('.carousel-override')).not.toBeNull();
    expect(screen.getByText('کارت یک').closest('.item-override')).not.toBeNull();
  });

  it('renders the part of the title after the first space in black', () => {
    render(<CardSection title="تخفیف بزرگ" items={items} />);

    const heading = screen.getByRole('heading', { level: 4 });
    const emphasis = within(heading).getByText('بزرگ', { exact: false });

    expect(emphasis.tagName).toBe('SPAN');
    expect(emphasis).toHaveClass('text-black');
  });

  it('splits a ZWNJ-joined compound title at the first نیم‌فاصله', () => {
    render(<CardSection title="پرفروش‌ترین‌ها" items={items} />);

    const heading = screen.getByRole('heading', { level: 4 });
    const emphasis = within(heading).getByText('ترین‌ها', { exact: false });

    expect(emphasis).toHaveClass('text-black');
  });

  it('does not emphasize a single-word title', () => {
    render(<CardSection title="ویژه" items={items} />);

    const heading = screen.getByRole('heading', { level: 4 });

    expect(heading).toHaveTextContent('ویژه');
    expect(heading.querySelector('span.text-black')).not.toBeInTheDocument();
  });

  it('keeps the full, unsplit title as the section aria-label', () => {
    render(<CardSection title="پرفروش‌ترین‌ها" items={items} />);

    expect(screen.getByLabelText('پرفروش‌ترین‌ها')).toBeInTheDocument();
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
