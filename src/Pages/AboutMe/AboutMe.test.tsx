import { render, screen } from 'test-utils';
import { AboutMe } from '.';

it('renders the about section with heading, callout, photo and fact table', () => {
  const { container } = render(<AboutMe />);

  expect(container.firstChild).toBeVisible();
  expect(
    screen.getByRole('heading', { name: 'I turn complicated workflows into products that feel simple.' })
  ).toBeInTheDocument();
  expect(screen.getByText('01 / about')).toBeInTheDocument();
  expect(screen.getByText('My favorite feature is the one users never need explained.')).toBeInTheDocument();
  expect(screen.getByAltText('Jessie Tarrosa')).toBeInTheDocument();
  expect(screen.getByText('jessie.jpg — preview')).toBeInTheDocument();
  expect(screen.getByText('EXPERIENCE')).toBeInTheDocument();
  expect(screen.getByText('Philippines → working globally')).toBeInTheDocument();
});
