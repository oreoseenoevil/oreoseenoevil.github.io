import { createContext, FC, useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

interface ModeContextProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  darkModeClass: string;
}

interface ModeContextProviderProps {
  children: React.ReactNode;
}

export const ModeContext = createContext<ModeContextProps>({
  darkMode: false,
  setDarkMode: () => {},
  darkModeClass: 'light_mode'
});

export const ModeContextProvider: FC<ModeContextProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const darkModeClass = useMemo(() => {
    return darkMode ? 'dark_mode' : 'light_mode';
  }, [darkMode]);

  const isDarkPreferred = useMediaQuery({
    query: '(prefers-color-scheme: dark)'
  });

  useEffect(() => {
    let isActive = true;

    if (isDarkPreferred) {
      if (isActive) {
        setDarkMode(isDarkPreferred);
      }
    } else {
      setDarkMode(false);
    }

    return () => {
      isActive = false;
    };
  }, [isDarkPreferred]);

  const value = useMemo(() => {
    return {
      darkMode,
      setDarkMode,
      darkModeClass
    };
  }, [darkMode, darkModeClass]);

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
};
