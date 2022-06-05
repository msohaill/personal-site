import { createContext, useLayoutEffect, useState } from 'react';

interface Theme {
  theme: string;
  toggleTheme?: () => void;
}

const defaultTheme = {
  theme: 'light',
};

const ThemeContext = createContext<Theme>(defaultTheme);

const ThemeProvider = ({ children }: { children: JSX.Element }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'light');

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      localStorage.setItem('theme', prevTheme === 'light' ? 'dark' : 'light');
      return prevTheme === 'light' ? 'dark' : 'light';
    });
  };

  useLayoutEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export { ThemeProvider, ThemeContext };
