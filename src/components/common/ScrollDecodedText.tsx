import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Typography, TypographyProps } from '@mui/material';

const GLYPHS = '01アイウエオカキクケコサシスセソタチツテトナニヌネハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEF0123456789<>/\\_-$#@!%&*';

export interface ScrollDecodedTextProps extends Omit<TypographyProps, 'children'> {
  text: string;
  decodeDuration?: number; // duration of decode transition in ms (default 900)
  threshold?: number;      // IntersectionObserver threshold (default 0.1)
  rootMargin?: string;     // IntersectionObserver rootMargin (default '-20px 0px -20px 0px')
}

export const ScrollDecodedText: React.FC<ScrollDecodedTextProps> = ({
  text,
  decodeDuration = 900,
  threshold = 0.1,
  rootMargin = '-20px 0px -20px 0px',
  component = 'span',
  sx,
  ...props
}) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const animFrameRef = useRef<number | null>(null);

  // Separate emoji suffixes at the end so emojis remain intact during scramble
  const { baseText, suffix, length } = useMemo(() => {
    const emojiMatch = text.match(/(\s*[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]+)$/u);
    const s = emojiMatch ? emojiMatch[1] : '';
    const b = emojiMatch ? text.slice(0, -s.length) : text;
    return { baseText: b, suffix: s, length: b.length };
  }, [text]);

  // Helper to generate a random encoded string of identical length
  const getRandomGlyphs = React.useCallback(() => {
    let result = '';
    for (let i = 0; i < length; i++) {
      if (baseText[i] === ' ') {
        result += ' ';
      } else {
        result += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
    }
    return result;
  }, [baseText, length]);

  // Initial state: starts encoded
  const [displayText, setDisplayText] = useState(() => getRandomGlyphs() + suffix);

  // Set up IntersectionObserver to detect when section/title is in view
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  // Handle decoding when moving into view, and encoding when scrolling away
  useEffect(() => {
    // Respect user's reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setDisplayText(text);
      return;
    }

    if (isInView) {
      // Decode effect: smoothly reveals plain text from left to right while unrevealed characters scramble
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

      const startTime = performance.now();

      const updateDecode = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / decodeDuration, 1);
        const resolvedCount = Math.floor(progress * length);

        let current = '';
        for (let i = 0; i < length; i++) {
          if (baseText[i] === ' ') {
            current += ' ';
          } else if (i < resolvedCount) {
            current += baseText[i];
          } else {
            current += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }

        setDisplayText(current + suffix);

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(updateDecode);
        } else {
          setDisplayText(text);
        }
      };

      animFrameRef.current = requestAnimationFrame(updateDecode);
    } else {
      // Scrolled away: cancel any running decode animation and immediately encode the text
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      setDisplayText(getRandomGlyphs() + suffix);
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isInView, text, decodeDuration, baseText, length, suffix, getRandomGlyphs]);

  return (
    <Typography
      ref={containerRef}
      component={component}
      sx={{
        display: 'inline-block',
        ...sx,
      }}
      {...props}
    >
      {displayText}
    </Typography>
  );
};

export default ScrollDecodedText;
