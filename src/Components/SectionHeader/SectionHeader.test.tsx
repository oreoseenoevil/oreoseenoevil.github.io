import { render, screen } from 'test-utils';
import { SectionHeader } from '.';

it('renders the numbered eyebrow and optional comment', () => {
  const { container } = render(<SectionHeader num="01" name="about" comment="// who's behind the commits" />);

  expect(container.firstChild).toBeVisible();
  expect(screen.getByText('01 / about')).toBeInTheDocument();
  expect(screen.getByText("// who's behind the commits")).toBeInTheDocument();
});

it('omits the comment when not provided', () => {
  render(<SectionHeader num="02" name="selected work" />);

  expect(screen.getByText('02 / selected work')).toBeInTheDocument();
  expect(screen.queryByText(/\/\//)).not.toBeInTheDocument();
});
