import { fireEvent, render, screen } from 'test-utils';
import { Footer } from '.';

const noop = () => undefined;

it('renders the brand blurb, quip, and copyright', () => {
  const { container } = render(<Footer onOpen404={noop} />);

  expect(container.firstChild).toBeVisible();
  expect(
    screen.getByText('Serious software, minus the boring parts. Building Atrium OS and open to ambitious products.')
  ).toBeInTheDocument();
  expect(screen.getByText('// built at 2am, refactored at noon')).toBeInTheDocument();
  expect(screen.getByText(/© 2026 Jessie Tarrosa · made in the Philippines, deployed worldwide/)).toBeInTheDocument();
});

it('links the sitemap to the section anchors', () => {
  render(<Footer onOpen404={noop} />);

  expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute('href', '#work');
  expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '#about');
  expect(screen.getByRole('link', { name: 'Experience' })).toHaveAttribute('href', '#experience');
  expect(screen.getByRole('link', { name: 'Skills' })).toHaveAttribute('href', '#skills');
  expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact');
  expect(screen.getByRole('link', { name: 'back to top ↑' })).toHaveAttribute('href', '#top');
});

it('links elsewhere targets with rel noopener', () => {
  render(<Footer onOpen404={noop} />);

  const github = screen.getByRole('link', { name: 'GitHub ↗' });
  const linkedin = screen.getByRole('link', { name: 'LinkedIn ↗' });
  const codewars = screen.getByRole('link', { name: 'Codewars ↗' });

  expect(github).toHaveAttribute('href', 'https://github.com/oreoseenoevil/');
  expect(linkedin).toHaveAttribute('href', 'https://www.linkedin.com/in/jessiedev/');
  expect(codewars).toHaveAttribute('href', 'https://www.codewars.com/users/oreoseenoevil');
  [github, linkedin, codewars].forEach((link) => {
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
  expect(screen.getByRole('link', { name: 'app.creator@jessiet.dev' })).toHaveAttribute(
    'href',
    'mailto:app.creator@jessiet.dev'
  );
});

it('opens the 404 overlay from the lost link without navigating', () => {
  const onOpen404 = jest.fn();
  render(<Footer onOpen404={onOpen404} />);

  const lost = screen.getByRole('link', { name: 'lost? there’s a 404 for that' });
  fireEvent.click(lost);

  expect(onOpen404).toHaveBeenCalledTimes(1);
  expect(window.location.hash).not.toBe('#lost');
});
