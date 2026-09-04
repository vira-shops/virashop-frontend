import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StoryTrigger, StoryTriggerList, StoryViewer } from './story';
import type { StoryItem } from './types';

const sampleItems: StoryItem[] = [
  { src: '/story-1.png', title: 'استوری یک' },
  { src: '/story-2.png', title: 'استوری دو', description: 'توضیحات' },
  { src: '/story-3.png' },
];

describe('StoryTrigger', () => {
  it('renders with role=button and Persian aria-label', () => {
    const onOpen = jest.fn();
    render(<StoryTrigger item={sampleItems[0]} onOpen={onOpen} />);

    const button = screen.getByRole('button', { name: 'مشاهده استوری استوری یک' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('story-trigger');
  });

  it('calls onOpen when clicked', async () => {
    const onOpen = jest.fn();
    const user = userEvent.setup();
    render(<StoryTrigger item={sampleItems[0]} onOpen={onOpen} />);

    await user.click(screen.getByRole('button'));

    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it('applies the seen modifier class when seen', () => {
    render(<StoryTrigger item={sampleItems[0]} onOpen={() => undefined} seen />);

    expect(screen.getByRole('button')).toHaveClass('story-trigger-seen');
  });

  it('renders a descriptive aria-label even without a title', () => {
    render(<StoryTrigger item={sampleItems[2]} onOpen={() => undefined} />);

    expect(screen.getByRole('button', { name: 'مشاهده استوری' })).toBeInTheDocument();
  });
});

describe('StoryTriggerList', () => {
  it('renders one trigger per item', () => {
    render(<StoryTriggerList items={sampleItems} onSelect={() => undefined} />);

    expect(screen.getAllByRole('button', { name: /مشاهده استوری/ })).toHaveLength(3);
  });

  it('passes the clicked index to onSelect', async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup();
    render(<StoryTriggerList items={sampleItems} onSelect={onSelect} />);

    const triggers = screen.getAllByRole('button', { name: /مشاهده استوری/ });
    await user.click(triggers[1]);

    expect(onSelect).toHaveBeenCalledWith(1);
  });

  it('marks seen items differently', () => {
    render(<StoryTriggerList items={sampleItems} onSelect={() => undefined} seenIndices={[1]} />);

    const triggers = screen.getAllByRole('button', { name: /مشاهده استوری/ });

    expect(triggers[0]).not.toHaveClass('story-trigger-seen');
    expect(triggers[1]).toHaveClass('story-trigger-seen');
    expect(triggers[2]).not.toHaveClass('story-trigger-seen');
  });
});

describe('StoryViewer', () => {
  it('renders nothing when closed', () => {
    render(<StoryViewer items={sampleItems} open={false} onClose={() => undefined} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders the dialog when open', () => {
    render(<StoryViewer items={sampleItems} open onClose={() => undefined} />);

    expect(screen.getByRole('dialog', { name: 'مشاهده استوری' })).toBeInTheDocument();
  });

  it('renders the title of the current item', () => {
    render(<StoryViewer items={sampleItems} open onClose={() => undefined} />);

    expect(screen.getByText('استوری یک')).toBeInTheDocument();
  });

  it('renders the description on top of the image when provided', () => {
    render(<StoryViewer items={sampleItems} open startIndex={1} onClose={() => undefined} />);

    expect(screen.getByText('توضیحات')).toBeInTheDocument();
  });

  it('renders one progress segment per item', () => {
    render(<StoryViewer items={sampleItems} open onClose={() => undefined} />);

    expect(screen.getAllByRole('button', { name: /برو به استوری/ })).toHaveLength(3);
  });

  it('calls onClose when the close button is clicked', async () => {
    const onClose = jest.fn();
    render(<StoryViewer items={sampleItems} open onClose={onClose} />);

    await userEvent.setup().click(screen.getByRole('button', { name: 'بستن' }));

    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when the backdrop is clicked by default', async () => {
    const onClose = jest.fn();
    render(<StoryViewer items={sampleItems} open onClose={onClose} />);

    await userEvent.setup().click(screen.getByLabelText('استوری قبلی').previousElementSibling!);

    const backdrop = document.querySelector('.story-viewer-backdrop') as HTMLElement;
    fireEvent.click(backdrop);

    expect(onClose).toHaveBeenCalled();
  });

  it('does not close on backdrop click when closeOnBackdrop=false', () => {
    const onClose = jest.fn();
    render(<StoryViewer items={sampleItems} open onClose={onClose} closeOnBackdrop={false} />);

    const backdrop = document.querySelector('.story-viewer-backdrop') as HTMLElement;
    fireEvent.click(backdrop);

    expect(onClose).not.toHaveBeenCalled();
  });

  it('advances to the next story when the next button is clicked', async () => {
    const user = userEvent.setup();
    render(<StoryViewer items={sampleItems} open onClose={() => undefined} />);

    expect(screen.getByText('استوری یک')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'استوری بعدی' }));

    expect(screen.getByText('استوری دو')).toBeInTheDocument();
  });

  it('jumps to a specific story when a progress segment is clicked', async () => {
    const user = userEvent.setup();
    render(<StoryViewer items={sampleItems} open onClose={() => undefined} />);

    const segments = screen.getAllByRole('button', { name: /برو به استوری/ });
    await user.click(segments[2]);

    expect(screen.queryByText('استوری یک')).not.toBeInTheDocument();
    expect(screen.queryByText('استوری دو')).not.toBeInTheDocument();
  });

  it('wraps to the last story when going previous from the first', async () => {
    const user = userEvent.setup();
    render(<StoryViewer items={sampleItems} open onClose={() => undefined} />);

    await user.click(screen.getByRole('button', { name: 'استوری قبلی' }));

    expect(screen.queryByText('استوری یک')).not.toBeInTheDocument();
  });

  it('wraps to the first story when going next from the last', async () => {
    const user = userEvent.setup();
    render(<StoryViewer items={sampleItems} open startIndex={2} onClose={() => undefined} />);

    expect(screen.queryByText('استوری یک')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'استوری بعدی' }));

    expect(screen.getByText('استوری یک')).toBeInTheDocument();
  });

  it('toggles play/pause when the space key is pressed', () => {
    render(<StoryViewer items={sampleItems} open onClose={() => undefined} />);

    fireEvent.keyDown(document, { key: ' ' });
  });

  it('calls onIndexChange whenever the current index changes', async () => {
    const onIndexChange = jest.fn();
    const user = userEvent.setup();
    render(
      <StoryViewer
        items={sampleItems}
        open
        onClose={() => undefined}
        onIndexChange={onIndexChange}
      />,
    );

    expect(onIndexChange).toHaveBeenLastCalledWith(0);

    await user.click(screen.getByRole('button', { name: 'استوری بعدی' }));

    expect(onIndexChange).toHaveBeenLastCalledWith(1);
  });
});
