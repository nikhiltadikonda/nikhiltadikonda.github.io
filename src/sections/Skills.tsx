import React, { useState, useMemo } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  styled,
  keyframes,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CodeIcon from '@mui/icons-material/Code';
import skill_data from '../helpers/skill_data';
import SkillBadge from '../components/SkillBadge';
import SectionHeader from '../components/common/SectionHeader';
import { SkillCategory } from '../types';
import { gradientTokens, MONO_FONT_STACK } from '../theme/tokens';

const categories: SkillCategory[] = [
  'All',
  'Languages',
  'Frontend',
  'Backend & Cloud',
  'AI & Data Systems',
  'DevOps & Tools',
];

/* Styled Sub-components */

const SkillsSectionWrapper = styled('section')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(12),
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(14),
  },
}));

/* Category Controls (Mobile & Desktop) */
const ControlsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2.5),
  marginBottom: theme.spacing(4),
  width: '100%',
  [theme.breakpoints.up('lg')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(5),
  },
}));

const CategoryBarWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(1),
  maxWidth: '100%',
  [theme.breakpoints.up('md')]: {
    gap: theme.spacing(1.2),
  },
}));

const CategoryButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    position: 'relative',
    padding: '7px 16px',
    height: 36,
    fontFamily: MONO_FONT_STACK,
    fontWeight: active ? 700 : 600,
    fontSize: '0.82rem',
    borderRadius: 9999,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    textTransform: 'none',
    minWidth: 'auto',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
    ...(active
      ? {
          background: gradientTokens.primary,
          color: '#ffffff',
          border: '1px solid rgba(255, 255, 255, 0.35)',
          boxShadow:
            '0 4px 16px -2px rgba(16, 185, 129, 0.55), inset 0 1px 1px rgba(255, 255, 255, 0.45)',
          '&:hover': {
            background: gradientTokens.primary,
            transform: 'translateY(-1px) scale(1.03)',
          },
        }
      : {
          background: isDark ? 'rgba(10, 18, 14, 0.65)' : 'rgba(255, 255, 255, 0.8)',
          color: isDark ? '#94a3b8' : '#64748b',
          border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
          boxShadow: isDark
            ? 'inset 0 1px 1px rgba(255, 255, 255, 0.15)'
            : '0 2px 8px rgba(0, 0, 0, 0.03), inset 0 1px 1px rgba(255, 255, 255, 1)',
          '&:hover': {
            background: isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.08)',
            color: isDark ? '#ffffff' : '#0f172a',
            borderColor: 'rgba(16, 185, 129, 0.4)',
            transform: 'translateY(-1px) scale(1.03)',
          },
        }),
    '&:active': {
      transform: 'scale(0.96)',
    },
  };
});

const SearchInput = styled(TextField)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 250,
    },
    '& .MuiInputBase-root': {
      borderRadius: 9999,
      fontFamily: MONO_FONT_STACK,
      background: isDark ? 'rgba(10, 18, 14, 0.65)' : 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(20px)',
      border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
      color: isDark ? '#f8fafc' : '#0f172a',
      fontSize: '0.84rem',
      boxShadow: isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.03)',
      transition: 'all 0.2s ease',
      '& fieldset': { border: 'none' },
      '&:hover': {
        borderColor: 'rgba(16, 185, 129, 0.4)',
      },
      '&.Mui-focused': {
        borderColor: '#10b981',
        boxShadow: '0 0 16px rgba(16, 185, 129, 0.3)',
      },
    },
  };
});

/* Marquee Animation: Left-to-Right Scrolling */
const scrollLeftToRight = keyframes`
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0%);
  }
`;

const MarqueeWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  width: '100%',
  overflow: 'hidden',
  position: 'relative',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  maskImage: 'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(1.5),
    maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
  },
}));

const MarqueeRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  overflow: 'hidden',
  userSelect: 'none',
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  '&:hover .marquee-track, &:active .marquee-track': {
    animationPlayState: 'paused',
  },
}));

