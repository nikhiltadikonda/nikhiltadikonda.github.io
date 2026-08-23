import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
  styled,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import profile from '../images/profile.png';
import { useColorMode } from '../context/ThemeContext';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { MONO_FONT_STACK } from '../theme/tokens';

const navItems = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

/* Styled Nav Elements */

const NavContainer = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: theme.spacing(1.5),
  zIndex: 1100,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.up('md')]: {
    top: theme.spacing(2.5),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'scrolled',
})<{ scrolled?: boolean }>(({ theme, scrolled }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    maxWidth: 1100,
    width: '100%',
    borderRadius: 9999,
    position: 'relative',
    overflow: 'hidden',
    background: isDark
      ? scrolled
        ? 'rgba(7, 12, 10, 0.88)'
        : 'rgba(10, 18, 14, 0.72)'
      : scrolled
        ? 'rgba(255, 255, 255, 0.92)'
        : 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(24px) saturate(190%)',
    WebkitBackdropFilter: 'blur(24px) saturate(190%)',
    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.85)'}`,
    boxShadow: isDark
      ? scrolled
        ? '0 16px 36px -8px rgba(0, 0, 0, 0.7), inset 0 1px 1px 0 rgba(255, 255, 255, 0.35)'
        : '0 8px 24px -4px rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)'
      : scrolled
        ? '0 16px 36px -8px rgba(16, 185, 129, 0.08), inset 0 1px 2px 0 rgba(255, 255, 255, 1)'
        : '0 8px 24px -4px rgba(0, 0, 0, 0.04), inset 0 1px 2px 0 rgba(255, 255, 255, 1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };
});

/* Clean Liquid Nav Dock */
const NavDock = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    display: 'none',
    alignItems: 'center',
    position: 'relative',
    background: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
    borderRadius: 9999,
    padding: 4,
    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)'}`,
    boxShadow: isDark
      ? 'inset 0 1px 1px rgba(255, 255, 255, 0.1)'
      : 'inset 0 1px 1px rgba(255, 255, 255, 0.8)',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  };
});

/* The Animated Sliding Liquid Bubble (Terminal Green) */
const SlidingBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'bubbleLeft' && prop !== 'bubbleWidth',
})<{ bubbleLeft: number; bubbleWidth: number }>(({ theme, bubbleLeft, bubbleWidth }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    position: 'absolute',
    top: 4,
    bottom: 4,
    left: bubbleLeft,
    width: bubbleWidth,
    borderRadius: 9999,
    zIndex: 1,
    pointerEvents: 'none',
    background: isDark
      ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.35) 0%, rgba(6, 182, 212, 0.28) 100%)'
      : 'linear-gradient(135deg, rgba(16, 185, 129, 0.18) 0%, rgba(6, 182, 212, 0.12) 100%)',
    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(16, 185, 129, 0.35)'}`,
    boxShadow: isDark
      ? '0 4px 16px -2px rgba(16, 185, 129, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.4)'
      : '0 4px 14px -2px rgba(16, 185, 129, 0.25), inset 0 1px 2px rgba(255, 255, 255, 1)',
    transition: 'left 0.7s cubic-bezier(0.25, 1.15, 0.45, 1), width 0.7s cubic-bezier(0.25, 1.15, 0.45, 1)',
  };
});

const NavButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    position: 'relative',
    zIndex: 2,
    color: active ? (isDark ? '#ffffff' : '#059669') : isDark ? '#94a3b8' : '#475569',
    padding: '7px 18px',
    borderRadius: 9999,
    fontFamily: MONO_FONT_STACK,
    fontSize: '0.84rem',
    fontWeight: active ? 700 : 600,
    textTransform: 'none',
    background: 'transparent',
    minWidth: 'auto',
    transition: 'color 0.3s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
    '&:hover': {
      color: isDark ? '#ffffff' : '#0f172a',
      background: 'transparent',
      transform: 'translateY(-1px) scale(1.03)',
    },
    '&:active': {
      transform: 'scale(0.96)',
    },
  };
});

