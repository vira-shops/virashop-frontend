import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { ThumbnailStack } from './thumbnail-stack';

const images = Array.from({ length: 6 }, (_, index) => ({
  src: `/images/landing/big-offer/0${(index % 5) + 1}.png`,
  alt: `کالا ${index + 1}`,
}));

describe('ThumbnailStack', () => {
  it('shows at most `max` thumbs and collapses the rest', () => {
    render(<ThumbnailStack images={images} max={4} />);

    expect(screen.getAllByRole('img')).toHaveLength(4);
    expect(screen.getByLabelText('۲ کالای دیگر')).toHaveTextContent('+۲');
  });

  it('shows every thumb when under the limit', () => {
    render(<ThumbnailStack images={images.slice(0, 2)} />);

    expect(screen.getAllByRole('img')).toHaveLength(2);
    expect(screen.queryByText(/^\+/)).toBeNull();
  });

  it('applies the size class', () => {
    render(<ThumbnailStack images={images.slice(0, 1)} size="lg" />);

    expect(screen.getByRole('listitem')).toHaveClass('size-14');
  });
});
