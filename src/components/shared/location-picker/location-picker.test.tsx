import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { LocationPicker } from './location-picker';
import { LocationPickerField } from './location-picker-field';
import { LocationPickerModal } from './location-picker-modal';
import { MapThumbnail } from './map-thumbnail';
import type { LatLng, LocationPickerProps } from './types';

/**
 * Leaflet needs a real browser, so the dynamically-loaded map is replaced by
 * a stub that "picks" a fixed point — enough to test the wiring around it.
 */
jest.mock('next/dynamic', () => () => {
  const StubMap: React.FC<Omit<LocationPickerProps, 'className'>> = ({ value, onChange }) => (
    <div>
      <span data-testid="point">{value ? `${value.lat},${value.lng}` : 'none'}</span>
      <button type="button" onClick={() => onChange({ lat: 32, lng: 54 })}>
        pick
      </button>
    </div>
  );

  return StubMap;
});

const renderWithQuery = (ui: React.ReactElement) =>
  render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { mutations: { retry: false } } })}
    >
      {ui}
    </QueryClientProvider>,
  );

describe('LocationPicker', () => {
  it('renders the labelled map region and forwards picks', () => {
    const onChange = jest.fn();
    render(<LocationPicker value={null} onChange={onChange} />);

    expect(screen.getByRole('application')).toHaveClass('h-80');
    fireEvent.click(screen.getByRole('button', { name: 'pick' }));

    expect(onChange).toHaveBeenCalledWith({ lat: 32, lng: 54 });
  });
});

describe('LocationPickerModal', () => {
  const fetchMock = jest.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  it('confirms only once a point is chosen', () => {
    const onConfirm = jest.fn();
    renderWithQuery(<LocationPickerModal open onClose={jest.fn()} onConfirm={onConfirm} />);

    expect(screen.getByRole('dialog', { name: 'آدرس' })).toBeInTheDocument();
    expect(screen.getByText('آدرس خود را روی نقشه انتخاب کنید')).toBeInTheDocument();

    const confirm = screen.getByRole('button', { name: 'تایید' });
    expect(confirm).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: 'pick' }));
    fireEvent.click(confirm);

    expect(onConfirm).toHaveBeenCalledWith({ lat: 32, lng: 54 });
  });

  it('starts from the initial value when editing', () => {
    renderWithQuery(
      <LocationPickerModal
        open
        onClose={jest.fn()}
        onConfirm={jest.fn()}
        initialValue={{ lat: 31.9, lng: 54.36 }}
      />,
    );

    expect(screen.getByTestId('point')).toHaveTextContent('31.9,54.36');
    expect(screen.getByRole('button', { name: 'تایید' })).toBeEnabled();
  });

  it('drops the pin on the searched place, or says nothing was found', async () => {
    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [{ lat: '31.89', lon: '54.37', display_name: 'یزد' }],
      })
      .mockResolvedValueOnce({ ok: true, json: async () => [] });
    renderWithQuery(<LocationPickerModal open onClose={jest.fn()} onConfirm={jest.fn()} />);

    const search = screen.getByRole('searchbox', { name: 'جستجوی مکان روی نقشه' });
    fireEvent.change(search, { target: { value: 'میدان امیرچخماق' } });
    fireEvent.submit(search);

    expect(await screen.findByText('31.89,54.37')).toBeInTheDocument();

    fireEvent.change(search, { target: { value: 'ناکجاآباد' } });
    fireEvent.submit(search);

    expect(await screen.findByText('مکانی با این نام پیدا نشد')).toBeInTheDocument();
    expect(screen.getByTestId('point')).toHaveTextContent('31.89,54.37');
  });
});

describe('LocationPickerField', () => {
  it('opens the map from the dashed tile, then previews the saved point', () => {
    const Controlled = () => {
      const [value, setValue] = React.useState<LatLng | null>(null);
      return <LocationPickerField value={value} onChange={setValue} />;
    };
    renderWithQuery(<Controlled />);

    fireEvent.click(screen.getByRole('button', { name: 'انتخاب روی نقشه' }));
    fireEvent.click(screen.getByRole('button', { name: 'pick' }));
    fireEvent.click(screen.getByRole('button', { name: 'تایید' }));

    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByRole('button', { name: 'تغییر موقعیت روی نقشه' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'موقعیت روی نقشه' })).toBeInTheDocument();
  });

  it('stays closed while disabled', () => {
    renderWithQuery(<LocationPickerField value={null} onChange={jest.fn()} disabled />);

    expect(screen.getByRole('button', { name: 'انتخاب روی نقشه' })).toBeDisabled();
  });
});

describe('MapThumbnail', () => {
  it('draws the four OSM tiles around the point', () => {
    const { container } = render(<MapThumbnail value={{ lat: 31.8974, lng: 54.3569 }} />);

    const tiles = Array.from(container.querySelectorAll('img')).map((img) =>
      img.getAttribute('src'),
    );
    expect(tiles).toHaveLength(4);
    tiles.forEach((src) =>
      expect(src).toMatch(/^https:\/\/tile\.openstreetmap\.org\/15\/\d+\/\d+\.png$/),
    );
    expect(new Set(tiles).size).toBe(4);
  });
});

describe('PlaceSearch inside another form', () => {
  it('does not submit the surrounding form', async () => {
    const fetchMock = jest.fn().mockResolvedValue({ ok: true, json: async () => [] });
    global.fetch = fetchMock as unknown as typeof fetch;
    const onOuterSubmit = jest.fn((event: React.FormEvent) => event.preventDefault());

    renderWithQuery(
      <form onSubmit={onOuterSubmit}>
        <LocationPickerModal open onClose={jest.fn()} onConfirm={jest.fn()} />
      </form>,
    );

    const search = screen.getByRole('searchbox', { name: 'جستجوی مکان روی نقشه' });
    fireEvent.change(search, { target: { value: 'یزد' } });
    fireEvent.submit(search);

    expect(await screen.findByText('مکانی با این نام پیدا نشد')).toBeInTheDocument();
    expect(onOuterSubmit).not.toHaveBeenCalled();
  });
});