const MarqueeTrack = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'speed' && prop !== 'delay',
})<{ speed?: number; delay?: number }>(({ theme, speed = 50, delay = 0 }) => ({
  display: 'flex',
  flexShrink: 0,
  alignItems: 'center',
  gap: theme.spacing(2),
  paddingRight: theme.spacing(2),
  width: 'max-content',
  animation: `${scrollLeftToRight} ${speed}s linear ${delay}s infinite`,
  willChange: 'transform',
  '&:hover, &:active': {
    animationPlayState: 'paused',
  },
  '@media (prefers-reduced-motion: reduce)': {
    animation: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
  },
}));

/* Skills Presentation: Floating Pill Badges Grid */
const SkillsGrid = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1.5),
  justifyContent: 'center',
  minHeight: 220,
  alignContent: 'flex-start',
  [theme.breakpoints.up('md')]: {
    gap: theme.spacing(2),
  },
}));

const EmptyMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: 'center',
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  width: '100%',
}));

/* Main Skills Component */

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const isMarqueeView = activeCategory === 'All' && searchQuery.trim() === '';

  const marqueeRows = useMemo(() => {
    // Rich randomized item distribution across lines to avoid parallel patterning
    const row0 = [0, 8, 14, 21, 26, 4, 11, 18];
    const row1 = [1, 5, 12, 16, 22, 28, 9, 2];
    const row2 = [10, 15, 20, 24, 29, 6, 17, 23];
    const row3 = [3, 7, 13, 19, 25, 30, 27];

    const pick = (indices: number[]) =>
      indices.map((i) => skill_data[i]).filter(Boolean);

    return [pick(row0), pick(row1), pick(row2), pick(row3)];
  }, []);

  /* Faster, organic & desynchronized scrolling speeds and start offsets */
  const marqueeRowConfigs = [
    { speed: 52, delay: -14 },
    { speed: 64, delay: -38 },
    { speed: 46, delay: -9 },
    { speed: 58, delay: -27 },
  ];

  const filteredSkills = useMemo(() => {
    return skill_data.filter((skill) => {
      const matchesCategory =
        activeCategory === 'All' || skill.category === activeCategory;
      const matchesSearch = skill.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const renderSkillsContent = () => {
    if (isMarqueeView) {
      return (
        <MarqueeWrapper>
          {marqueeRows.map((row, rowIndex) => {
            const config = marqueeRowConfigs[rowIndex % marqueeRowConfigs.length];
            return (
              <MarqueeRow key={rowIndex}>
                <MarqueeTrack className="marquee-track" speed={config.speed} delay={config.delay}>
                  {[...row, ...row, ...row, ...row].map((skill, i) => (
                    <SkillBadge
                      key={`${skill.id}-row-${rowIndex}-${i}`}
                      skill={skill}
                    />
                  ))}
                </MarqueeTrack>
              </MarqueeRow>
            );
          })}
        </MarqueeWrapper>
      );
    }

    if (filteredSkills.length > 0) {
      return (
        <SkillsGrid>
          {filteredSkills.map((skill) => (
            <SkillBadge key={skill.id} skill={skill} />
          ))}
        </SkillsGrid>
      );
    }

    return (
      <EmptyMessage variant="body1">
        {`No skills matching "${searchQuery}".`}
      </EmptyMessage>
    );
  };

  return (
    <SkillsSectionWrapper id="skills">
      <Container maxWidth="lg">
        {/* Section Title Header */}
        <SectionHeader
          badgeIcon={<CodeIcon sx={{ fontSize: 16 }} />}
          badgeText="Technical Arsenal"
          title="Technical Skills"
          subtitle="A look at the programming languages, tools, and cloud architecture I use to bring ideas to life"
        />

        {/* Category Controls & Search */}
        <ControlsWrapper>
          <CategoryBarWrapper>
            {categories.map((category) => (
              <CategoryButton
                key={category}
                active={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </CategoryButton>
            ))}
          </CategoryBarWrapper>

          <SearchInput
            size="small"
            placeholder="Search technology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </ControlsWrapper>

        {/* Skills Presentation: Left-to-Right Scrolling Marquee in "All" view, or Grid on Filter/Search */}
        {renderSkillsContent()}
      </Container>
    </SkillsSectionWrapper>
  );
};

export default Skills;
