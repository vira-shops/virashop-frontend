'use client';

import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/utils/ui';
import type {
  CarouselProps,
  CarouselContentProps,
  CarouselItemProps,
  CarouselPreviousProps,
  CarouselNextProps,
  CarouselApi,
  CarouselContextType,
  CarouselIndicatorProps,
  CarouselGridProps,
  CarouselGridItemProps,
  CarouselOrientation,
} from './types';

export const CarouselContext = React.createContext<CarouselContextType | null>(null);

const CarouselArrowLeft = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 12H4.5m0 0 5.25-5.25M4.5 12l5.25 5.25"
    />
  </svg>
);

const CarouselArrowRight = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12h15m0 0-5.25-5.25M19.5 12l-5.25 5.25"
    />
  </svg>
);

export const useCarousel = (): CarouselContextType => {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
};

/**
 * Subscribes to embla's `select`/`reInit` events; `getValue` must return a
 * stable value (useSyncExternalStore snapshots must not change identity).
 */
function useEmblaSyncedValue<T>(api: CarouselApi | undefined, getValue: () => T, fallback: T): T {
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      if (!api) return () => undefined;

      api.on('select', onChange);
      api.on('reInit', onChange);

      return () => {
        api.off('select', onChange);
        api.off('reInit', onChange);
      };
    },
    [api],
  );

  return React.useSyncExternalStore(subscribe, getValue, () => fallback);
}

const DEFAULT_OPTS = {
  align: 'start' as const,
  containScroll: 'trimSnaps' as const,
  loop: true,
  breakpoints: {
    '(max-width: 640px)': {
      align: 'center' as const,
      dragFree: true,
    },
  },
};

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    { orientation = 'horizontal', setApi, opts, plugins, loop, className, children, ...props },
    ref,
  ) => {
    const mergedOpts = React.useMemo(
      () => ({
        ...DEFAULT_OPTS,
        ...opts,
        ...(loop !== undefined ? { loop } : {}),
        axis: orientation === 'horizontal' ? ('x' as const) : ('y' as const),
      }),
      [opts, loop, orientation],
    );

    const [carouselRef, api] = useEmblaCarousel(mergedOpts, plugins);
    const typedApi = api as unknown as CarouselApi | undefined;

    const canScrollPrev = useEmblaSyncedValue(
      typedApi,
      () => typedApi?.canScrollPrev() ?? false,
      false,
    );
    const canScrollNext = useEmblaSyncedValue(
      typedApi,
      () => typedApi?.canScrollNext() ?? false,
      false,
    );
    const selectedIndex = useEmblaSyncedValue(
      typedApi,
      () => typedApi?.selectedScrollSnap() ?? 0,
      0,
    );
    const snapCount = useEmblaSyncedValue(
      typedApi,
      () => typedApi?.scrollSnapList().length ?? 0,
      0,
    );

    const scrollPrev = React.useCallback(() => {
      typedApi?.scrollPrev();
    }, [typedApi]);

    const scrollNext = React.useCallback(() => {
      typedApi?.scrollNext();
    }, [typedApi]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        const prevKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
        const nextKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';

        if (event.key === prevKey) {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === nextKey) {
          event.preventDefault();
          scrollNext();
        }
      },
      [orientation, scrollPrev, scrollNext],
    );

    React.useEffect(() => {
      if (!typedApi || !setApi) return;

      setApi(typedApi);
    }, [typedApi, setApi]);

    const contextValue = React.useMemo<CarouselContextType>(
      () => ({
        carouselRef,
        api: typedApi,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        orientation: orientation as CarouselOrientation,
        selectedScrollSnap: () => typedApi?.selectedScrollSnap() ?? 0,
        scrollSnapList: () => typedApi?.scrollSnapList() ?? [],
      }),
      [carouselRef, typedApi, scrollPrev, scrollNext, canScrollPrev, canScrollNext, orientation],
    );

    return (
      <CarouselContext.Provider value={contextValue}>
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn('carousel', className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
          dir="ltr"
        >
          {children}
          {/* Screen-reader-only live region announcing the active slide. */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {snapCount > 0 ? `اسلاید ${selectedIndex + 1} از ${snapCount}` : null}
          </div>
        </div>
      </CarouselContext.Provider>
    );
  },
);

Carousel.displayName = 'Carousel';

