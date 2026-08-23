import React from 'react';
import { Box, Typography } from '@mui/material';
import { useColorMode } from '../../context/ThemeContext';

export interface SectionHeaderProps {
  badgeIcon?: React.ReactNode;
  badgeText: string;
  title: string;
  subtitle?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badgeIcon,
  badgeText,
  title,
  subtitle,
}) => {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';

  return (
    <Box className="section-title-wrap">
      <Box className="section-pill-tag">
        {badgeIcon}
        {badgeText}
      </Box>
      <Typography variant="h2" className="section-title">
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="body1"
          sx={{
            color: isDark ? '#94a3b8' : '#64748b',
            maxWidth: '560px',
            mx: 'auto',
            mt: { xs: 1, sm: 1.5 },
            px: { xs: 1, sm: 0 },
            fontSize: { xs: '0.88rem', sm: '0.96rem', md: '1.02rem' },
            lineHeight: 1.55,
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default SectionHeader;

