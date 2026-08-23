import React, { useState } from 'react';
import {
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Skeleton,
  styled,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import ForkRightRoundedIcon from '@mui/icons-material/ForkRightRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { GitHubRepo } from '../types';
import { useColorMode } from '../context/ThemeContext';
import GlassCard from './common/GlassCard';
import { MONO_FONT_STACK } from '../theme/tokens';
import { getLanguageColor } from '../helpers/languageColors';

interface ProjectCardProps {
  project: GitHubRepo;
}

/* ── Styled Sub-components: Tall Marquee Card ── */

const CardWrapper = styled(GlassCard)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    width: 280,
    minWidth: 280,
    height: 420,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 20,
    flexShrink: 0,
    background: isDark
      ? 'linear-gradient(145deg, rgba(14, 24, 18, 0.96) 0%, rgba(7, 13, 9, 0.98) 100%) !important'
      : 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(246, 250, 248, 0.95) 100%) !important',
    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.08)'}`,
    boxShadow: isDark
      ? '0 24px 48px -12px rgba(0, 0, 0, 0.8), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)'
      : '0 20px 40px -10px rgba(0, 0, 0, 0.08), inset 0 1px 2px 0 rgba(255, 255, 255, 1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      borderColor: isDark ? 'rgba(16, 185, 129, 0.4)' : 'rgba(16, 185, 129, 0.3)',
      boxShadow: isDark
        ? '0 28px 56px -12px rgba(0, 0, 0, 0.9), 0 0 20px rgba(16, 185, 129, 0.15), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)'
        : '0 24px 48px -10px rgba(0, 0, 0, 0.12), 0 0 16px rgba(16, 185, 129, 0.1), inset 0 1px 2px 0 rgba(255, 255, 255, 1)',
    },
    [theme.breakpoints.down('sm')]: {
      width: 260,
      minWidth: 260,
      height: 400,
    },
  };
});

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: 120,
  flexShrink: 0,
  background: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.04)',
}));

const StyledMedia = styled(CardMedia)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'}`,
})) as typeof CardMedia;

const StyledContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(1.75),
  paddingBottom: 0,
  overflow: 'hidden',
}));

const ProjectTitle = styled(Typography)(({ theme }) => ({
  fontFamily: MONO_FONT_STACK,
  fontWeight: 700,
  fontSize: '0.92rem',
  letterSpacing: '-0.02em',
  color: theme.palette.mode === 'dark' ? '#f8fafc' : '#0f172a',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  marginBottom: theme.spacing(0.5),
}));

const ProjectDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.78rem',
  lineHeight: 1.5,
  marginBottom: theme.spacing(1.25),
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  minHeight: '2.3em',
}));

/* Language pill with GitHub colored dot */
const LanguageRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  marginBottom: theme.spacing(1),
}));

const LanguageDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'dotColor',
})<{ dotColor: string }>(({ dotColor }) => ({
  width: 10,
  height: 10,
  borderRadius: '50%',
  backgroundColor: dotColor,
  flexShrink: 0,
  boxShadow: `0 0 6px ${dotColor}66`,
}));

const LanguageName = styled(Typography)(({ theme }) => ({
  fontFamily: MONO_FONT_STACK,
  fontSize: '0.72rem',
  fontWeight: 600,
  color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#475569',
}));

/* Stats row — stars, forks, watchers */
const StatsRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(1),
}));

const StatItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 3,
  fontFamily: MONO_FONT_STACK,
  color: theme.palette.mode === 'dark' ? '#94a3b8' : '#64748b',
}));

/* Topics row */
const TopicsRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 4,
  marginTop: 'auto',
  paddingBottom: theme.spacing(0.5),
}));

const TopicChip = styled(Chip)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    fontFamily: MONO_FONT_STACK,
    fontSize: '0.62rem',
    height: 18,
    fontWeight: 500,
    background: isDark ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.07)',
    color: isDark ? '#6ee7b7' : '#047857',
    border: `1px solid ${isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.15)'}`,
    '& .MuiChip-label': {
      padding: '0 6px',
    },
  };
});

const StyledActions = styled(CardActions)(({ theme }) => ({
  padding: theme.spacing(1.75),
  paddingTop: theme.spacing(0.5),
}));

