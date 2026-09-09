import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { CampaignBanner } from './campaign-banner';

const items = [
  {
    id: '1',
    image: { src: '/images/landing/big-offer/01.png', alt: 'پکیج صرفه‌جویی خانوار' },
    title: 'کارت یک',
    priceLabel: 'قیمت از',
    price: '۴۵۰٬۰۰۰',
    action: { label: 'خرید', href: '/retail' },
  },
  {
    id: '2',
    image: { src: '/images/landing/big-offer/02.png', alt: 'سبد پروتئین ویژه' },
    title: 'کارت دو',
    action: { label: 'خرید', href: '/retail' },
  },
];

describe('CampaignBanner', () => {
  it('renders the title, subtitle and one ProductCard per item', () => {
    render(
      <CampaignBanner
        title="Weekly Offers"
        subtitle="تخفیف‌های ویژهٔ این هفته"
        endsAt={Date.now() + 60_000}
        items={items}
      />,
    );

    expect(screen.getByText('Weekly Offers')).toBeInTheDocument();
    expect(screen.getByText('تخفیف‌های ویژهٔ این هفته')).toBeInTheDocument();
    expect(screen.getByText('کارت یک')).toBeInTheDocument();
    expect(screen.getByText('کارت دو')).toBeInTheDocument();
  });

  it('renders the view-all action with its href when given', () => {
    render(
      <CampaignBanner
        title="Weekly Offers"
        endsAt={Date.now() + 60_000}
        viewAll={{ label: 'مشاهده همه', href: '/retail/offers' }}
        items={items}
      />,
    );

    // The banner renders a desktop and a mobile copy of the action.
    const viewAllButtons = screen.getAllByRole('link', { name: 'مشاهده همه' });
    expect(viewAllButtons.length).toBeGreaterThan(0);

    for (const viewAll of viewAllButtons) {
      expect(viewAll).toHaveAttribute('href', '/retail/offers');
    }
  });

  it('does not render the view-all action when none is given', () => {
    render(<CampaignBanner title="Weekly Offers" endsAt={Date.now() + 60_000} items={items} />);

    expect(screen.queryByRole('link', { name: 'مشاهده همه' })).not.toBeInTheDocument();
  });

  it('renders the countdown cells while the campaign is live', () => {
    render(
      <CampaignBanner
        title="Weekly Offers"
        endsAt={Date.now() + 24 * 60 * 60 * 1000}
        items={items}
      />,
    );

    expect(screen.getByText('روز')).toBeInTheDocument();
    expect(screen.getByText('ساعت')).toBeInTheDocument();
    expect(screen.getByText('دقیقه')).toBeInTheDocument();
    expect(screen.queryByText('این کمپین به پایان رسیده است')).not.toBeInTheDocument();
  });

  it('shows the ended message once the deadline has passed', () => {
    render(<CampaignBanner title="Weekly Offers" endsAt={Date.now() - 60_000} items={items} />);

    expect(screen.getByText('این کمپین به پایان رسیده است')).toBeInTheDocument();
  });

  it('renders nothing when the item list is empty', () => {
    const { container } = render(
      <CampaignBanner title="خالی" endsAt={Date.now() + 60_000} items={[]} />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('sets the section id for scroll anchoring', () => {
    render(
      <CampaignBanner
        id="weekly-offers"
        title="Weekly Offers"
        endsAt={Date.now() + 60_000}
        items={items}
      />,
    );

    expect(screen.getByLabelText('کمپین تخفیف')).toHaveAttribute('id', 'weekly-offers');
  });
});
