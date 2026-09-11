import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { CitySelect } from './city-select';

const cities = [
  { value: 'tehran', label: 'تهران' },
  { value: 'mashhad', label: 'مشهد' },
];

describe('CitySelect', () => {
  it('names the trigger with the default accessible label', () => {
    render(<CitySelect cities={cities} />);

    expect(screen.getByLabelText('انتخاب شهر')).toBeInTheDocument();
  });

  it('names the trigger with a custom accessible label when given', () => {
    render(<CitySelect cities={cities} aria-label="انتخاب شهر تحویل" />);

    expect(screen.getByLabelText('انتخاب شهر تحویل')).toBeInTheDocument();
  });

  it('disables the select while cities are loading', () => {
    render(<CitySelect cities={cities} disabled />);

    expect(screen.getByLabelText('انتخاب شهر')).toBeDisabled();
  });
});
