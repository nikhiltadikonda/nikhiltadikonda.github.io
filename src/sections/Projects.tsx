import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Container,
  Box,
  Typography,
  IconButton,
  Tooltip,
  Skeleton,
  styled,
} from '@mui/material';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import ProjectCard from '../components/ProjectCard';
import SectionHeader from '../components/common/SectionHeader';
import { useGitHubProjects } from '../hooks/useGitHubProjects';

/* Styled Sub-components */

const ProjectsSectionWrapper = styled('section')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(12),
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(14),
    paddingBottom: theme.spacing(16),
  },
}));

/* 3D Perspective Stage */
const CarouselStage = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: 480,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  perspective: 1200,
  transformStyle: 'preserve-3d',
  overflow: 'hidden',
  userSelect: 'none',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    height: 490,
  },
  [theme.breakpoints.up('md')]: {
    height: 480,
  },
}));

/* Individual 3D Positioned Card Wrapper */
const PerspectiveCardSlot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'offset' && prop !== 'isActive',
})<{ offset: number; isActive: boolean }>(({ theme, offset, isActive }) => {
  const isDark = theme.palette.mode === 'dark';
  const absOffset = Math.abs(offset);

  // 3D positioning matrices based on offset distance from active index
  let transform = 'translate3d(0, 0, 0) scale(1) rotateY(0deg)';
  let opacity = 1;
  let zIndex = 10;
  let pointerEvents: 'auto' | 'none' = 'auto';

  if (offset === 1) {
    transform = 'translate3d(60%, 0, -120px) scale(0.84) rotateY(-12deg)';
    opacity = 0.85;
    zIndex = 5;
  } else if (offset === -1) {
    transform = 'translate3d(-60%, 0, -120px) scale(0.84) rotateY(12deg)';
    opacity = 0.85;
    zIndex = 5;
  } else if (offset === 2) {
    transform = 'translate3d(115%, 0, -260px) scale(0.7) rotateY(-20deg)';
    opacity = 0.3;
    zIndex = 2;
  } else if (offset === -2) {
    transform = 'translate3d(-115%, 0, -260px) scale(0.7) rotateY(20deg)';
    opacity = 0.3;
    zIndex = 2;
  } else if (absOffset > 2) {
    transform = `translate3d(${offset > 0 ? 150 : -150}%, 0, -350px) scale(0.55) rotateY(${offset > 0 ? -25 : 25}deg)`;
    opacity = 0;
    zIndex = 1;
    pointerEvents = 'none';
  }

  return {
    position: 'absolute',
    width: '86%',
    maxWidth: 390,
    transform,
    opacity,
    zIndex,
    pointerEvents,
    cursor: isActive ? 'default' : 'pointer',
    transition: 'all 0.6s cubic-bezier(0.25, 1.15, 0.45, 1)',
    filter: isActive
      ? isDark
        ? 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 16px rgba(16, 185, 129, 0.25))'
        : 'drop-shadow(0 16px 36px rgba(0, 0, 0, 0.08)) drop-shadow(0 0 12px rgba(16, 185, 129, 0.15))'
      : isDark
        ? 'brightness(0.85)'
        : 'brightness(0.95)',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 320,
      transform:
        offset === 1
          ? 'translate3d(70%, 0, -100px) scale(0.82) rotateY(-10deg)'
          : offset === -1
            ? 'translate3d(-70%, 0, -100px) scale(0.82) rotateY(10deg)'
            : transform,
    },
  };
});

/* Floating Glass Navigation Controls */
const FloatingNavButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'direction',
})<{ direction: 'left' | 'right' }>(({ theme, direction }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    [direction]: 12,
    zIndex: 20,
    width: 48,
    height: 48,
    borderRadius: '50%',
    background: isDark ? 'rgba(8, 14, 10, 0.75)' : 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)'}`,
    boxShadow: isDark
      ? '0 8px 24px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.3)'
      : '0 6px 20px rgba(0, 0, 0, 0.08), inset 0 1px 2px rgba(255, 255, 255, 1)',
    color: isDark ? '#f8fafc' : '#0f172a',
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    '&:hover': {
      background: isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.12)',
      borderColor: '#10b981',
      color: '#10b981',
      transform: 'translateY(-50%) scale(1.12)',
    },
    '&:active': {
      transform: 'translateY(-50%) scale(0.95)',
    },
    [theme.breakpoints.down('sm')]: {
      width: 40,
      height: 40,
      [direction]: 4,
    },
  };
});

/* Bottom Deck Pagination Bar */
const PaginationBar = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1.2),
    marginTop: theme.spacing(3),
  };
});

const PaginationDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    width: active ? 28 : 8,
    height: 8,
    borderRadius: 9999,
    cursor: 'pointer',
    background: active
      ? '#10b981'
      : isDark
        ? 'rgba(255, 255, 255, 0.2)'
        : 'rgba(0, 0, 0, 0.2)',
    boxShadow: active ? '0 0 12px rgba(16, 185, 129, 0.7)' : 'none',
    transition: 'all 0.4s cubic-bezier(0.25, 1.15, 0.45, 1)',
    '&:hover': {
      background: active ? '#10b981' : isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
    },
  };
});

