import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ColorScheme = 'blue' | 'emerald' | 'violet' | 'rose' | 'amber';

const COLOR_VARIABLES = {
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  emerald: {
    50: '#ecfdf5',
    100: '#d1fae5',
    500: '#059669',
    600: '#047857',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },
  violet: {
    50: '#f5f3ff',
    100: '#ede9fe',
    500: '#7c3aed',
    600: '#6d28d9',
    700: '#5b21b6',
    800: '#4c1d95',
    900: '#2e1065',
  },
  rose: {
    50: '#fff1f2',
    100: '#ffe4e6',
    500: '#e11d48',
    600: '#be123c',
    700: '#9f1239',
    800: '#881337',
    900: '#4c0519',
  },
  amber: {
    50: '#fffbeb',
    100: '#fef3c7',
    500: '#d97706',
    600: '#b45309',
    700: '#92400e',
    800: '#78350f',
    900: '#451a03',
  },
};

const applyColorScheme = (colorScheme: ColorScheme) => {
  const root = document.documentElement;
  const colors = COLOR_VARIABLES[colorScheme];

  Object.entries(colors).forEach(([shade, value]) => {
    root.style.setProperty(`--color-primary-${shade}`, value);
  });
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'system';
  });

  const [colorScheme, setColorScheme] = useState<ColorScheme>(() => {
    return (localStorage.getItem('colorScheme') as ColorScheme) || 'blue';
  });

  useEffect(() => {
    const root = document.documentElement;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const currentTheme = theme === 'system' ? systemTheme : theme;

    if (currentTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);

    // Watch for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        const newSystemTheme = mediaQuery.matches ? 'dark' : 'light';
        if (newSystemTheme === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  useEffect(() => {
    applyColorScheme(colorScheme);
    localStorage.setItem('colorScheme', colorScheme);
  }, [colorScheme]);

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const updateColorScheme = (newColorScheme: ColorScheme) => {
    setColorScheme(newColorScheme);
  };

  return {
    theme,
    setTheme: updateTheme,
    colorScheme,
    setColorScheme: updateColorScheme
  };
};