import React from 'react';
import { Box, BoxProps } from '@mui/material';

export interface GlassPillProps extends BoxProps {
  active?: boolean;
  clickable?: boolean;
  children: React.ReactNode;
}

export const GlassPill: React.FC<GlassPillProps> = ({
  active = false,
  clickable = false,
  children,
  className = '',
  sx,
  ...rest
}) => {
  return (
    <Box
      className={`liquid-pill ${active ? 'active' : ''} ${className}`}
      sx={{
        cursor: clickable ? 'pointer' : 'default',
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default GlassPill;

