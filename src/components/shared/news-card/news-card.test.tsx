import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { NewsCard } from './news-card';

describe('NewsCard', () => {
  const baseProps = {
    image: { src: '/images/landing/tech-news/news-01.png', alt: 'تصویر خبر' },
    title: 'هوش مصنوعی، آینده خرید آنلاین',
    excerpt: 'چطور مدل‌های زبانی تجربه‌ی خرید مشتریان را دگرگون می‌کنند.',
  };

  it('renders image, title and excerpt', () => {
    render(<NewsCard {...baseProps} />);

    expect(screen.getByAltText('تصویر خبر')).toBeInTheDocument();
    expect(screen.getByText('هوش مصنوعی، آینده خرید آنلاین')).toBeInTheDocument();
    expect(screen.getByText(/مدل‌های زبانی/)).toBeInTheDocument();
  });

  it('falls back the image alt to the title when alt is not given', () => {
    render(<NewsCard {...baseProps} image={{ src: '/x.png' }} />);

    expect(screen.getByRole('img', { name: 'هوش مصنوعی، آینده خرید آنلاین' })).toBeInTheDocument();
  });

  it('renders the read-more link with the default label when href is given', () => {
    render(<NewsCard {...baseProps} href="/blog" />);

    const link = screen.getByRole('link', { name: 'مشاهده بیشتر' });

    expect(link).toHaveAttribute('href', '/blog');
  });

  it('does not render a link when href is omitted', () => {
    render(<NewsCard {...baseProps} />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders a custom link label when provided', () => {
    render(<NewsCard {...baseProps} href="/blog" linkLabel="ادامه مطلب" />);

    expect(screen.getByRole('link', { name: 'ادامه مطلب' })).toBeInTheDocument();
  });

  it('merges custom className without removing built-in classes', () => {
    const { container } = render(<NewsCard {...baseProps} className="custom-class" />);

    const card = container.querySelector('article');

    expect(card).toHaveClass('custom-class');
    expect(card).toHaveClass('shadow-sm');
  });

  it('applies part-level style overrides', () => {
    render(<NewsCard {...baseProps} href="/blog" titleClassName="text-primary" />);

    expect(screen.getByText('هوش مصنوعی، آینده خرید آنلاین')).toHaveClass('text-primary');
  });
});
