import { render, screen } from 'test-utils';
import { Work } from '.';

it('should render the section header and the flagship Atrium OS card', () => {
  const { container } = render(<Work />);
  expect(container.firstChild).toBeVisible();
  expect(screen.getByText(/02 \/ selected work/i)).toBeInTheDocument();
  expect(screen.getByText(/\/\/ things that shipped/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Atrium OS' })).toBeInTheDocument();
  expect(screen.getByText('01 — FLAGSHIP')).toBeInTheDocument();
  expect(screen.getByText(/Founder · Product Design · Full-Stack Engineering/)).toBeInTheDocument();
  expect(screen.getByText('Dues, water/electric billing & accounting in one reconciled flow.')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /View Case Study/ })).toHaveAttribute('href', '#contact');
});

it('should render the faux product dashboard with stats and dues pills', () => {
  render(<Work />);
  expect(screen.getByText('app.atrium-os.com')).toBeInTheDocument();
  expect(screen.getByText('COLLECTIONS')).toBeInTheDocument();
  expect(screen.getByText('₱2.41M')).toBeInTheDocument();
  expect(screen.getByText('OCCUPANCY')).toBeInTheDocument();
  expect(screen.getByText('94.2%')).toBeInTheDocument();
  expect(screen.getAllByText('PAID')).toHaveLength(2);
  expect(screen.getByText('DUE')).toBeInTheDocument();
});

it('should render all seven flagship feature checks', () => {
  render(<Work />);
  const features = [
    'Resident portal',
    'Online dues & utility payments',
    'Budgeting & accounting',
    'Procurement & vendors',
    'Water & electricity billing',
    'Announcements & documents',
    'Multi-estate administration'
  ];
  features.forEach((feature) => {
    expect(screen.getByText(feature)).toBeInTheDocument();
  });
});

it('should render the Permission.io wide card and the two-up project cards', () => {
  render(<Work />);
  expect(screen.getByRole('heading', { name: 'Permission.io' })).toBeInTheDocument();
  expect(screen.getByAltText('Permission.io')).toBeInTheDocument();
  expect(screen.getByText('shipped wallet, daily-earn & auth across web apps')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Accenture · Solution.AI' })).toBeInTheDocument();
  expect(screen.getByAltText('Accenture Solution.AI')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Invenire · Review AI' })).toBeInTheDocument();
  expect(screen.getByAltText('S2Data')).toBeInTheDocument();
});

it('should render the also-shipped pill row with real external links', () => {
  render(<Work />);
  const landasia = screen.getByRole('link', { name: /Landasia · real-estate web/ });
  expect(landasia).toHaveAttribute('href', 'https://landasia.ph/');
  expect(landasia).toHaveAttribute('rel', 'noopener noreferrer');
  const pureDesire = screen.getByRole('link', { name: /Pure Desire · membership app/ });
  expect(pureDesire).toHaveAttribute('href', 'https://puredesire.org/');
  const github = screen.getByRole('link', { name: /more on GitHub/ });
  expect(github).toHaveAttribute('href', 'https://github.com/oreoseenoevil/');
});
