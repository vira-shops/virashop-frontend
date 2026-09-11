import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { LocationBadge } from './index';
import { LOCATION_ARIA_LABEL } from './constants';

describe('LocationBadge', () => {
  it('names itself for assistive tech and shows the city', () => {
    render(<LocationBadge city="تهران" />);

    expect(screen.getByLabelText(LOCATION_ARIA_LABEL)).toBeInTheDocument();
    expect(screen.getByText('تهران')).toBeInTheDocument();
  });
});
