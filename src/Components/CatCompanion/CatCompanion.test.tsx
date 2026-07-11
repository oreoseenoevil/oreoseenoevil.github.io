import { render } from '@testing-library/react';
import { CatCompanion } from '.';

const mockMatchMedia = (matcher: (query: string) => boolean) =>
  ((query: string) => ({
    matches: matcher(query),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false
  })) as unknown as typeof window.matchMedia;

const originalMatchMedia = window.matchMedia;

afterEach(() => {
  window.matchMedia = originalMatchMedia;
});

it('mounts and unmounts without crashing', () => {
  const { unmount } = render(<CatCompanion />);
  expect(document.getElementById('jtc')).toBeInTheDocument();
  unmount();
  expect(document.getElementById('jtc')).toBeNull();
});

it('renders nothing under prefers-reduced-motion', () => {
  window.matchMedia = mockMatchMedia((query) => query.includes('prefers-reduced-motion'));
  const { unmount } = render(<CatCompanion />);
  expect(document.getElementById('jtc')).toBeNull();
  unmount();
});

it('renders nothing on touch-only devices', () => {
  window.matchMedia = mockMatchMedia((query) => query.includes('hover:none'));
  const { unmount } = render(<CatCompanion />);
  expect(document.getElementById('jtc')).toBeNull();
  unmount();
});
