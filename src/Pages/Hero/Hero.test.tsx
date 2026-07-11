import { act, fireEvent, render, screen } from 'test-utils';
import { Hero } from '.';

it('renders the hero copy, terminal window and client marquee', () => {
  const { container } = render(<Hero />);

  expect(container.firstChild).toBeVisible();
  expect(screen.getByText('serious software')).toBeInTheDocument();
  expect(screen.getByText(/full-stack engineer & saas builder/i)).toBeInTheDocument();
  expect(screen.getByText('View My Work')).toBeInTheDocument();
  expect(screen.getByText('jessie@atrium-os: ~/dev')).toBeInTheDocument();
  expect(screen.getByText('whoami')).toBeInTheDocument();
  expect(screen.getByText('cat stack.txt')).toBeInTheDocument();
  expect(screen.getByText('status --now')).toBeInTheDocument();
  expect(screen.getByText(/available for ambitious products, complicated systems & good coffee/)).toBeInTheDocument();

  // marquee items are duplicated for the seamless loop (second row aria-hidden)
  expect(screen.getAllByText('TRUSTED WITH PRODUCTION')).toHaveLength(2);
  expect(screen.getAllByText('Permission.io')).toHaveLength(2);
});

it('rotates the terminal status every 2.6 seconds', () => {
  jest.useFakeTimers();
  render(<Hero />);

  expect(screen.getByText(/deploying atrium-os/)).toBeInTheDocument();

  act(() => {
    jest.advanceTimersByTime(2600);
  });
  expect(screen.getByText(/reviewing a pull request/)).toBeInTheDocument();

  act(() => {
    jest.advanceTimersByTime(2600);
  });
  expect(screen.getByText(/naming a new service/)).toBeInTheDocument();

  jest.useRealTimers();
});

it('wakes the cat when the cursor moves within range and settles back after', () => {
  render(<Hero />);
  const cat = screen.getByTestId('hero-cat');

  expect(cat.className).not.toContain('awake');

  // jsdom rects are zero-sized, so the cat center sits at (0, 0)
  fireEvent.mouseMove(window, { clientX: 10, clientY: 10 });
  expect(cat.className).toContain('awake');

  fireEvent.mouseMove(window, { clientX: 800, clientY: 800 });
  expect(cat.className).not.toContain('awake');
});
