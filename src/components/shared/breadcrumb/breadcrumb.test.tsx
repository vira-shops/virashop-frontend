import { render, screen } from '@testing-library/react';
import { Breadcrumb } from './breadcrumb';

describe('Breadcrumb', () => {
  it('renders the navigation with an accessible label', () => {
    render(<Breadcrumb items={[{ label: 'خانه', href: '/' }, { label: 'آجیل و خشکبار' }]} />);

    expect(screen.getByRole('navigation', { name: 'breadcrumb' })).toBeInTheDocument();
  });

  it('renders linked items as links and the last item as plain text', () => {
    render(<Breadcrumb items={[{ label: 'خانه', href: '/' }, { label: 'آجیل و خشکبار' }]} />);

    expect(screen.getByRole('link', { name: 'خانه' })).toHaveAttribute('href', '/');
    expect(screen.getByText('آجیل و خشکبار')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'آجیل و خشکبار' })).not.toBeInTheDocument();
  });

  it('renders the last item as plain text even when it has an href', () => {
    render(<Breadcrumb items={[{ label: 'خانه', href: '/' }]} />);

    expect(screen.queryByRole('link', { name: 'خانه' })).not.toBeInTheDocument();
    expect(screen.getByText('خانه')).toBeInTheDocument();
  });

  it('renders a separator between adjacent items only', () => {
    render(
      <Breadcrumb
        items={[
          { label: 'خانه', href: '/' },
          { label: 'فروشگاه', href: '/wholesale' },
          { label: 'آجیل' },
        ]}
      />,
    );

    expect(screen.getAllByText('/')).toHaveLength(2);
  });

  it('merges a custom className without removing built-in classes', () => {
    render(<Breadcrumb items={[{ label: 'خانه' }]} className="custom-class" />);

    const nav = screen.getByRole('navigation', { name: 'breadcrumb' });

    expect(nav).toHaveClass('custom-class');
    expect(nav).toHaveClass('flex');
  });
});
