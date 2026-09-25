import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Avatar } from './avatar';

describe('Avatar', () => {
  it('renders the placeholder glyph when there is no photo', () => {
    render(<Avatar alt="حسین حیدری" />);

    const avatar = screen.getByRole('img', { name: 'حسین حیدری' });

    expect(avatar).toHaveClass('avatar', 'avatar-size-md');
    expect(avatar.querySelector('svg')).toHaveClass('avatar-fallback');
    expect(avatar.querySelector('img')).toBeNull();
  });

  it('renders the photo when a src is given', () => {
    render(<Avatar alt="حسین حیدری" src="/images/landing/hero/story-1.png" />);

    const photo = screen.getByRole('img', { name: 'حسین حیدری' });

    expect(photo.tagName).toBe('IMG');
    expect(photo.parentElement).toHaveClass('avatar');
    expect(photo.parentElement!.querySelector('svg')).toBeNull();
  });

  it.each([
    ['xs', 'avatar-size-xs'],
    ['sm', 'avatar-size-sm'],
    ['md', 'avatar-size-md'],
    ['lg', 'avatar-size-lg'],
    ['xl', 'avatar-size-xl'],
  ] as const)('applies the %s size class', (size, expected) => {
    render(<Avatar alt="کاربر" size={size} />);

    expect(screen.getByRole('img', { name: 'کاربر' })).toHaveClass(expected);
  });

  it('adds the ring and merges custom classes', () => {
    render(<Avatar alt="کاربر" ring className="custom" />);

    expect(screen.getByRole('img', { name: 'کاربر' })).toHaveClass('avatar-ring', 'custom');
  });
});
