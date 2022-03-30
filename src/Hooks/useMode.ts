import { ModeContext } from 'Context/Mode';
import { useContext } from 'react';

export const useMode = () => {
  const context = useContext(ModeContext);

  if (!context) {
    throw new Error('useMode must be used within a ModeContextProvider');
  }

  return context;
};
