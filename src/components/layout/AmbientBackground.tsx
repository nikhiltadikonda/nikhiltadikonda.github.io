import React from 'react';
import { Box } from '@mui/material';
import MatrixRain from './MatrixRain';

export const AmbientBackground: React.FC = () => {
  return (
    <>
      <Box className="ambient-background" aria-hidden="true" />
      <Box className="grid-mesh" aria-hidden="true" />
      <MatrixRain />
    </>
  );
};

export default AmbientBackground;
