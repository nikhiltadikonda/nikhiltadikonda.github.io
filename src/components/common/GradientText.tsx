import React from 'react';
import { Box, Typography, TypographyProps } from '@mui/material';
import { useColorMode } from '../../context/ThemeContext';
import { gradientTokens } from '../../theme/tokens';

interface GradientTextProps extends TypographyProps {
  variantType?: 'hero' | 'accent';
  children: React.ReactNode;
}

export const GradientText: React.FC<GradientTextProps> = ({
  variantType = 'accent',
  children,
  sx,
  ...rest
}) => {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';

  let gradient = gradientTokens.accent;
  if (variantType === 'hero') {
    gradient = isDark ? gradientTokens.heroDark : gradientTokens.heroLight;
  } else {
    gradient = isDark ? gradientTokens.accent : gradientTokens.accentLight;
  }

  return (
    <Box
      component="span"
      sx={{
        background: gradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        display: 'inline-block',
      }}
    >
      <Typography component="span" sx={{ ...sx, fontWeight: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit' }} {...rest}>
        {children}
      </Typography>
    </Box>
  );
};

export default GradientText;

