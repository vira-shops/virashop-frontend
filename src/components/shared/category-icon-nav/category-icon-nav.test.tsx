import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { CategoryIconNav } from './category-icon-nav';

const items = [
  { id: 1, title: 'مرغ', image: '/images/categories/chicken.png' },
  { id: 2, title: 'گوشت قرمز', image: '/images/categories/meat.png' },
];

describe('CategoryIconNav', () => {
  it('renders one tile per item', () => {
    render(<CategoryIconNav items={items} />);

    expect(screen.getByText('مرغ')).toBeInTheDocument();
    expect(screen.getByText('گوشت قرمز')).toBeInTheDocument();
  });

  it('renders nothing when there are no items', () => {
    const { container } = render(<CategoryIconNav items={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('highlights the active item', () => {
    render(<CategoryIconNav items={items} activeId={2} />);

    const activeTitle = screen.getByText('گوشت قرمز');
    const card = activeTitle.closest('a, button');
    expect(card?.querySelector('.ring-primary-500')).not.toBeNull();
  });
});
