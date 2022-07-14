import { createContext, useLayoutEffect, useState } from 'react';

interface Theme {
  theme: string;
  toggleTheme?: () => void;
}

const defaultTheme = {
  theme: 'light',
};

const ThemeContext = createContext<Theme>(defaultTheme);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useLayoutEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark && !localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export { ThemeProvider, ThemeContext };
