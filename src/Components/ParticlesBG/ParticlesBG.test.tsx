import { render } from '@testing-library/react';
import { ParticlesBG } from './ParticlesBG';

it('should render without crashing', () => {
  const { container } = render(<ParticlesBG />);

  expect(container.firstChild).toHaveAttribute('id', 'tsparticles');
});
