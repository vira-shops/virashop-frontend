import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { ImageCarousel } from './image-carousel';

const images = [
  { id: '1', src: '/images/landing/slider/slider-1.png', alt: 'بنر اول', href: '/retail/offers' },
  { id: '2', src: '/images/landing/slider/slider-2.png', alt: 'بنر دوم' },
  { id: '3', src: '/images/landing/slider/slider-3.png', alt: 'بنر سوم' },
];

describe('ImageCarousel', () => {
  it('builds one slide per image', () => {
    render(<ImageCarousel images={images} />);

    expect(screen.getByAltText('بنر اول')).toBeInTheDocument();
    expect(screen.getByAltText('بنر دوم')).toBeInTheDocument();
    expect(screen.getByAltText('بنر سوم')).toBeInTheDocument();
  });

  it('wraps a slide in a link when the image has an href', () => {
    render(<ImageCarousel images={images} />);

    expect(screen.getByRole('link', { name: 'بنر اول' })).toHaveAttribute('href', '/retail/offers');
  });

  it('renders one dot per image and no arrows', () => {
    render(<ImageCarousel images={images} />);

    expect(screen.getAllByRole('tab').length).toBe(images.length);
    expect(screen.queryByRole('button', { name: 'قبلی' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'بعدی' })).not.toBeInTheDocument();
  });

  it('hides the dots when showDots is false', () => {
    render(<ImageCarousel images={images} showDots={false} />);

    expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
  });

  it('renders nothing for an empty image list', () => {
    const { container } = render(<ImageCarousel images={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('sets the wrapper id for scroll anchoring', () => {
    const { container } = render(<ImageCarousel id="promo-slider" images={images} />);

    expect(container.firstElementChild).toHaveAttribute('id', 'promo-slider');
  });
});
