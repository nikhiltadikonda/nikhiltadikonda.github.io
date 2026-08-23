import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Button,
  Collapse,
  styled,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CodeIcon from '@mui/icons-material/Code';
import TuneIcon from '@mui/icons-material/Tune';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
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

/* Desktop Category Controls */
const DesktopControlsWrapper = styled(Box)(({ theme }) => ({
  display: 'none',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
  [theme.breakpoints.up('lg')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

const CategoryBar = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    display: 'inline-flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: 4,
    padding: '4px 6px',
    borderRadius: 9999,
    position: 'relative',
    background: isDark ? 'rgba(10, 18, 14, 0.65)' : 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
    boxShadow: isDark
      ? 'inset 0 1px 1px rgba(255, 255, 255, 0.15)'
      : '0 4px 14px rgba(0, 0, 0, 0.04), inset 0 1px 1px rgba(255, 255, 255, 1)',
    whiteSpace: 'nowrap',
  };
});

/* The Animated Sliding Liquid Bubble under Categories */
const SlidingCategoryBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'bubbleLeft' && prop !== 'bubbleWidth',
})<{ bubbleLeft: number; bubbleWidth: number }>(({ bubbleLeft, bubbleWidth }) => {
  return {
    position: 'absolute',
    top: 4,
    bottom: 4,
    left: bubbleLeft,
    width: bubbleWidth,
    borderRadius: 9999,
    zIndex: 1,
    pointerEvents: 'none',
    background: gradientTokens.primary,
    border: '1px solid rgba(255, 255, 255, 0.35)',
    boxShadow: '0 4px 16px -2px rgba(16, 185, 129, 0.55), inset 0 1px 1px rgba(255, 255, 255, 0.45)',
    /* Spring-physics liquid gliding transition */
    transition: 'left 0.7s cubic-bezier(0.25, 1.15, 0.45, 1), width 0.7s cubic-bezier(0.25, 1.15, 0.45, 1)',
  };
});

const CategoryButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    position: 'relative',
    zIndex: 2,
    padding: '7px 16px',
    height: 36,
    fontFamily: MONO_FONT_STACK,
    fontWeight: active ? 700 : 600,
    fontSize: '0.82rem',
    borderRadius: 9999,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    background: 'transparent',
    textTransform: 'none',
    minWidth: 'auto',
    color: active ? '#ffffff' : isDark ? '#94a3b8' : '#64748b',
    transition: 'color 0.25s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
    '&:hover': {
      background: 'transparent',
      color: active ? '#ffffff' : isDark ? '#ffffff' : '#0f172a',
      transform: 'translateY(-1px) scale(1.03)',
    },
    '&:active': {
      transform: 'scale(0.96)',
    },
  };
});

/* Mobile Controls & Collapsible Filter Menu */
const MobileControlsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3.5),
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

const MobileTriggerButton = styled(Button)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 20px',
    borderRadius: 9999,
    position: 'relative',
    overflow: 'hidden',
    background: isDark ? 'rgba(10, 18, 14, 0.75)' : 'rgba(255, 255, 255, 0.88)',
    backdropFilter: 'blur(24px) saturate(180%)',
    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)'}`,
    boxShadow: isDark
      ? '0 8px 24px -4px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.25)'
      : '0 6px 18px rgba(0, 0, 0, 0.06), inset 0 1px 2px rgba(255, 255, 255, 1)',
    color: isDark ? '#f8fafc' : '#0f172a',
    fontFamily: MONO_FONT_STACK,
    fontWeight: 700,
    fontSize: '0.88rem',
    textTransform: 'none',
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    '&:hover': {
      background: isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.08)',
      borderColor: '#10b981',
      transform: 'translateY(-1px)',
    },
  };
});

