import { render, screen } from 'test-utils';
import { Navbar } from './Navbar';

it('render without crashing', () => {
  render(<Navbar />);

  const logo = screen.getByRole('link', {
    name: 'JT.'
  });

  expect(logo).toBeInTheDocument();

  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('About Me')).toBeInTheDocument();
  expect(screen.getByText('Projects')).toBeInTheDocument();

  const switchButton = screen.getByRole('button');
  expect(switchButton.firstChild?.firstChild?.nodeName).toBe('svg');
});