export const CarouselContent = React.forwardRef<HTMLDivElement, CarouselContentProps>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();

    return (
      <div ref={carouselRef} className="carousel-viewport" data-orientation={orientation}>
        <div
          ref={ref}
          className={cn('carousel-container', className)}
          data-orientation={orientation}
          {...props}
        />
      </div>
    );
  },
);

CarouselContent.displayName = 'CarouselContent';

export const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn('carousel-item', className)}
        data-orientation={orientation}
        {...props}
      />
    );
  },
);

CarouselItem.displayName = 'CarouselItem';

export const CarouselPrevious = React.forwardRef<HTMLButtonElement, CarouselPreviousProps>(
  ({ className, children, ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();

    return (
      <button
        ref={ref}
        type="button"
        className={cn('carousel-previous', className)}
        data-orientation={orientation}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        aria-label="قبلی"
        {...props}
      >
        {children ?? (
          <CarouselArrowLeft
            className={cn('size-12', orientation === 'vertical' && '-rotate-90')}
          />
        )}
      </button>
    );
  },
);

CarouselPrevious.displayName = 'CarouselPrevious';

export const CarouselNext = React.forwardRef<HTMLButtonElement, CarouselNextProps>(
  ({ className, children, ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();

    return (
      <button
        ref={ref}
        type="button"
        className={cn('carousel-next', className)}
        data-orientation={orientation}
        disabled={!canScrollNext}
        onClick={scrollNext}
        aria-label="بعدی"
        {...props}
      >
        {children ?? (
          <CarouselArrowRight
            className={cn('size-12', orientation === 'vertical' && '-rotate-90')}
          />
        )}
      </button>
    );
  },
);

CarouselNext.displayName = 'CarouselNext';

export const CarouselIndicator = React.forwardRef<HTMLDivElement, CarouselIndicatorProps>(
  ({ className, ...props }, ref) => {
    const { api, selectedScrollSnap, scrollSnapList } = useCarousel();

    const current = useEmblaSyncedValue(api, () => selectedScrollSnap(), 0);
    const snaps = scrollSnapList();

    return (
      <div
        ref={ref}
        className={cn('carousel-indicators', className)}
        role="tablist"
        aria-label="انتخاب اسلاید"
        {...props}
      >
        {snaps.map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-label={`برو به اسلاید ${index + 1}`}
            aria-selected={current === index}
            tabIndex={current === index ? 0 : -1}
            className={cn('carousel-indicator', current === index && 'carousel-indicator-active')}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    );
  },
);

CarouselIndicator.displayName = 'CarouselIndicator';

export const CarouselGrid = React.forwardRef<HTMLDivElement, CarouselGridProps>(
  (
    {
      itemsPerSlide = 4,
      gridCols = 2,
      gridRows = 2,
      className,
      children,
      orientation = 'horizontal',
      opts,
      plugins,
      loop,
      ...props
    },
    ref,
  ) => {
    // Prevents an infinite loop in the chunking below.
    const safeItemsPerSlide = Math.max(1, Math.floor(itemsPerSlide));

    const items = React.Children.toArray(children);
    const slides = React.useMemo(() => {
      const result: React.ReactNode[][] = [];

      for (let i = 0; i < items.length; i += safeItemsPerSlide) {
        result.push(items.slice(i, i + safeItemsPerSlide));
      }

      return result;
    }, [items, safeItemsPerSlide]);

    return (
      <Carousel
        ref={ref}
        orientation={orientation}
        opts={opts}
        plugins={plugins}
        loop={loop}
        className={cn('carousel-grid', className)}
        {...props}
      >
        <CarouselContent>
          {slides.map((slideItems, slideIndex) => (
            <CarouselItem key={slideIndex} className="carousel-item-grid">
              <div
                className="carousel-grid-inner"
                style={{
                  gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
                  gridTemplateRows: gridRows > 1 ? `repeat(${gridRows}, minmax(0, 1fr))` : 'auto',
                }}
              >
                {slideItems}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  },
);

CarouselGrid.displayName = 'CarouselGrid';

export const CarouselGridItem = React.forwardRef<HTMLDivElement, CarouselGridItemProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('carousel-grid-item', className)} {...props} />
  ),
);

CarouselGridItem.displayName = 'CarouselGridItem';
