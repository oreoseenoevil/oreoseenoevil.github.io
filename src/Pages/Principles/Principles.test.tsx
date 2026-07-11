import { render, screen } from '@testing-library/react';
import { Principles } from '.';

it('should render the principles section header and all four cards', () => {
  const { container } = render(<Principles />);
  expect(container.firstChild).toBeVisible();
  expect(screen.getByText(/05 \/ principles/i)).toBeInTheDocument();
  expect(screen.getByText(/\/\/ how I approach the work/i)).toBeInTheDocument();
  expect(screen.getByText('Build for clarity, not complexity')).toBeInTheDocument();
  expect(screen.getByText('Design systems that can grow')).toBeInTheDocument();
  expect(screen.getByText('Own the product, not just the ticket')).toBeInTheDocument();
  expect(screen.getByText('Make technical decisions understandable')).toBeInTheDocument();
  expect(screen.getByText(/The best systems explain themselves/)).toBeInTheDocument();
});
