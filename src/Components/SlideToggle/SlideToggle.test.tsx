import { render, fireEvent, screen } from '@testing-library/react';

import { SlideToggle } from '.';
import styles from './SlideToggle.module.scss';

let mockOnChangeFunction: (value: boolean) => void;

const TestElement = () => <div data-testid="test-element" />;

beforeEach(() => {
  mockOnChangeFunction = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

it('has SlideToggle_track_active class if active', () => {
  const { container } = render(<SlideToggle value />);
  expect(container.firstChild).toHaveClass('SlideToggle_track_active');
});

it('does not have SlideToggle_track_active class if not active', () => {
  const { container } = render(<SlideToggle value={false} />);
  expect(container.firstChild).not.toHaveClass('SlideToggle_track_active');
});

it('has right_to_left class name if rightToLeft prop is true', () => {
  const { container } = render(<SlideToggle rightToLeft />);
  expect(container.firstChild).toHaveClass(styles.right_to_left);
});

it('calls onChange handler when clicked', () => {
  const defaultValue = false;
  const { container } = render(<SlideToggle value={defaultValue} onChange={mockOnChangeFunction} />);
  const button = container.firstChild;
  fireEvent.click(button!);
  expect(mockOnChangeFunction).toHaveBeenCalledTimes(1);
});

it('calls onChange handler with correct parameter', () => {
  const defaultValue = false;
  const { container } = render(<SlideToggle value={defaultValue} onChange={mockOnChangeFunction} />);
  const button = container.firstChild;
  fireEvent.click(button!);
  expect(mockOnChangeFunction).toHaveBeenCalledWith(!defaultValue);
});

it('adds additional className if passed as a prop', () => {
  const className = 'my-test-classname';
  const { container } = render(<SlideToggle className={className} />);
  expect(container.firstChild).toHaveClass(className);
});

it('adds children correctly', () => {
  render(
    <SlideToggle>
      <TestElement />
    </SlideToggle>
  );

  expect(screen.queryByTestId('test-element')).toBeVisible();
});
