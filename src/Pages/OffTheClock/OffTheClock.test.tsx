import { render, screen } from '@testing-library/react';
import { OffTheClock } from '.';

it('should render the off-the-clock section header, checklist and sticky-notes', () => {
  const { container } = render(<OffTheClock />);
  expect(container.firstChild).toBeVisible();
  expect(screen.getByText(/06 \/ off the clock/i)).toBeInTheDocument();
  expect(screen.getByText(/\/\/ when I'm not debugging production/i)).toBeInTheDocument();
  expect(screen.getByText('when-not-debugging.md')).toBeInTheDocument();
  expect(screen.getByText('Designing a SaaS product')).toBeInTheDocument();
  expect(screen.getByText('Experimenting with new tools')).toBeInTheDocument();
  expect(screen.getByText('Improving overly complicated workflows')).toBeInTheDocument();
  expect(screen.getByText('Gaming')).toBeInTheDocument();
  expect(screen.getByText(/Overthinking product names & domain availability/)).toBeInTheDocument();
  expect(screen.getByText(/\/\/ still running…/)).toBeInTheDocument();
  expect(screen.getByText('every good product starts as an over-engineered side project.')).toBeInTheDocument();
  expect(screen.getByText('yes, the .com was already taken. it’s always taken.')).toBeInTheDocument();
  expect(screen.getByText('caffeinated, mostly stable')).toBeInTheDocument();
});
