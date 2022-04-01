import { render, screen } from '@testing-library/react';
import { LinkButton } from './LinkButton';

it('should render without crashing', () => {
  const TestElement = () => <div data-testid="test-element" />;
  const link = 'test';
  const { container } = render(
    <LinkButton link={link}>
      <TestElement />
    </LinkButton>
  );

  expect(screen.getByTestId('test-element')).toBeVisible();
  expect(container.firstChild).toHaveAttribute('href', link);
});

it('should accept props classname', () => {
  const className = 'my-custom-classname';
  const { container } = render(<LinkButton link="test" className={className} />);
  expect(container.firstChild).toHaveClass(className);
});
