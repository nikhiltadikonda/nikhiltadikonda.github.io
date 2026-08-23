import React from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Divider,
  styled,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import profile from '../images/profile.png';
import ImageIcon from '../components/ImageIcon';
import GlassCard from '../components/common/GlassCard';
import GradientText from '../components/common/GradientText';
import DecodedText from '../components/common/DecodedText';
import contact_data from '../helpers/contact_data';
import { MONO_FONT_STACK } from '../theme/tokens';

/* Styled Sub-components */

const ContactSectionWrapper = styled('section')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(6),
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(12),
  },
}));

const CtaCard = styled(GlassCard)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  marginBottom: theme.spacing(8),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(6),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(8),
  },
}));

const TopLightFlare = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  width: '60%',
  height: 2,
  background: 'linear-gradient(90deg, transparent, #10b981, #06b6d4, transparent)',
}));

const AvatarBadgeWrapper = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  position: 'relative',
  marginBottom: theme.spacing(3),
}));

const AvatarRing = styled(Box)(() => ({
  width: 96,
  height: 96,
  borderRadius: '50%',
  padding: 3,
  background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
  boxShadow: '0 0 24px rgba(16, 185, 129, 0.5)',
}));

const AvatarImg = styled('img')(() => ({
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  objectFit: 'cover',
}));

const CtaHeading = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '2rem',
  letterSpacing: '-0.02em',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    fontSize: '2.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.85rem',
  },
}));

const CtaBio = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  maxWidth: 520,
  marginLeft: 'auto',
  marginRight: 'auto',
  fontSize: '1.1rem',
  lineHeight: 1.7,
  marginBottom: theme.spacing(4),
}));

const CtaButton = styled(Button)(() => ({
  paddingTop: 14,
  paddingBottom: 14,
  paddingLeft: 36,
  paddingRight: 36,
  fontSize: '1.05rem',
  fontWeight: 700,
}));

const SocialRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: theme.spacing(2.5),
  marginTop: theme.spacing(5),
}));

const FooterDivider = styled(Divider)(({ theme }) => ({
  borderColor: theme.palette.divider,
  marginBottom: theme.spacing(4),
}));

const FooterContainer = styled('footer')(({ theme }) => ({
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(1.5),
}));

const FooterTagline = styled(DecodedText)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    color: isDark ? '#94a3b8' : '#475569',
    padding: '6px 18px',
    borderRadius: 9999,
    background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.04)',
    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
    fontWeight: 600,
    letterSpacing: '0.01em',
    fontSize: '0.8rem',
    display: 'inline-block',
    userSelect: 'none',
  };
});

/* Main Contact Component */

export const Contact: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const yearString = currentYear === 2021 ? '2021' : `2021 - ${currentYear}`;

  return (
    <ContactSectionWrapper id="contact">
      <Container maxWidth="md">
        {/* Large Liquid Glass CTA Card */}
        <CtaCard>
          <TopLightFlare />

          {/* Profile Avatar */}
          <AvatarBadgeWrapper>
            <AvatarRing>
              <AvatarImg
                src={profile}
                alt="Nikhil Tadikonda"
              />
            </AvatarRing>
          </AvatarBadgeWrapper>

          <CtaHeading variant="h3">
            Let's build something{' '}
            <GradientText variantType="accent">
              extraordinary!
            </GradientText>
          </CtaHeading>

          <CtaBio variant="body1">
            Whether you have an ambitious project in mind, a technical question, or just want to connect — my inbox is always open.
          </CtaBio>

          <CtaButton
            variant="contained"
            size="large"
            startIcon={<EmailIcon />}
            endIcon={<SendIcon sx={{ fontSize: '18px !important' }} />}
            onClick={() => window.open('mailto:nikhiltadikonda@gmail.com')}
          >
            Send an Email
          </CtaButton>

          {/* Social Links Row (Clean, Centered Horizontal Row) */}
          <SocialRow>
            {contact_data.map((item) => (
              <ImageIcon key={item.id} item={item} />
            ))}
          </SocialRow>
        </CtaCard>

        <FooterDivider />

        {/* Modern Glass Footer */}
        <FooterContainer>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontFamily: MONO_FONT_STACK,
              fontSize: '0.82rem',
              letterSpacing: '-0.01em',
            }}
          >
            © {yearString} Nikhil Tadikonda • All rights reserved.
          </Typography>

          <FooterTagline
            variant="caption"
            text="Solving problems, one release at a time! 🚀"
            holdDecodedTime={3500}
            holdEncodedTime={2500}
            encodeDuration={900}
            decodeDuration={900}
          />
        </FooterContainer>
      </Container>
    </ContactSectionWrapper>
  );
};

export default Contact;
