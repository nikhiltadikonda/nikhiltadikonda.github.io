import React, { useState } from 'react';
import {
  CardContent,
  Typography,
  IconButton,
  Button,
  Box,
  CircularProgress,
  Tooltip,
  Collapse,
  styled,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useColorMode } from '../context/ThemeContext';
import { useQuote } from '../hooks/useQuote';
import GlassCard from './common/GlassCard';

/* Styled Sub-components */

const QuoteWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const CollapsedQuoteButton = styled(Button)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    padding: '8px 20px',
    borderRadius: 9999,
    background: isDark ? 'rgba(10, 18, 14, 0.65)' : 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)'}`,
    color: isDark ? '#e2e8f0' : '#0f172a',
    fontSize: '0.88rem',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: isDark
      ? '0 8px 24px -4px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.25)'
      : '0 4px 14px rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
    transition: 'all 0.25s ease',
    '&:hover': {
      background: isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.08)',
      borderColor: 'rgba(16, 185, 129, 0.5)',
      transform: 'translateY(-2px)',
    },
  };
});

const QuoteGlassCard = styled(GlassCard)(() => ({
  position: 'relative',
  overflow: 'hidden',
  borderLeft: '4px solid #10b981',
}));

const QuoteCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3),
  '&:last-child': {
    paddingBottom: theme.spacing(3),
  },
}));

const QuoteHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(1.5),
}));

const QuoteIconBadge = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    width: 28,
    height: 28,
    borderRadius: 8,
    background: isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: isDark ? '#34d399' : '#059669',
  };
});

const QuoteHeaderTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: theme.palette.mode === 'dark' ? '#34d399' : '#059669',
}));

const QuoteActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.8),
}));

const ActionIconButton = styled(IconButton)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    color: isDark ? '#94a3b8' : '#64748b',
    background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
    padding: 6,
    '&:hover': {
      color: isDark ? '#ffffff' : '#0f172a',
      background: isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.12)',
      borderColor: '#10b981',
    },
    '&.danger-hover:hover': {
      color: '#ef4444',
      background: 'rgba(239, 68, 68, 0.1)',
      borderColor: 'rgba(239, 68, 68, 0.4)',
    },
  };
});

/* Scrollable quote text container */
const ScrollableQuoteTextContainer = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    maxHeight: 130,
    overflowY: 'auto',
    marginBottom: theme.spacing(1.5),
    paddingRight: theme.spacing(1),
    scrollbarWidth: 'thin',
    scrollbarColor: isDark
      ? 'rgba(255, 255, 255, 0.2) transparent'
      : 'rgba(0, 0, 0, 0.2) transparent',
    '&::-webkit-scrollbar': {
      width: 4,
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
      borderRadius: 9999,
    },
  };
});

const QuoteText = styled(Typography)(({ theme }) => ({
  fontStyle: 'italic',
  color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#0f172a',
  lineHeight: 1.6,
  fontWeight: 400,
  fontSize: '1rem',
}));

const AuthorContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
}));

const AuthorText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.secondary,
  fontSize: '0.88rem',
}));

export const QuoteCard: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const { quote, loading, isRotating, fetchQuote } = useQuote();
  const { mode } = useColorMode();
  const isDark = mode === 'dark';

  return (
    <QuoteWrapper>
      {/* Collapsed Pill Button */}
      {!isVisible && (
        <CollapsedQuoteButton
          onClick={() => setIsVisible(true)}
          startIcon={<FormatQuoteIcon sx={{ color: isDark ? '#34d399' : '#059669' }} />}
          endIcon={<VisibilityIcon sx={{ fontSize: 18, color: isDark ? '#94a3b8' : '#64748b' }} />}
        >
          Show Quote of the Moment
        </CollapsedQuoteButton>
      )}

      {/* Expanded Full Liquid Glass Quote Card */}
      <Collapse in={isVisible} timeout={300} unmountOnExit>
        <QuoteGlassCard>
          <QuoteCardContent>
            <QuoteHeader>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <QuoteIconBadge>
                  <FormatQuoteIcon sx={{ fontSize: 18 }} />
                </QuoteIconBadge>
                <QuoteHeaderTitle variant="caption">
                  Quote of the Moment
                </QuoteHeaderTitle>
              </Box>

              <QuoteActions>
                {/* Refresh Quote Button */}
                <Tooltip title="Get a new quote" arrow>
                  <span>
                    <ActionIconButton
                      size="small"
                      onClick={fetchQuote}
                      disabled={loading}
                    >
                      {loading ? (
                        <CircularProgress size={16} sx={{ color: '#10b981' }} />
                      ) : (
                        <RefreshIcon
                          sx={{
                            fontSize: 16,
                            transform: isRotating ? 'rotate(360deg)' : 'rotate(0deg)',
                            transition: 'transform 0.5s ease',
                          }}
                        />
                      )}
                    </ActionIconButton>
                  </span>
                </Tooltip>

                {/* Hide/Collapse Quote Card Button */}
                <Tooltip title="Hide quote" arrow>
                  <ActionIconButton
                    className="danger-hover"
                    size="small"
                    onClick={() => setIsVisible(false)}
                  >
                    <VisibilityOffIcon sx={{ fontSize: 16 }} />
                  </ActionIconButton>
                </Tooltip>
              </QuoteActions>
            </QuoteHeader>

            {/* Scrollable container for the quote text */}
            <ScrollableQuoteTextContainer>
              <QuoteText variant="body1">
                "{quote.text}"
              </QuoteText>
            </ScrollableQuoteTextContainer>

            <AuthorContainer>
              <AuthorText variant="body2">
                — {quote.author || 'Anonymous'}
              </AuthorText>
            </AuthorContainer>
          </QuoteCardContent>
        </QuoteGlassCard>
      </Collapse>
    </QuoteWrapper>
  );
};

export default QuoteCard;
