import { render } from '@testing-library/react';
import { Cat } from './Cat';

it('should render without crashing', () => {
  const { container } = render(<Cat />);
  expect(container.firstChild).toBeVisible();
});
