import React from 'react';
import { Tooltip, styled } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import XIcon from '@mui/icons-material/X';
import { ContactItem } from '../types';

interface ImageIconProps {
  item: ContactItem;
}

const SocialButton = styled('a')(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    width: 52,
    height: 52,
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: isDark
      ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)'
      : 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(241, 245, 249, 0.8) 100%)',
    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.14)' : 'rgba(0, 0, 0, 0.08)'}`,
    boxShadow: isDark
      ? '0 8px 20px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4)'
      : '0 6px 16px rgba(0, 0, 0, 0.06), inset 0 1px 2px rgba(255, 255, 255, 1)',
    color: isDark ? '#f8fafc' : '#0f172a',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    '&:hover': {
      transform: 'translateY(-4px) scale(1.08)',
      borderColor: '#10b981',
      color: '#10b981',
      background: isDark
        ? 'linear-gradient(180deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.1) 100%)'
        : 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(236, 253, 245, 0.9) 100%)',
      boxShadow: isDark
        ? '0 12px 28px -4px rgba(16, 185, 129, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.6)'
        : '0 10px 24px -4px rgba(16, 185, 129, 0.25), inset 0 1px 2px rgba(255, 255, 255, 1)',
    },
    '&:active': {
      transform: 'scale(0.95)',
    },
  };
});

const renderIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('github')) {
    return <GitHubIcon sx={{ fontSize: 24 }} />;
  }
  if (lower.includes('linkedin')) {
    return <LinkedInIcon sx={{ fontSize: 24 }} />;
  }
  if (lower.includes('email') || lower.includes('envelope')) {
    return <EmailIcon sx={{ fontSize: 24 }} />;
  }
  if (lower.includes('x') || lower.includes('twitter')) {
    return <XIcon sx={{ fontSize: 22 }} />;
  }
  return <EmailIcon sx={{ fontSize: 24 }} />;
};

export const ImageIcon: React.FC<ImageIconProps> = ({ item }) => {
  return (
    <Tooltip title={item.name} arrow>
      <SocialButton
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={item.ariaLabel}
      >
        {renderIcon(item.name)}
      </SocialButton>
    </Tooltip>
  );
};

export default ImageIcon;
