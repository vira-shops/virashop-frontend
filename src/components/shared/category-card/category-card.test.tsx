import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CategoryCard } from './category-card';

describe('CategoryCard', () => {
  it('renders the title and the category image', () => {
    render(<CategoryCard title="مواد غذایی" image="/images/food.png" imageAlt="مواد غذایی" />);

    expect(screen.getByText('مواد غذایی')).toBeInTheDocument();
    expect(screen.getByAltText('مواد غذایی')).toBeInTheDocument();
  });

  it('renders as a link pointing at the category when href is given', () => {
    render(<CategoryCard title="لبنیات" image="/images/dairy.png" href="/retail/category/dairy" />);

    const link = screen.getByRole('link', { name: /لبنیات/ });
    expect(link).toHaveAttribute('href', '/retail/category/dairy');
  });

  it('renders as a button and reports clicks when no href is given', async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(<CategoryCard title="پروتئینی" image="/images/protein.png" onClick={onClick} />);

    await user.click(screen.getByRole('button', { name: /پروتئینی/ }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('shows the more overlay instead of the image when moreLabel is set', () => {
    render(<CategoryCard title="بیشتر" image="/images/more.png" moreLabel="۲۰ دسته‌بندی دیگر" />);

    expect(screen.getByText('۲۰ دسته‌بندی دیگر')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
