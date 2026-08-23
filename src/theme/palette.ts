import { PaletteOptions } from '@mui/material/styles';

export const getPalette = (mode: 'light' | 'dark'): PaletteOptions => {
  const isDark = mode === 'dark';

  return {
    mode,
    primary: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#06b6d4',
      light: '#22d3ee',
      dark: '#0891b2',
      contrastText: isDark ? '#050907' : '#ffffff',
    },
    background: {
      default: isDark ? '#050907' : '#f6fbf8',
      paper: isDark ? 'rgba(10, 18, 14, 0.75)' : 'rgba(255, 255, 255, 0.8)',
    },
    text: {
      primary: isDark ? '#f8fafc' : '#0f172a',
      secondary: isDark ? '#94a3b8' : '#475569',
    },
    divider: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
  };
};