export const NavBar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [bubbleProps, setBubbleProps] = useState({ left: 4, width: 0 });
  const scrolled = useScrollPosition(20);
  const { mode, toggleColorMode } = useColorMode();
  const isDark = mode === 'dark';
  const navDockRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const isManualNavRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Update Sliding Bubble Position */
  const updateBubblePosition = useCallback(() => {
    const activeEl = itemRefs.current.get(activeSection);
    const dockEl = navDockRef.current;
    if (activeEl && dockEl) {
      const activeRect = activeEl.getBoundingClientRect();
      const dockRect = dockEl.getBoundingClientRect();
      setBubbleProps({
        left: activeRect.left - dockRect.left,
        width: activeRect.width,
      });
    }
  }, [activeSection]);

  useEffect(() => {
    updateBubblePosition();
    window.addEventListener('resize', updateBubblePosition);
    return () => window.removeEventListener('resize', updateBubblePosition);
  }, [updateBubblePosition]);

  /* Track Active Section on Scroll */
  useEffect(() => {
    const handleScroll = () => {
      if (isManualNavRef.current) return;

      const sections = ['about', 'skills', 'projects', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleNavClick = (href: string, id: string) => {
    setMobileOpen(false);
    setActiveSection(id);
    isManualNavRef.current = true;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    scrollTimeoutRef.current = setTimeout(() => {
      isManualNavRef.current = false;
    }, 850);
  };

  return (
    <NavContainer>
      <StyledAppBar
        position="static"
        elevation={0}
        scrolled={scrolled}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 1.5, sm: 2, md: 3 } }}>
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 58, md: 64 },
              display: 'grid',
              gridTemplateColumns: { xs: '1fr auto', md: '1fr auto 1fr' },
              alignItems: 'center',
            }}
          >
            {/* 1. Left Column: Logo / Brand */}
            <Box
              component="a"
              href="#about"
              onClick={() => handleNavClick('#about', 'about')}
              sx={{
                gridColumn: 1,
                justifySelf: 'start',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  p: '2px',
                  background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                  boxShadow: '0 0 12px rgba(16, 185, 129, 0.5)',
                  transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  '&:hover': {
                    transform: 'scale(1.08) rotate(4deg)',
                  },
                }}
              >
                <Box
                  component="img"
                  src={profile}
                  alt="Nikhil Tadikonda"
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: MONO_FONT_STACK,
                  fontWeight: 800,
                  fontSize: '0.94rem',
                  letterSpacing: '-0.02em',
                  background: isDark
                    ? 'linear-gradient(135deg, #ffffff 0%, #a7f3d0 100%)'
                    : 'linear-gradient(135deg, #0f172a 0%, #065f46 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Nikhil Tadikonda
              </Typography>
            </Box>

            {/* 2. Center Column: Desktop Navigation Links with Gliding Liquid Bubble */}
            <Box sx={{ gridColumn: { xs: 'none', md: 2 }, justifySelf: 'center', display: { xs: 'none', md: 'flex' } }}>
              <NavDock ref={navDockRef}>
                {bubbleProps.width > 0 && (
                  <SlidingBubble
                    bubbleLeft={bubbleProps.left}
                    bubbleWidth={bubbleProps.width}
                  />
                )}

                {navItems.map((item) => (
                  <NavButton
                    key={item.label}
                    ref={(el) => {
                      if (el) itemRefs.current.set(item.id, el);
                      else itemRefs.current.delete(item.id);
                    }}
                    active={activeSection === item.id}
                    onClick={() => handleNavClick(item.href, item.id)}
                  >
                    {item.label}
                  </NavButton>
                ))}
              </NavDock>
            </Box>

            {/* 3. Right Column (Desktop): Theme Switcher */}
            <Box
              sx={{
                gridColumn: { xs: 'none', md: 3 },
                justifySelf: 'end',
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
              }}
            >
              <Tooltip title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'} arrow>
                <IconButton
                  onClick={toggleColorMode}
                  size="small"
                  aria-label="Toggle light and dark theme"
                  sx={{
                    color: isDark ? '#f1f5f9' : '#0f172a',
                    background: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
                    backdropFilter: 'blur(12px)',
                    border: isDark
                      ? '1px solid rgba(255, 255, 255, 0.12)'
                      : '1px solid rgba(0, 0, 0, 0.1)',
                    p: 1,
                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    '&:hover': {
                      background: isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)',
                      borderColor: '#10b981',
                      transform: 'rotate(15deg) scale(1.08)',
                    },
                  }}
                >
                  {isDark ? (
                    <LightModeOutlinedIcon sx={{ fontSize: 20, color: '#facc15' }} />
                  ) : (
                    <DarkModeOutlinedIcon sx={{ fontSize: 20, color: '#10b981' }} />
                  )}
                </IconButton>
              </Tooltip>
            </Box>

            {/* Mobile Controls (Mobile Only) */}
            <Box
              sx={{
                gridColumn: 2,
                justifySelf: 'end',
                display: { md: 'none' },
                alignItems: 'center',
                gap: 1,
              }}
            >
              <IconButton
                onClick={toggleColorMode}
                size="small"
                aria-label="Toggle light and dark theme"
                sx={{
                  color: isDark ? '#f1f5f9' : '#0f172a',
                  background: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                  p: 0.8,
                }}
              >
                {isDark ? (
                  <LightModeOutlinedIcon sx={{ fontSize: 18, color: '#facc15' }} />
                ) : (
                  <DarkModeOutlinedIcon sx={{ fontSize: 18, color: '#10b981' }} />
                )}
              </IconButton>

              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{
                  background: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
                  backdropFilter: 'blur(12px)',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                  '&:hover': { background: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)' },
                }}
              >
                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="top"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            mt: '80px',
            mx: '16px',
            borderRadius: '24px',
            background: isDark ? 'rgba(8, 14, 10, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(30px) saturate(190%)',
            WebkitBackdropFilter: 'blur(30px) saturate(190%)',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.1)',
            boxShadow: isDark
              ? '0 20px 40px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.3)'
              : '0 20px 40px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.8)',
            p: 2,
          },
        }}
      >
        <List sx={{ width: '100%', py: 1 }}>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => handleNavClick(item.href, item.id)}
                sx={{
                  borderRadius: '14px',
                  py: 1.5,
                  background: activeSection === item.id ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                  '&:hover': {
                    background: 'rgba(16, 185, 129, 0.2)',
                  },
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontFamily: MONO_FONT_STACK,
                        fontWeight: 700,
                        fontSize: '0.96rem',
                        textAlign: 'center',
                        color: activeSection === item.id ? '#34d399' : isDark ? '#f8fafc' : '#0f172a',
                      }}
                    >
                      {item.label}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding sx={{ mt: 1 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleNavClick('#contact', 'contact')}
              sx={{
                py: 1.5,
                borderRadius: '16px',
                fontFamily: MONO_FONT_STACK,
                fontWeight: 700,
                fontSize: '0.88rem',
              }}
            >
              Get in Touch
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </NavContainer>
  );
};

export default NavBar;
