import { render, screen } from 'test-utils';
import { WindowChrome } from '.';

it('renders the title bar, body content and top slot', () => {
  const { container } = render(
    <WindowChrome title="jessie@atrium-os: ~/dev" topSlot={<span data-testid="perch" />}>
      <p>whoami</p>
    </WindowChrome>
  );

  expect(container.firstChild).toBeVisible();
  expect(screen.getByText('jessie@atrium-os: ~/dev')).toBeInTheDocument();
  expect(screen.getByText('whoami')).toBeInTheDocument();
  expect(screen.getByTestId('perch')).toBeInTheDocument();
});
