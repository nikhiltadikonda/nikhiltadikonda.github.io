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
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { GitHubRepo } from '../types';
import { useColorMode } from '../context/ThemeContext';
import GlassCard from './common/GlassCard';
import { MONO_FONT_STACK } from '../theme/tokens';

interface ProjectCardProps {
  project: GitHubRepo;
}

/* Styled Sub-components - Compact Ergonomic Card Layout */

const CardWrapper = styled(GlassCard)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 20,
    background: isDark
      ? 'linear-gradient(145deg, rgba(14, 24, 18, 0.96) 0%, rgba(7, 13, 9, 0.98) 100%) !important'
      : 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(246, 250, 248, 0.95) 100%) !important',
    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.08)'}`,
    boxShadow: isDark
      ? '0 24px 48px -12px rgba(0, 0, 0, 0.8), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)'
      : '0 20px 40px -10px rgba(0, 0, 0, 0.08), inset 0 1px 2px 0 rgba(255, 255, 255, 1)',
  };
});

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  paddingTop: '38%',
  background: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.04)',
  [theme.breakpoints.up('sm')]: {
    paddingTop: '40%',
  },
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
  padding: theme.spacing(1.75),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2),
  },
}));

const CardHeaderRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(0.75),
  gap: theme.spacing(1),
}));

const ProjectTitle = styled(Typography)(({ theme }) => ({
  fontFamily: MONO_FONT_STACK,
  fontWeight: 700,
  fontSize: '0.94rem',
  letterSpacing: '-0.02em',
  color: theme.palette.mode === 'dark' ? '#f8fafc' : '#0f172a',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

const LanguageTag = styled(Chip)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    fontFamily: MONO_FONT_STACK,
    background: isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.1)',
    color: isDark ? '#34d399' : '#059669',
    border: `1px solid ${isDark ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.25)'}`,
    fontWeight: 600,
    fontSize: '0.68rem',
    height: 20,
    paddingLeft: 2,
    paddingRight: 2,
  };
});

const ProjectDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.8rem',
  lineHeight: 1.5,
  marginBottom: theme.spacing(1.25),
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  minHeight: '2.8em',
}));

const MetaRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
}));

const StarBadge = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 3,
  fontFamily: MONO_FONT_STACK,
  color: theme.palette.mode === 'dark' ? '#fef08a' : '#ca8a04',
}));

const StyledActions = styled(CardActions)(({ theme }) => ({
  padding: theme.spacing(1.75),
  paddingTop: 0,
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
}));

const ViewButton = styled(Button)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 9999,
    fontFamily: MONO_FONT_STACK,
    fontSize: '0.78rem',
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

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { mode } = useColorMode();
  const isDark = mode === 'dark';

  const socialifyBase = import.meta.env.VITE_SOCIALIFY_URL || 'https://socialify.git.ci';
  const themeParam = isDark ? 'Dark' : 'Light';
  const imageUrl = `${socialifyBase}/${project.owner.login}/${project.name}/image?font=Source%20Code%20Pro&language=1&name=1&pattern=Plus&theme=${themeParam}`;
  const repoUrl = project.svn_url || project.html_url || `https://github.com/${project.owner.login}/${project.name}`;

  return (
    <CardWrapper>
      {/* Socialify Preview Image with Skeleton loader */}
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
          sx={{
            display: imageLoaded ? 'block' : 'none',
          }}
        />
      </ImageContainer>

      <StyledContent>
        <CardHeaderRow>
          <ProjectTitle variant="h6">
            {project.name}
          </ProjectTitle>

          {project.language && (
            <LanguageTag
              label={project.language}
              size="small"
            />
          )}
        </CardHeaderRow>

        <ProjectDescription variant="body2">
          {project.description || 'Open source software project hosted on GitHub.'}
        </ProjectDescription>

        {/* Project Meta Tags (Stars, Owner) */}
        <MetaRow>
          {typeof project.stargazers_count === 'number' && project.stargazers_count > 0 && (
            <StarBadge>
              <StarRateRoundedIcon sx={{ fontSize: 16, color: '#eab308' }} />
              <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.75rem' }}>
                {project.stargazers_count}
              </Typography>
            </StarBadge>
          )}
        </MetaRow>
      </StyledContent>

      <StyledActions>
        <ViewButton
          fullWidth
          variant="outlined"
          startIcon={<GitHubIcon sx={{ fontSize: '18px !important' }} />}
          endIcon={<ArrowOutwardIcon sx={{ fontSize: '14px !important' }} />}
          onClick={() => window.open(repoUrl, '_blank', 'noopener,noreferrer')}
        >
          View on GitHub
        </ViewButton>
      </StyledActions>
    </CardWrapper>
  );
};

export default ProjectCard;