const AutoPlayButton = styled(IconButton)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    color: isDark ? '#94a3b8' : '#64748b',
    padding: 6,
    marginLeft: theme.spacing(1),
    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
    background: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
    '&:hover': {
      color: '#10b981',
      borderColor: '#10b981',
    },
  };
});

/* Skeletons */
const SkeletonStage = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    height: 420,
    borderRadius: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: isDark ? 'rgba(10, 18, 14, 0.5)' : 'rgba(255, 255, 255, 0.7)',
    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
  };
});

/* Main Projects Component */

export const Projects: React.FC = () => {
  const { projects, loading } = useGitHubProjects();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalProjects = projects?.length || 0;

  const nextCard = useCallback(() => {
    if (totalProjects === 0) return;
    setActiveIndex((prev) => (prev + 1) % totalProjects);
  }, [totalProjects]);

  const prevCard = useCallback(() => {
    if (totalProjects === 0) return;
    setActiveIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  }, [totalProjects]);

  /* Continuous Auto-play Loop */
  useEffect(() => {
    if (!isAutoPlaying || isHovered || totalProjects <= 1) return;

    const interval = setInterval(() => {
      nextCard();
    }, 4200);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, totalProjects, nextCard]);

  /* Keyboard Navigation */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextCard();
      if (e.key === 'ArrowLeft') prevCard();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextCard, prevCard]);

  /* Touch / Swipe Handlers */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 45;
    const isRightSwipe = distance < -45;

    if (isLeftSwipe) nextCard();
    if (isRightSwipe) prevCard();

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Helper to calculate shortest modular cyclic offset distance
  const getCardOffset = (index: number) => {
    let diff = index - activeIndex;
    if (totalProjects > 0) {
      if (diff > totalProjects / 2) diff -= totalProjects;
      if (diff < -totalProjects / 2) diff += totalProjects;
    }
    return diff;
  };

  return (
    <ProjectsSectionWrapper id="projects">
      <Container maxWidth="lg">
        {/* Section Header */}
        <SectionHeader
          badgeIcon={<FolderSpecialIcon sx={{ fontSize: 16 }} />}
          badgeText="Portfolio & Code"
          title="Featured Projects"
          subtitle="A curated portfolio of my personal engineering projects and experiments."
        />

        {loading ? (
          <SkeletonStage>
            <Skeleton variant="rounded" width={380} height={360} sx={{ borderRadius: 4 }} />
          </SkeletonStage>
        ) : projects && projects.length > 0 ? (
          <Box
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{ position: 'relative' }}
          >
            {/* 3D Stage with Looping Stack */}
            <CarouselStage
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Left Arrow Button */}
              <FloatingNavButton
                direction="left"
                aria-label="Previous project"
                onClick={prevCard}
              >
                <ChevronLeftRoundedIcon sx={{ fontSize: 32 }} />
              </FloatingNavButton>

              {/* 3D Perspective Card Track */}
              {projects.map((project, index) => {
                const offset = getCardOffset(index);
                const isActive = index === activeIndex;

                return (
                  <PerspectiveCardSlot
                    key={project.id}
                    offset={offset}
                    isActive={isActive}
                    onClick={() => {
                      if (!isActive) setActiveIndex(index);
                    }}
                  >
                    <ProjectCard project={project} />
                  </PerspectiveCardSlot>
                );
              })}

              {/* Right Arrow Button */}
              <FloatingNavButton
                direction="right"
                aria-label="Next project"
                onClick={nextCard}
              >
                <ChevronRightRoundedIcon sx={{ fontSize: 32 }} />
              </FloatingNavButton>
            </CarouselStage>

            {/* Pagination Dots & Auto-play Toggle */}
            <PaginationBar>
              {projects.map((project, index) => (
                <PaginationDot
                  key={project.id}
                  active={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                  title={`Project ${index + 1}: ${project.name}`}
                />
              ))}

              <Tooltip title={isAutoPlaying ? 'Pause Auto-Rotation' : 'Resume Auto-Rotation'} arrow>
                <AutoPlayButton
                  size="small"
                  onClick={() => setIsAutoPlaying((prev) => !prev)}
                  aria-label={isAutoPlaying ? 'Pause project auto-rotation' : 'Play project auto-rotation'}
                >
                  {isAutoPlaying ? (
                    <PauseRoundedIcon sx={{ fontSize: 16 }} />
                  ) : (
                    <PlayArrowRoundedIcon sx={{ fontSize: 16 }} />
                  )}
                </AutoPlayButton>
              </Tooltip>
            </PaginationBar>
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="body1" color="text.secondary">
              No repositories currently available to display.
            </Typography>
          </Box>
        )}
      </Container>
    </ProjectsSectionWrapper>
  );
};

export default Projects;
