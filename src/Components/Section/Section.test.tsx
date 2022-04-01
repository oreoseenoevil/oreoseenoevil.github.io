import { render, screen } from '@testing-library/react';
import { Section } from './Section';

it('render children when passed', () => {
  const TestElement = () => <div data-testid="test-element" />;
  render(
    <Section>
      <TestElement />
    </Section>
  );

  expect(screen.getByTestId('test-element')).toBeVisible();
});

it('should accept props classname and id', () => {
  const className = 'my-custom-classname';
  const id = 'my-custom-id';

  const { container } = render(<Section id={id} className={className} />);
  expect(container.firstChild).toHaveClass(className);
  expect(container.firstChild).toHaveAttribute('id', id);
});