const LiquidGlassMenuList = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    marginTop: theme.spacing(1.5),
    padding: theme.spacing(1),
    borderRadius: 20,
    maxHeight: 280,
    overflowY: 'auto',
    background: isDark ? 'rgba(8, 14, 10, 0.92)' : 'rgba(255, 255, 255, 0.96)',
    backdropFilter: 'blur(30px) saturate(190%)',
    WebkitBackdropFilter: 'blur(30px) saturate(190%)',
    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)'}`,
    boxShadow: isDark
      ? '0 20px 40px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.3)'
      : '0 20px 40px rgba(0, 0, 0, 0.12), inset 0 1px 2px rgba(255, 255, 255, 1)',
    display: 'flex',
    flexDirection: 'column',
    scrollbarWidth: 'thin',
    scrollbarColor: isDark
      ? 'rgba(255, 255, 255, 0.2) transparent'
      : 'rgba(0, 0, 0, 0.2) transparent',
    '&::-webkit-scrollbar': {
      width: 5,
    },
    '&::-webkit-scrollbar-thumb': {
      background: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
      borderRadius: 9999,
    },
  };
});

const LiquidGlassMenuItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    borderRadius: 14,
    cursor: 'pointer',
    transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
    background: active
      ? isDark
        ? 'rgba(16, 185, 129, 0.2)'
        : 'rgba(16, 185, 129, 0.12)'
      : 'transparent',
    color: active
      ? isDark
        ? '#34d399'
        : '#059669'
      : isDark
        ? '#e2e8f0'
        : '#1e293b',
    fontFamily: MONO_FONT_STACK,
    fontWeight: active ? 700 : 500,
    fontSize: '0.88rem',
    '&:hover': {
      background: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
      color: isDark ? '#ffffff' : '#0f172a',
      transform: 'translateX(4px)',
    },
    '&:active': {
      transform: 'scale(0.98)',
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

/* 1. Desktop Skills Presentation: Floating Pill Badges Grid */
const DesktopSkillsGrid = styled(Box)(({ theme }) => ({
  display: 'none',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  justifyContent: 'center',
  minHeight: 220,
  alignContent: 'flex-start',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

/* 2. Mobile Skills Presentation: Scrollable Apple Liquid Glass Menu List Container */
const MobileSkillsMenuList = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxHeight: '60vh',
    overflowY: 'auto',
    borderRadius: 24,
    background: isDark ? 'rgba(10, 18, 14, 0.8)' : 'rgba(255, 255, 255, 0.88)',
    backdropFilter: 'blur(24px) saturate(180%)',
    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)'}`,
    boxShadow: isDark
      ? '0 16px 36px -10px rgba(0, 0, 0, 0.6), inset 0 1px 1px 0 rgba(255, 255, 255, 0.35)'
      : '0 12px 32px -8px rgba(0, 0, 0, 0.06), inset 0 1px 2px 0 rgba(255, 255, 255, 1)',
    scrollbarWidth: 'thin',
    scrollbarColor: isDark
      ? 'rgba(255, 255, 255, 0.2) transparent'
      : 'rgba(0, 0, 0, 0.2) transparent',
    '&::-webkit-scrollbar': {
      width: 6,
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
      borderRadius: 9999,
    },
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  };
});

/* Individual Skill Row in Mobile Menu List */
const MobileSkillRow = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 20px',
    borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)'}`,
    transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
    '&:last-child': {
      borderBottom: 'none',
    },
    '&:hover': {
      background: isDark ? 'rgba(16, 185, 129, 0.08)' : 'rgba(16, 185, 129, 0.04)',
      transform: 'translateX(2px)',
    },
  };
});

const SkillInfoLeft = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const SkillIconImg = styled('img')(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    width: 26,
    height: 26,
    objectFit: 'contain',
    filter: isDark ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' : 'none',
  };
});

const SkillNameText = styled(Typography)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    fontFamily: MONO_FONT_STACK,
    fontWeight: 600,
    fontSize: '0.9rem',
    color: isDark ? '#f8fafc' : '#0f172a',
    letterSpacing: '-0.01em',
  };
});