const ViewButton = styled(Button)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 9999,
    fontFamily: MONO_FONT_STACK,
    fontSize: '0.72rem',
    fontWeight: 700,
    borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)',
    color: isDark ? '#f8fafc' : '#0f172a',
    background: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(12px)',
    boxShadow: isDark
      ? 'inset 0 1px 1px rgba(255, 255, 255, 0.25)'
      : '0 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 1px rgba(255, 255, 255, 1)',
    '&:hover': {
      borderColor: '#10b981',
      background: isDark
        ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(6, 182, 212, 0.2) 100%)'
        : 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)',
      boxShadow: isDark
        ? '0 4px 20px -2px rgba(16, 185, 129, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.4)'
        : '0 4px 16px -2px rgba(16, 185, 129, 0.2), inset 0 1px 1px rgba(255, 255, 255, 1)',
    },
  };
});

/* ── Component ── */

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { mode } = useColorMode();
  const isDark = mode === 'dark';

  const socialifyBase = import.meta.env.VITE_SOCIALIFY_URL || 'https://socialify.git.ci';
  const themeParam = isDark ? 'Dark' : 'Light';
  const imageUrl = `${socialifyBase}/${project.owner.login}/${project.name}/image?font=Source%20Code%20Pro&language=1&name=1&pattern=Plus&theme=${themeParam}`;
  const repoUrl = project.svn_url || project.html_url || `https://github.com/${project.owner.login}/${project.name}`;

  const langColor = getLanguageColor(project.language);
  const visibleTopics = (project.topics || []).slice(0, 3);

  return (
    <CardWrapper>
      {/* Socialify Banner */}
      <ImageContainer>
        {!imageLoaded && (
          <Skeleton
            variant="rectangular"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              bgcolor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.06)',
            }}
          />
        )}
        <StyledMedia
          key={imageUrl}
          component="img"
          image={imageUrl}
          alt={project.name}
          onLoad={() => setImageLoaded(true)}
          sx={{ display: imageLoaded ? 'block' : 'none' }}
        />
      </ImageContainer>

      <StyledContent>
        {/* Repo Name */}
        <ProjectTitle variant="h6">
          {project.name}
        </ProjectTitle>

        {/* Description */}
        <ProjectDescription variant="body2">
          {project.description || 'Open source software project hosted on GitHub.'}
        </ProjectDescription>

        {/* Language with GitHub color dot */}
        {project.language && (
          <LanguageRow>
            <LanguageDot dotColor={langColor} />
            <LanguageName>{project.language}</LanguageName>
          </LanguageRow>
        )}

        {/* Stats: Stars, Forks, Watchers */}
        <StatsRow>
          <StatItem>
            <StarRoundedIcon sx={{ fontSize: 14, color: '#eab308' }} />
            <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem', fontFamily: MONO_FONT_STACK }}>
              {project.stargazers_count ?? 0}
            </Typography>
          </StatItem>
          <StatItem>
            <ForkRightRoundedIcon sx={{ fontSize: 14 }} />
            <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem', fontFamily: MONO_FONT_STACK }}>
              {project.forks_count ?? 0}
            </Typography>
          </StatItem>
          <StatItem>
            <VisibilityRoundedIcon sx={{ fontSize: 14 }} />
            <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem', fontFamily: MONO_FONT_STACK }}>
              {project.watchers_count ?? 0}
            </Typography>
          </StatItem>
        </StatsRow>

        {/* Topics */}
        {visibleTopics.length > 0 && (
          <TopicsRow>
            {visibleTopics.map((topic) => (
              <TopicChip key={topic} label={topic} size="small" />
            ))}
          </TopicsRow>
        )}
      </StyledContent>

      <StyledActions>
        <ViewButton
          fullWidth
          variant="outlined"
          startIcon={<GitHubIcon sx={{ fontSize: '16px !important' }} />}
          endIcon={<ArrowOutwardIcon sx={{ fontSize: '12px !important' }} />}
          onClick={() => window.open(repoUrl, '_blank', 'noopener,noreferrer')}
        >
          View on GitHub
        </ViewButton>
      </StyledActions>
    </CardWrapper>
  );
};

export default ProjectCard;
