import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductGallery } from './product-gallery';

const images = [
  { id: '1', src: '/images/products/rice-1.png', alt: 'برنج - نمای اول' },
  { id: '2', src: '/images/products/rice-2.png', alt: 'برنج - نمای دوم' },
];

describe('ProductGallery', () => {
  it('renders nothing when there are no images', () => {
    const { container } = render(<ProductGallery images={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders a thumbnail per image and switches the active image on click', async () => {
    const user = userEvent.setup();
    render(<ProductGallery images={images} />);

    const secondThumb = screen.getByRole('button', { name: 'برنج - نمای دوم' });
    expect(secondThumb).toHaveAttribute('aria-current', 'false');

    await user.click(secondThumb);

    expect(secondThumb).toHaveAttribute('aria-current', 'true');
  });
});
