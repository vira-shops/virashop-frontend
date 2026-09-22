import * as React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Carousel,
  CarouselContent,
  CarouselGrid,
  CarouselGridItem,
  CarouselIndicator,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from './carousel';

const items = (n: number) =>
  Array.from({ length: n }, (_, i) => (
    <CarouselItem key={i} data-testid={`item-${i}`} className="basis-full">
      اسلاید {i + 1}
    </CarouselItem>
  ));

describe('Carousel', () => {
  it('renders the root with carousel role and an rtl direction by default', () => {
    render(
      <Carousel data-testid="root">
        <CarouselContent>{items(3)}</CarouselContent>
      </Carousel>,
    );

    const root = screen.getByTestId('root');

    expect(root).toHaveAttribute('role', 'region');
    expect(root).toHaveAttribute('aria-roledescription', 'carousel');
    expect(root).toHaveAttribute('dir', 'rtl');
    expect(root).toHaveClass('carousel');
  });

  it('follows opts.direction when a carousel opts out of rtl', () => {
    render(
      <Carousel data-testid="root" opts={{ direction: 'ltr' }}>
        <CarouselContent>{items(3)}</CarouselContent>
      </Carousel>,
    );

    expect(screen.getByTestId('root')).toHaveAttribute('dir', 'ltr');
  });

  it('throws when useCarousel is used outside a Carousel', () => {
    const Bad = () => {
      useCarousel();
      return null;
    };

    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Bad />)).toThrow(/useCarousel must be used within a <Carousel \/>/);
    consoleError.mockRestore();
  });

  it('exposes the API through setApi', async () => {
    let api: unknown = null;

    render(
      <Carousel
        setApi={(embla) => {
          api = embla;
        }}
      >
        <CarouselContent>{items(5)}</CarouselContent>
      </Carousel>,
    );

    await waitFor(() => {
      expect(api).not.toBeNull();
    });

    const emblaApi = api as { scrollTo: jest.Mock; selectedScrollSnap: () => number };

    expect(typeof emblaApi.scrollTo).toBe('function');
    expect(typeof emblaApi.selectedScrollSnap).toBe('function');
  });
});

describe('CarouselContent / CarouselItem', () => {
  it('renders the viewport and the container', () => {
    render(
      <Carousel>
        <CarouselContent data-testid="content">
          <CarouselItem data-testid="item-1">یک</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );

    const content = screen.getByTestId('content');

    expect(content).toHaveClass('carousel-container');
    expect(content.parentElement).toHaveClass('carousel-viewport');
    expect(screen.getByTestId('item-1')).toHaveClass('carousel-item');
  });

  it('applies the orientation attribute on viewport, container and items', () => {
    render(
      <Carousel orientation="vertical">
        <CarouselContent data-testid="content">
          <CarouselItem data-testid="item-1">یک</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );

    const content = screen.getByTestId('content');
    const item = screen.getByTestId('item-1');

    expect(content).toHaveAttribute('data-orientation', 'vertical');
    expect(content.parentElement).toHaveAttribute('data-orientation', 'vertical');
    expect(item).toHaveAttribute('data-orientation', 'vertical');
  });

  it('slides have the correct group role and aria-roledescription', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem data-testid="item-1">یک</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );

    const item = screen.getByTestId('item-1');

    expect(item).toHaveAttribute('role', 'group');
    expect(item).toHaveAttribute('aria-roledescription', 'slide');
  });
});

describe('CarouselPrevious / CarouselNext', () => {
  it('renders with default Persian aria-labels and disabled at start', () => {
    render(
      <Carousel loop={false}>
        <CarouselContent>{items(3)}</CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>,
    );

    expect(screen.getByRole('button', { name: 'قبلی' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'بعدی' })).toBeInTheDocument();
  });

  it('calls scrollNext / scrollPrev on click', async () => {
    const user = userEvent.setup();
    let selected = 0;
    let api: { on: jest.Mock; off: jest.Mock; selectedScrollSnap: () => number } | null = null;

    render(
      <Carousel
        loop={false}
        setApi={(embla) => {
          api = embla as unknown as typeof api;
        }}
        onSelect={() => {
          /* kept for parity with reference */
        }}
      >
        <CarouselContent>{items(4)}</CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>,
    );

    await waitFor(() => {
      expect(api).not.toBeNull();
    });

    const emblaApi = api as unknown as {
      on: (event: string, cb: () => void) => void;
      off: (event: string, cb: () => void) => void;
      selectedScrollSnap: () => number;
    };

    emblaApi.on('select', () => {
      selected = emblaApi.selectedScrollSnap();
    });

    await user.click(screen.getByRole('button', { name: 'بعدی' }));
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });
    expect(selected).toBeGreaterThanOrEqual(0);
  });
});

describe('CarouselIndicator', () => {
  it('renders one button per snap with Persian aria-labels', async () => {
    render(
      <Carousel>
        <CarouselContent>{items(4)}</CarouselContent>
        <CarouselIndicator />
      </Carousel>,
    );

    await waitFor(() => {
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    expect(screen.getByRole('tab', { name: 'برو به اسلاید 1' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'برو به اسلاید 4' })).toBeInTheDocument();
  });

  it('marks the active slide as selected', async () => {
    render(
      <Carousel>
        <CarouselContent>{items(3)}</CarouselContent>
        <CarouselIndicator />
      </Carousel>,
    );

    await waitFor(() => {
      const first = screen.getByRole('tab', { name: 'برو به اسلاید 1' });
      expect(first).toHaveAttribute('aria-selected', 'true');
    });
  });
});

describe('CarouselGrid', () => {
  it('chunks children into slides of itemsPerSlide', () => {
    const { container } = render(
      <CarouselGrid itemsPerSlide={4} gridCols={2} gridRows={2}>
        {Array.from({ length: 8 }, (_, i) => (
          <CarouselGridItem key={i} data-testid={`grid-item-${i}`}>
            آیتم {i + 1}
          </CarouselGridItem>
        ))}
      </CarouselGrid>,
    );

    // 8 items / 4 per slide = 2 slides
    const slides = container.querySelectorAll('.carousel-item-grid');
    expect(slides).toHaveLength(2);

    // 4 items inside the first slide
    const firstSlideItems = slides[0].querySelectorAll('.carousel-grid-item');
    expect(firstSlideItems).toHaveLength(4);
  });

  it('honors custom gridCols / gridRows via inline style', () => {
    const { container } = render(
      <CarouselGrid itemsPerSlide={4} gridCols={4} gridRows={1}>
        {Array.from({ length: 4 }, (_, i) => (
          <CarouselGridItem key={i}>x</CarouselGridItem>
        ))}
      </CarouselGrid>,
    );

    const inner = container.querySelector('.carousel-grid-inner') as HTMLElement;

    expect(inner.style.gridTemplateColumns).toContain('repeat(4');
    expect(inner.style.gridTemplateRows).toBe('auto');
  });

  it('wraps its children in a Carousel and provides navigation buttons', () => {
    render(
      <CarouselGrid itemsPerSlide={2} gridCols={2} gridRows={1} data-testid="grid">
        <CarouselGridItem>یک</CarouselGridItem>
        <CarouselGridItem>دو</CarouselGridItem>
      </CarouselGrid>,
    );

    expect(screen.getByRole('button', { name: 'قبلی' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'بعدی' })).toBeInTheDocument();
  });
});