const SkillCategoryTag = styled(Chip)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    height: 22,
    fontFamily: MONO_FONT_STACK,
    fontSize: '0.7rem',
    fontWeight: 600,
    background: isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.08)',
    color: isDark ? '#34d399' : '#059669',
    border: `1px solid ${isDark ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.2)'}`,
  };
});

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [bubbleProps, setBubbleProps] = useState({ left: 4, width: 0 });
  const categoryBarRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

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

  /* Track Category Bubble Position */
  useEffect(() => {
    const activeBtn = buttonRefs.current.get(activeCategory);
    const bar = categoryBarRef.current;
    if (activeBtn && bar) {
      const btnRect = activeBtn.getBoundingClientRect();
      const barRect = bar.getBoundingClientRect();
      setBubbleProps({
        left: btnRect.left - barRect.left,
        width: btnRect.width,
      });
    }
  }, [activeCategory]);

  const handleCategorySelect = (category: SkillCategory) => {
    setActiveCategory(category);
    setMobileMenuOpen(false);
  };

  return (
    <SkillsSectionWrapper id="skills">
      <Container maxWidth="lg">
        {/* Section Title Header */}
        <SectionHeader
          badgeIcon={<CodeIcon sx={{ fontSize: 16 }} />}
          badgeText="Technical Arsenal"
          title="Skills & Technologies"
          subtitle="A curated snapshot of languages, frameworks, cloud platforms, AI systems, and tools I leverage daily."
        />

        {/* Mobile Filter Controls & Collapsible Category Menu */}
        <MobileControlsWrapper>
          <MobileTriggerButton
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            startIcon={<TuneIcon sx={{ color: '#10b981' }} />}
            endIcon={
              mobileMenuOpen ? (
                <ExpandLessIcon sx={{ color: '#94a3b8' }} />
              ) : (
                <ExpandMoreIcon sx={{ color: '#94a3b8' }} />
              )
            }
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                Category:
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {activeCategory}
              </Typography>
            </Box>
          </MobileTriggerButton>

          {/* Animated Collapsible Category List */}
          <Collapse in={mobileMenuOpen} timeout={250} unmountOnExit>
            <LiquidGlassMenuList>
              {categories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <LiquidGlassMenuItem
                    key={category}
                    active={isActive}
                    onClick={() => handleCategorySelect(category)}
                  >
                    <span>{category}</span>
                    {isActive && (
                      <CheckRoundedIcon sx={{ fontSize: 18, color: '#10b981' }} />
                    )}
                  </LiquidGlassMenuItem>
                );
              })}
            </LiquidGlassMenuList>
          </Collapse>

          {/* Quick Search Field */}
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
        </MobileControlsWrapper>

        {/* Desktop Controls: Crisp Clean Gliding Category Bubble + Search */}
        <DesktopControlsWrapper>
          <CategoryBar ref={categoryBarRef}>
            {/* Animated Sliding Gliding Bubble */}
            {bubbleProps.width > 0 && (
              <SlidingCategoryBubble
                bubbleLeft={bubbleProps.left}
                bubbleWidth={bubbleProps.width}
              />
            )}

            {categories.map((category) => (
              <CategoryButton
                key={category}
                ref={(el) => {
                  if (el) buttonRefs.current.set(category, el);
                  else buttonRefs.current.delete(category);
                }}
                active={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </CategoryButton>
            ))}
          </CategoryBar>

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
        </DesktopControlsWrapper>

        {/* 1. Mobile Presentation: Scrollable Apple Liquid Glass Menu List */}
        {filteredSkills.length > 0 ? (
          <MobileSkillsMenuList>
            {filteredSkills.map((skill) => (
              <MobileSkillRow key={skill.id}>
                <SkillInfoLeft>
                  <SkillIconImg src={skill.img} alt={skill.name} />
                  <SkillNameText>{skill.name}</SkillNameText>
                </SkillInfoLeft>
                <SkillCategoryTag label={skill.category} size="small" />
              </MobileSkillRow>
            ))}
          </MobileSkillsMenuList>
        ) : (
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <EmptyMessage variant="body1">
              No skills matching "{searchQuery}".
            </EmptyMessage>
          </Box>
        )}

        {/* 2. Desktop Presentation: Floating Liquid Pill Grid */}
        {filteredSkills.length > 0 ? (
          <DesktopSkillsGrid>
            {filteredSkills.map((skill) => (
              <SkillBadge key={skill.id} skill={skill} />
            ))}
          </DesktopSkillsGrid>
        ) : (
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <EmptyMessage variant="body1">
              No skills matching "{searchQuery}".
            </EmptyMessage>
          </Box>
        )}
      </Container>
    </SkillsSectionWrapper>
  );
};

export default Skills;
