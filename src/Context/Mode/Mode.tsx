import { createContext, FC, useEffect, useMemo, useState } from 'react';

interface ModeContextProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  darkModeClass: string;
}

interface ModeContextProviderProps {
  children: React.ReactNode;
}

const getInitialDarkMode = () => {
  try {
    return localStorage.getItem('jt-dark') === '1';
  } catch (e) {
    // localStorage unavailable (private mode / SSR) — default to light
    return false;
  }
};

export const ModeContext = createContext<ModeContextProps>({
  darkMode: false,
  setDarkMode: () => {},
  darkModeClass: 'light_mode'
});

export const ModeContextProvider: FC<ModeContextProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);

  const darkModeClass = useMemo(() => {
    return darkMode ? 'dark_mode' : 'light_mode';
  }, [darkMode]);

  useEffect(() => {
    try {
      localStorage.setItem('jt-dark', darkMode ? '1' : '0');
    } catch (e) {
      // localStorage unavailable — theme just won't persist
    }
    document.documentElement.classList.toggle('jt-dark', darkMode);
  }, [darkMode]);

  const value = useMemo(() => {
    return {
      darkMode,
      setDarkMode,
      darkModeClass
    };
  }, [darkMode, darkModeClass]);

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
};
