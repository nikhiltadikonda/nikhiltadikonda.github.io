/**
 * Design Tokens: Typography, Gradients, Shadows, and Glassmorphism Recipes
 * Terminal-Like Matrix Green Palette
 */

export const MONO_FONT_STACK = '"SF Mono", Menlo, Monaco, "Courier New", monospace';

export const typographyTokens = {
  fontFamily: [
    'Plus Jakarta Sans',
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    'sans-serif',
  ].join(','),
  fontFamilyMono: MONO_FONT_STACK,
};

export const gradientTokens = {
  primary: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  primaryHover: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
  accent: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
  accentLight: 'linear-gradient(135deg, #059669 0%, #0891b2 100%)',
  heroDark: 'linear-gradient(135deg, #ffffff 20%, #4ade80 60%, #06b6d4 100%)',
  heroLight: 'linear-gradient(135deg, #0f172a 20%, #059669 60%, #0891b2 100%)',
  avatarHalo: 'conic-gradient(from 0deg, #10b981, #06b6d4, #34d399, #10b981)',
};

export const glassTokens = {
  dark: {
    cardBg: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
    cardBorder: 'rgba(255, 255, 255, 0.12)',
    cardShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.6), inset 0 1px 1px 0 rgba(255, 255, 255, 0.35)',
    dockBg: 'rgba(7, 12, 10, 0.75)',
    dockBgScrolled: 'rgba(7, 12, 10, 0.88)',
    dockBorder: 'rgba(255, 255, 255, 0.12)',
    dockShadow: '0 12px 32px -8px rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)',
    pillBg: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.03) 100%)',
    pillBorder: 'rgba(255, 255, 255, 0.15)',
    pillShadow: '0 4px 12px rgba(0, 0, 0, 0.25), inset 0 1px 1px 0 rgba(255, 255, 255, 0.4)',
  },
  light: {
    cardBg: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(248, 250, 252, 0.65) 100%)',
    cardBorder: 'rgba(255, 255, 255, 0.85)',
    cardShadow: '0 16px 36px -10px rgba(0, 0, 0, 0.06), inset 0 1px 2px 0 rgba(255, 255, 255, 1)',
    dockBg: 'rgba(255, 255, 255, 0.75)',
    dockBgScrolled: 'rgba(255, 255, 255, 0.9)',
    dockBorder: 'rgba(255, 255, 255, 0.85)',
    dockShadow: '0 12px 32px -8px rgba(0, 0, 0, 0.08), inset 0 1px 2px 0 rgba(255, 255, 255, 1)',
    pillBg: 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(241, 245, 249, 0.75) 100%)',
    pillBorder: 'rgba(255, 255, 255, 0.9)',
    pillShadow: '0 4px 14px rgba(0, 0, 0, 0.06), inset 0 1px 2px 0 rgba(255, 255, 255, 1)',
  },
};
