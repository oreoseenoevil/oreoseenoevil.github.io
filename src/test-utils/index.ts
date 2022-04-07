import React from 'react';
import { render } from '@testing-library/react';
import { ModeContextProvider } from 'Context/Mode';

const renderWithContext = (ui: React.ReactElement, options?: any) =>
  render(ui, { wrapper: ModeContextProvider, ...options });

export * from '@testing-library/react';

export { renderWithContext as render };
