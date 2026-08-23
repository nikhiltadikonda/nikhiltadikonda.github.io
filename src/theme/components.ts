import { Components, Theme } from '@mui/material/styles';
import { glassTokens, gradientTokens } from './tokens';

export const getComponentOverrides = (mode: 'light' | 'dark'): Components<Omit<Theme, 'components'>> => {
  const isDark = mode === 'dark';
  const glass = isDark ? glassTokens.dark : glassTokens.light;

  return {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: isDark ? '#050907' : '#f6fbf8',
          color: isDark ? '#f8fafc' : '#0f172a',
          overflowX: 'hidden',
          scrollbarColor: isDark
            ? 'rgba(255, 255, 255, 0.2) transparent'
            : 'rgba(0, 0, 0, 0.2) transparent',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: isDark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.35)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
          padding: '10px 24px',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&:active': {
            transform: 'scale(0.97)',
          },
        },
        contained: {
          background: gradientTokens.primary,
          boxShadow: isDark
            ? '0 8px 24px -4px rgba(16, 185, 129, 0.4), inset 0 1px 1px 0 rgba(255, 255, 255, 0.4)'
            : '0 8px 20px -4px rgba(16, 185, 129, 0.4), inset 0 1px 1px 0 rgba(255, 255, 255, 0.8)',
          border: isDark ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.4)',
          color: '#ffffff',
          '&:hover': {
            background: gradientTokens.primaryHover,
            boxShadow: isDark
              ? '0 12px 30px -4px rgba(16, 185, 129, 0.6), inset 0 1px 1px 0 rgba(255, 255, 255, 0.5)'
              : '0 12px 28px -4px rgba(16, 185, 129, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          background: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(16px)',
          borderColor: isDark ? 'rgba(16, 185, 129, 0.4)' : 'rgba(16, 185, 129, 0.35)',
          boxShadow: isDark
            ? 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)'
            : '0 4px 12px rgba(0, 0, 0, 0.04), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9)',
          color: isDark ? '#f8fafc' : '#475569',
          '&:hover': {
            background: isDark ? 'rgba(16, 185, 129, 0.12)' : 'rgba(16, 185, 129, 0.08)',
            borderColor: '#10b981',
            boxShadow: isDark
              ? '0 8px 24px -4px rgba(16, 185, 129, 0.25), inset 0 1px 1px 0 rgba(255, 255, 255, 0.3)'
              : '0 8px 20px -4px rgba(16, 185, 129, 0.2), inset 0 1px 1px 0 rgba(255, 255, 255, 1)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: glass.cardBg,
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderRadius: 20,
          border: `1px solid ${glass.cardBorder}`,
          boxShadow: glass.cardShadow,
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: 9999,
          fontWeight: 600,
          boxShadow: isDark
            ? 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)'
            : '0 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9)',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
  };
};
