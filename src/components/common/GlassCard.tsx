import React from 'react';
import { Card, CardProps } from '@mui/material';

export interface GlassCardProps extends CardProps {
  children: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', sx, ...rest }) => {
  return (
    <Card
      className={`liquid-card ${className}`}
      sx={{
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Card>
  );
};

export default GlassCard;

