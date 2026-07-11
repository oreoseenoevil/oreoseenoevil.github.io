import { fireEvent, render, screen } from 'test-utils';
import { NotFoundOverlay } from '.';

const noop = () => undefined;

it('renders nothing when closed', () => {
  const { container } = render(<NotFoundOverlay open={false} onClose={noop} />);

  expect(container.firstChild).toBeNull();
});

it('renders the 404 card content when open', () => {
  render(<NotFoundOverlay open onClose={noop} />);

  expect(screen.getByRole('dialog')).toBeVisible();
  expect(screen.getByText('404')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'This page wandered off to chase the cat.' })).toBeInTheDocument();
  expect(screen.getByText('It’s not you, it’s a missing route. The cat regrets nothing.')).toBeInTheDocument();
  expect(screen.getByText(/\$ cd \//)).toBeInTheDocument();
  expect(screen.getByText('# go home before it knocks something off the table')).toBeInTheDocument();
});

it('closes from the button, the scrim, and the Escape key — but not card clicks', () => {
  const onClose = jest.fn();
  const { container } = render(<NotFoundOverlay open onClose={onClose} />);

  fireEvent.click(screen.getByRole('button', { name: 'Take me home →' }));
  expect(onClose).toHaveBeenCalledTimes(1);

  fireEvent.click(container.firstChild as Element);
  expect(onClose).toHaveBeenCalledTimes(2);

  fireEvent.keyDown(document, { key: 'Escape' });
  expect(onClose).toHaveBeenCalledTimes(3);

  fireEvent.click(screen.getByRole('dialog'));
  expect(onClose).toHaveBeenCalledTimes(3);
});

it('tracks the cursor with the pupils only while open', () => {
  const { unmount } = render(<NotFoundOverlay open onClose={noop} />);

  window.innerWidth = 1000;
  window.innerHeight = 500;
  fireEvent.mouseMove(window, { clientX: 250, clientY: 400 });

  const dialog = screen.getByRole('dialog');
  const pupils = dialog.querySelectorAll('span[style]');
  expect(pupils.length).toBeGreaterThan(0);
  pupils.forEach((pupilEl) => {
    const { style } = pupilEl as HTMLElement;
    expect(style.left).toBe('25%');
    expect(style.top).toBe('80%');
    expect(style.transform).toBe('translate(-25%, -80%)');
  });

  unmount();
});
