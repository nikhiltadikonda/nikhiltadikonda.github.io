import { createTheme, Theme } from '@mui/material/styles';
import { getPalette } from './palette';
import { getComponentOverrides } from './components';
import { typographyTokens } from './tokens';

export const getAppTheme = (mode: 'light' | 'dark'): Theme => {
  return createTheme({
    palette: getPalette(mode),
    typography: {
      fontFamily: typographyTokens.fontFamily,
      h1: { fontWeight: 800, letterSpacing: '-0.03em' },
      h2: { fontWeight: 800, letterSpacing: '-0.025em' },
      h3: { fontWeight: 700, letterSpacing: '-0.02em' },
      h4: { fontWeight: 700, letterSpacing: '-0.02em' },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      button: {
        textTransform: 'none',
        fontWeight: 600,
        letterSpacing: '0.01em',
      },
    },
    shape: {
      borderRadius: 16,
    },
    components: getComponentOverrides(mode),
  });
};

export const theme = getAppTheme('dark');
export default theme;
export * from './tokens';
export * from './palette';
export * from './components';

