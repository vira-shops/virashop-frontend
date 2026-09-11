import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HeroSearchBar } from './hero-search-bar';

describe('HeroSearchBar', () => {
  it('renders the default search placeholder', () => {
    render(<HeroSearchBar />);

    expect(screen.getByLabelText('جستجو')).toHaveAttribute(
      'placeholder',
      'برای جست و جو بهتر مکان خود را ثبت کنید',
    );
  });

  it('renders a custom placeholder when given', () => {
    render(<HeroSearchBar placeholder="جستجوی فروشگاه خرده" />);

    expect(screen.getByLabelText('جستجو')).toHaveAttribute('placeholder', 'جستجوی فروشگاه خرده');
  });

  it('reports typed values through onChange', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(<HeroSearchBar onChange={onChange} />);

    await user.type(screen.getByLabelText('جستجو'), 'چای');

    expect(onChange).toHaveBeenLastCalledWith('چای');
  });
});
