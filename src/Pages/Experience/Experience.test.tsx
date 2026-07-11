import { render, screen } from 'test-utils';
import { Experience, experienceRoles } from '.';

it('renders the section header and all five roles', () => {
  const { container } = render(<Experience />);

  expect(container.querySelector('section#experience')).toBeInTheDocument();
  expect(screen.getByText('03 / experience')).toBeInTheDocument();
  expect(screen.getByText('// outcomes > responsibilities')).toBeInTheDocument();

  expect(experienceRoles).toHaveLength(5);
  expect(screen.getByText('Atrium OS')).toBeInTheDocument();
  expect(screen.getByText('S2Data')).toBeInTheDocument();
  expect(screen.getByText('Permission.io')).toBeInTheDocument();
  expect(screen.getByText('Accenture · Solution.AI')).toBeInTheDocument();
  expect(screen.getByText('Landasia')).toBeInTheDocument();
});

it('shows an accent "current" pill only on the two current roles', () => {
  render(<Experience />);

  expect(screen.getAllByText('current')).toHaveLength(2);
});

it('renders role titles, bullets and tech lines verbatim', () => {
  render(<Experience />);

  expect(screen.getByText('Founder, Product Designer & Full-Stack Engineer')).toBeInTheDocument();
  expect(screen.getAllByText('Full-Stack Developer')).toHaveLength(2);
  expect(screen.getByText('Full-Stack Developer · client engagement')).toBeInTheDocument();
  expect(screen.getByText('Web Developer')).toBeInTheDocument();

  expect(screen.getAllByText('›')).toHaveLength(14);
  expect(screen.getByText(/Designed schema, APIs & UI for dues, billing & accounting/)).toBeInTheDocument();
  expect(screen.getByText(/Built responsive property-listing experiences/)).toBeInTheDocument();

  expect(screen.getByText('Next.js · TypeScript · Node.js · PostgreSQL · Redis · AWS')).toBeInTheDocument();
  expect(screen.getByText('React · Node.js')).toBeInTheDocument();
});
