import React from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Stack,
  Chip,
  styled,
} from '@mui/material';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import CloudQueueRoundedIcon from '@mui/icons-material/CloudQueueRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import profile from '../images/profile.png';
import gcp from '../images/languages/gcp.svg';
import QuoteCard from '../components/QuoteCard';
import GradientText from '../components/common/GradientText';
import { MONO_FONT_STACK } from '../theme/tokens';

/* Styled Sub-components to eliminate inline CSS clutter */

const SectionWrapper = styled('section')(({ theme }) => ({
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(14),
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(14),
    paddingBottom: theme.spacing(16),
  },
}));

const HeroContentGrid = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column-reverse',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(6),
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    gap: theme.spacing(8),
  },
}));

const StatusPill = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing(1.2),
    padding: '6px 16px',
    borderRadius: 9999,
    background: isDark ? 'rgba(16, 185, 129, 0.12)' : 'rgba(16, 185, 129, 0.08)',
    border: `1px solid ${isDark ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.25)'}`,
    boxShadow: isDark
      ? 'inset 0 1px 1px rgba(255, 255, 255, 0.2)'
      : '0 2px 8px rgba(16, 185, 129, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.8)',
    marginBottom: theme.spacing(3),
  };
});

const StatusText = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#34d399' : '#059669',
  fontWeight: 700,
  fontSize: '0.85rem',
  letterSpacing: '0.02em',
}));

const Headline = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  lineHeight: 1.15,
  marginBottom: theme.spacing(2),
  fontSize: '2.5rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '3.25rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '3.75rem',
  },
}));

const ExpertiseChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'chipColor',
})<{ chipColor?: 'green' | 'teal' | 'cyan' }>(({ theme, chipColor = 'green' }) => {
  const isDark = theme.palette.mode === 'dark';
  const colorMap = {
    green: {
      bg: isDark ? 'rgba(16, 185, 129, 0.12)' : 'rgba(16, 185, 129, 0.08)',
      border: isDark ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.25)',
      icon: '#10b981',
    },
    teal: {
      bg: isDark ? 'rgba(20, 184, 166, 0.12)' : 'rgba(20, 184, 166, 0.08)',
      border: isDark ? 'rgba(20, 184, 166, 0.35)' : 'rgba(20, 184, 166, 0.25)',
      icon: '#14b8a6',
    },
    cyan: {
      bg: isDark ? 'rgba(6, 182, 212, 0.12)' : 'rgba(6, 182, 212, 0.08)',
      border: isDark ? 'rgba(6, 182, 212, 0.3)' : 'rgba(6, 182, 212, 0.25)',
      icon: '#06b6d4',
    },
  };

  return {
    height: 32,
    borderRadius: 9999,
    background: colorMap[chipColor].bg,
    borderColor: colorMap[chipColor].border,
    color: isDark ? '#e2e8f0' : '#1e293b',
    fontFamily: MONO_FONT_STACK,
    fontWeight: 600,
    fontSize: '0.8rem',
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
    '& .MuiChip-icon': {
      marginLeft: '8px',
      marginRight: '-4px',
      color: `${colorMap[chipColor].icon} !important`,
      fontSize: '16px !important',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    '& .MuiChip-label': {
      paddingLeft: 8,
      paddingRight: 12,
      display: 'flex',
      alignItems: 'center',
    },
    '&:hover': {
      transform: 'translateY(-1px)',
    },
  };
});

const BioText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '1.05rem',
  lineHeight: 1.7,
  marginBottom: theme.spacing(4),
  maxWidth: 620,
  [theme.breakpoints.up('md')]: {
    fontSize: '1.15rem',
  },
}));

const AvatarContainer = styled(Box)(() => ({
  flex: 0.9,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
}));

const AvatarImage = styled('img')(({ theme }) => ({
  width: 220,
  height: 220,
  borderRadius: '50%',
  display: 'block',
  objectFit: 'cover',
  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)',
  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  '&:hover': {
    transform: 'scale(1.04)',
  },
  [theme.breakpoints.up('sm')]: {
    width: 260,
    height: 260,
  },
  [theme.breakpoints.up('md')]: {
    width: 310,
    height: 310,
  },
}));

const AvatarPillBadge = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    marginTop: theme.spacing(4),
    padding: '10px 20px',
    borderRadius: 9999,
    background: isDark ? 'rgba(8, 14, 10, 0.75)' : 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(20px saturate(180%))',
    WebkitBackdropFilter: 'blur(20px saturate(180%))',
    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.9)'}`,
    boxShadow: isDark
      ? '0 12px 28px -6px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.3)'
      : '0 8px 24px -4px rgba(0, 0, 0, 0.08), inset 0 1px 2px rgba(255, 255, 255, 1)',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
  };
});

/* Main About Component */

export const About: React.FC = () => {
  return (
    <SectionWrapper id="about">
      <Container maxWidth="lg">
        <HeroContentGrid>
          {/* Left Column: Bio & Hero Intro */}
          <Box sx={{ flex: 1.2, width: '100%' }}>
            {/* Status Pill Badge */}
            <StatusPill>
              <span className="live-indicator" />
              <StatusText variant="caption">
                Available for impactful engineering roles
              </StatusText>
            </StatusPill>

            {/* Main Headline */}
            <Headline variant="h1">
              Hello, I'm <GradientText variantType="hero">Nikhil Tadikonda!</GradientText>
            </Headline>

            {/* Expertise Chips */}
            <Stack direction="row" spacing={1.2} useFlexGap sx={{ flexWrap: 'wrap', alignItems: 'center', mb: 3 }}>
              <ExpertiseChip
                chipColor="green"
                variant="outlined"
                icon={<CodeRoundedIcon />}
                label="Full Stack Developer"
              />
              <ExpertiseChip
                chipColor="teal"
                variant="outlined"
                icon={<CloudQueueRoundedIcon />}
                label="Cloud & DevOps"
              />
              <ExpertiseChip
                chipColor="cyan"
                variant="outlined"
                icon={<DevicesRoundedIcon />}
                label="Cross-Platform Systems"
              />
            </Stack>

            {/* Bio */}
            <BioText variant="body1">
              I engineer full-stack enterprise applications tailored for distributed, hybrid cloud systems. Passionate about scalable architecture, mission-critical reliability, and fluid user experiences that deliver measurable impact.
            </BioText>

            {/* Quote of the Moment Widget */}
            <QuoteCard />
          </Box>

          {/* Right Column: Glowing Avatar Showcase */}
          <AvatarContainer>
            <Box className="avatar-halo-container">
              <Box className="avatar-halo-ring">
                <AvatarImage
                  src={profile}
                  alt="Nikhil Tadikonda"
                />
              </Box>
            </Box>

            {/* Floating Glass Pill under Avatar */}
            <AvatarPillBadge>
              <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                🚀 Crafting modern digital experiences
              </Typography>
            </AvatarPillBadge>
          </AvatarContainer>
        </HeroContentGrid>
      </Container>
    </SectionWrapper>
  );
};

export default About;
