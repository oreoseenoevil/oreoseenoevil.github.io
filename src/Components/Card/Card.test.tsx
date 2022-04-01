import { render, screen } from '@testing-library/react';
import { Card } from './Card';

it('should accept props name when value is passed', () => {
  const value = 'Value';
  render(<Card name={value} />);
  expect(screen.getByText(value)).toBeInTheDocument();
});
