import React from 'react';
import { Box, Typography } from '@mui/material';
import { Skill } from '../types';
import { useColorMode } from '../context/ThemeContext';
import { MONO_FONT_STACK } from '../theme/tokens';

interface SkillBadgeProps {
  skill: Skill;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({ skill }) => {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';

  return (
    <Box
      className="liquid-pill"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.5,
        px: 2.2,
        py: 1.2,
        borderRadius: '9999px',
        cursor: 'default',
      }}
    >
      <Box
        component="img"
        src={skill.img}
        alt={skill.name}
        sx={{
          width: 24,
          height: 24,
          objectFit: 'contain',
          filter: isDark ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' : 'none',
        }}
      />
      <Typography
        variant="body2"
        sx={{
          fontFamily: MONO_FONT_STACK,
          fontWeight: 600,
          color: isDark ? '#f1f5f9' : '#1e293b',
          fontSize: '0.88rem',
          letterSpacing: '-0.01em',
        }}
      >
        {skill.name}
      </Typography>
    </Box>
  );
};

export default SkillBadge;
