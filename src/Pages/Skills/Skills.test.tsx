import { render, screen } from 'test-utils';
import { Skills } from '.';

it('should render the toolbox section header and icon rail', () => {
  const { container } = render(<Skills />);
  expect(container.querySelector('#skills')).toBeInTheDocument();
  expect(screen.getByText(/04 \/ toolbox/i)).toBeInTheDocument();
  expect(screen.getByText(/\$ ls ~\/toolbox/)).toBeInTheDocument();

  const logos = screen.getAllByRole('img');
  expect(logos).toHaveLength(12);
  expect(screen.getByAltText('React')).toBeInTheDocument();
  expect(screen.getByAltText('Git')).toBeInTheDocument();
});

it('should render all five skill cards with their chips', () => {
  render(<Skills />);
  expect(screen.getByText('01 · PRODUCT ENGINEERING')).toBeInTheDocument();
  expect(screen.getByText('02 · FRONTEND SYSTEMS')).toBeInTheDocument();
  expect(screen.getByText('03 · BACKEND & DATA')).toBeInTheDocument();
  expect(screen.getByText('04 · CLOUD & DEVOPS')).toBeInTheDocument();
  expect(screen.getByText('05 · PRODUCT CAPABILITIES')).toBeInTheDocument();
  expect(screen.getByText('tRPC')).toBeInTheDocument();
  expect(screen.getByText('shadcn/ui')).toBeInTheDocument();
  expect(screen.getByText('BullMQ')).toBeInTheDocument();
  expect(screen.getByText('DigitalOcean')).toBeInTheDocument();
  expect(screen.getByText('Performance optimization')).toBeInTheDocument();
});
