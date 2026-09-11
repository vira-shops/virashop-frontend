import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StoryBar } from './story-bar';

const stories = [
  { src: '/images/landing/hero/story-1.png', title: 'فروش ویژه' },
  { src: '/images/landing/hero/story-2.png', title: 'تخفیف عمده' },
];

describe('StoryBar', () => {
  it('renders one labelled trigger per story', () => {
    render(<StoryBar stories={stories} />);

    expect(screen.getByLabelText('مشاهده استوری فروش ویژه')).toBeInTheDocument();
    expect(screen.getByLabelText('مشاهده استوری تخفیف عمده')).toBeInTheDocument();
  });

  it('reports the clicked story index through onStoryOpen', async () => {
    const onStoryOpen = jest.fn();
    const user = userEvent.setup();
    render(<StoryBar stories={stories} onStoryOpen={onStoryOpen} />);

    await user.click(screen.getByLabelText('مشاهده استوری تخفیف عمده'));

    expect(onStoryOpen).toHaveBeenCalledWith(1);
  });
});
