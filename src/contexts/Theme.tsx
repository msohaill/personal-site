import { createContext, useEffect, useState } from 'react';

interface Theme {
  theme: string;
  toggleTheme?: () => void;
}

const defaultTheme = {
  theme: 'light',
};

const ThemeContext = createContext<Theme>(defaultTheme);

const ThemeProvider = ({ children }: { children: JSX.Element }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) setTheme('dark');
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export { ThemeProvider, ThemeContext };
