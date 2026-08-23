import React from 'react';
import {
  Container,
  Box,
  Typography,
  Skeleton,
  styled,
  keyframes,
} from '@mui/material';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import ProjectCard from '../components/ProjectCard';
import SectionHeader from '../components/common/SectionHeader';
import { useGitHubProjects } from '../hooks/useGitHubProjects';

/* ── Keyframes ── */

const scrollMarquee = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
`;

/* ── Styled Sub-components ── */

const ProjectsSectionWrapper = styled('section')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(12),
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(14),
    paddingBottom: theme.spacing(16),
  },
}));

const MarqueeWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  overflow: 'hidden',
  position: 'relative',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
  '&:hover .marquee-track': {
    animationPlayState: 'paused',
  },
}));

const MarqueeTrack = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'duration',
})<{ duration?: number }>(({ theme, duration = 60 }) => ({
  display: 'flex',
  flexShrink: 0,
  alignItems: 'stretch',
  gap: theme.spacing(3),
  paddingRight: theme.spacing(3), // matches gap so the seam is invisible
  width: 'max-content',
  animation: `${scrollMarquee} ${duration}s linear infinite`,
  willChange: 'transform',
  '@media (prefers-reduced-motion: reduce)': {
    animation: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

/* Skeleton loading state */
const SkeletonRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  justifyContent: 'center',
  overflow: 'hidden',
  padding: theme.spacing(2, 0),
}));

/* ── Main Component ── */

export const Projects: React.FC = () => {
  const { projects, loading } = useGitHubProjects();

  // Compute a sensible animation duration based on card count
  // ~6s per card for smooth scrolling
  const cardCount = projects?.length || 0;
  const duration = Math.max(30, cardCount * 6);

  return (
    <ProjectsSectionWrapper id="projects">
      <Container maxWidth="lg">
        {/* Section Header */}
        <SectionHeader
          badgeIcon={<FolderSpecialIcon sx={{ fontSize: 16 }} />}
          badgeText="Portfolio & Code"
          title="Built & Shipped"
          subtitle="Open-source projects, side quests, and everything I've pushed to GitHub."
        />
      </Container>

      {/* Marquee lives outside Container for full-width infinite scroll */}
      {loading ? (
        <Container maxWidth="lg">
          <SkeletonRow>
            {[1, 2, 3, 4].map((i) => (
              <Skeleton
                key={i}
                variant="rounded"
                width={280}
                height={420}
                sx={{ borderRadius: 5, flexShrink: 0 }}
              />
            ))}
          </SkeletonRow>
        </Container>
      ) : projects && projects.length > 0 ? (
        <MarqueeWrapper>
          <MarqueeTrack className="marquee-track" duration={duration}>
            {/* Duplicate the list once for seamless infinite loop */}
            {[...projects, ...projects].map((project, index) => (
              <ProjectCard
                key={`${project.id}-${index}`}
                project={project}
              />
            ))}
          </MarqueeTrack>
        </MarqueeWrapper>
      ) : (
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="body1" color="text.secondary">
              No repositories currently available to display.
            </Typography>
          </Box>
        </Container>
      )}
    </ProjectsSectionWrapper>
  );
};

export default Projects;
