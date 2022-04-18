import { render, screen, waitFor } from 'test-utils';
import userEvent from '@testing-library/user-event';
import { App } from '.';

it('renders with out crashing', () => {
  const { container } = render(<App />);

  expect(container.firstChild).toBeTruthy();
});

it('switch theme to dark and light mode', async () => {
  const { container } = render(<App />);

  const slideToggle = screen.getByTestId('slide-toggle');
  expect(slideToggle).toBeInTheDocument();

  expect(container.firstChild).not.toHaveClass('dark_mode');
  expect(container.firstChild).toHaveClass('light_mode');
  await waitFor(() => userEvent.click(slideToggle));

  await waitFor(() => expect(container.firstChild).not.toHaveClass('light_mode'));
  await waitFor(() => expect(container.firstChild).toHaveClass('dark_mode'));
});
