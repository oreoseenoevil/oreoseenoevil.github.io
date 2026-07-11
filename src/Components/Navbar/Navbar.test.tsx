import { render, screen, fireEvent } from 'test-utils';
import { Navbar } from './Navbar';

beforeEach(() => {
  localStorage.clear();
});

it('renders the logo, section links, status pill and CTA', () => {
  render(<Navbar />);

  const logo = screen.getByText('jessiet').closest('a');
  expect(logo).toHaveAttribute('href', '#top');

  expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute('href', '#work');
  expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '#about');
  expect(screen.getByRole('link', { name: 'Experience' })).toHaveAttribute('href', '#experience');
  expect(screen.getByRole('link', { name: 'Skills' })).toHaveAttribute('href', '#skills');
  expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact');

  expect(screen.getByText('currently building Atrium OS')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Let’s talk' })).toHaveAttribute('href', '#contact');
});

it('compacts when scrolled past 36px and expands back at the top', () => {
  render(<Navbar />);

  const nav = screen.getByRole('navigation');
  expect(nav.className).not.toContain('nav_scrolled');

  Object.defineProperty(window, 'scrollY', { value: 120, writable: true, configurable: true });
  fireEvent.scroll(window);
  expect(nav.className).toContain('nav_scrolled');

  Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });
  fireEvent.scroll(window);
  expect(nav.className).not.toContain('nav_scrolled');
});

it('toggles the dark mode glyph', () => {
  render(<Navbar />);

  const toggle = screen.getByRole('button', { name: 'Toggle dark mode' });
  expect(toggle).toHaveTextContent('☾');

  fireEvent.click(toggle);
  expect(toggle).toHaveTextContent('☀');

  fireEvent.click(toggle);
  expect(toggle).toHaveTextContent('☾');
});

it('opens the mobile menu and closes it when a link is clicked', () => {
  render(<Navbar />);

  expect(screen.queryByText('Contact →')).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Menu' }));
  expect(screen.getByText('Contact →')).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: 'Work' })).toHaveLength(2);

  fireEvent.click(screen.getByText('Contact →'));
  expect(screen.queryByText('Contact →')).not.toBeInTheDocument();
});
