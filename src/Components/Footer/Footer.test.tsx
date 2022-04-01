import { render, screen } from '@testing-library/react';
import { Footer } from '.';

it('should find author value', () => {
  const { container } = render(<Footer />);
  expect(container.firstChild).toBeVisible();
  expect(screen.getByText(/jessie tarrosa/i)).toBeInTheDocument();
});
