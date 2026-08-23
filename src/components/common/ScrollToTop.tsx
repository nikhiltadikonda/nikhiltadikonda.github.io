import React, { useState, useEffect } from 'react';
import { IconButton, Tooltip, Zoom, styled } from '@mui/material';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import { useColorMode } from '../../context/ThemeContext';

const ScrollBubbleButton = styled(IconButton)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    position: 'fixed',
    bottom: 24,
    right: 20,
    zIndex: 1200,
    width: 48,
    height: 48,
    borderRadius: '50%',
    backdropFilter: 'blur(24px) saturate(190%)',
    WebkitBackdropFilter: 'blur(24px) saturate(190%)',
    background: isDark
      ? 'linear-gradient(135deg, rgba(14, 24, 18, 0.88) 0%, rgba(7, 12, 9, 0.92) 100%)'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(246, 250, 248, 0.85) 100%)',
    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 0.9)'}`,
    boxShadow: isDark
      ? '0 12px 28px -4px rgba(0, 0, 0, 0.6), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.3)'
      : '0 8px 24px -4px rgba(0, 0, 0, 0.08), inset 0 1px 2px 0 rgba(255, 255, 255, 1)',
    color: isDark ? '#34d399' : '#059669',
    transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-4px) scale(1.12)',
      borderColor: '#10b981',
      color: '#ffffff',
      background: isDark
        ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.4) 0%, rgba(6, 182, 212, 0.3) 100%)'
        : 'linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 0.9) 100%)',
      boxShadow: isDark
        ? '0 16px 36px -4px rgba(16, 185, 129, 0.55), inset 0 1px 2px rgba(255, 255, 255, 0.6)'
        : '0 12px 28px -4px rgba(16, 185, 129, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.8)',
      '& .MuiSvgIcon-root': {
        transform: 'translateY(-2px)',
      },
    },
    '&:active': {
      transform: 'scale(0.92)',
    },
    '& .MuiSvgIcon-root': {
      fontSize: 28,
      transition: 'transform 0.25s ease',
    },
    [theme.breakpoints.up('md')]: {
      bottom: 32,
      right: 32,
      width: 52,
      height: 52,
      '& .MuiSvgIcon-root': {
        fontSize: 30,
      },
    },
  };
});

export const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { mode } = useColorMode();

  useEffect(() => {
    const handleScroll = () => {
      // Show as soon as user scrolls past the About section
      const aboutElement = document.getElementById('about');
      if (aboutElement) {
        const aboutBottom = aboutElement.offsetTop + aboutElement.offsetHeight - 150;
        setVisible(window.scrollY > aboutBottom);
      } else {
        setVisible(window.scrollY > 450);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Zoom in={visible} timeout={300} unmountOnExit>
      <Tooltip title="Scroll to top" arrow placement="left">
        <ScrollBubbleButton
          onClick={scrollToTop}
          aria-label="Scroll back to the top of the page"
        >
          <KeyboardArrowUpRoundedIcon />
        </ScrollBubbleButton>
      </Tooltip>
    </Zoom>
  );
};

export default ScrollToTop;

