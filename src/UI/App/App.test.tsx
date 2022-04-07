import { render, screen } from 'test-utils';
import userEvent from '@testing-library/user-event';
import { App } from '.';

it('renders with out crashing', () => {
  const { container } = render(<App />);

  expect(container.firstChild).toBeTruthy();
});

it('switch theme to dark and light mode', () => {
  const { container } = render(<App />);

  const slideToggle = screen.getByTestId('slide-toggle');
  expect(slideToggle).toBeInTheDocument();

  expect(container.firstChild).not.toHaveClass('dark_mode');
  expect(container.firstChild).toHaveClass('light_mode');
  userEvent.click(slideToggle);

  expect(container.firstChild).not.toHaveClass('light_mode');
  expect(container.firstChild).toHaveClass('dark_mode');
});
