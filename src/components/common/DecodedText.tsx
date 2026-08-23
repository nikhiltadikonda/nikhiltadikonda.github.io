import React, { useState, useEffect, useRef } from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { MONO_FONT_STACK } from '../../theme/tokens';

const GLYPHS = '01アイウエオカキクケコサシスセソタチツテトナニヌネハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEF0123456789<>/\\_-$#@!%&*';

interface DecodedTextProps extends TypographyProps {
  text: string;
  holdDecodedTime?: number; // time to stay in plain text (default 3500ms)
  holdEncodedTime?: number; // time to stay in encoded text (default 2500ms)
  encodeDuration?: number;  // duration of encode transition (default 1000ms)
  decodeDuration?: number;  // duration of decode transition (default 1000ms)
}

export const DecodedText: React.FC<DecodedTextProps> = ({
  text,
  holdDecodedTime = 3500,
  holdEncodedTime = 2500,
  encodeDuration = 1000,
  decodeDuration = 1000,
  sx,
  ...props
}) => {
  const [displayText, setDisplayText] = useState(text);
  const animFrameRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Separate emojis at the end if present so they remain intact
    const emojiMatch = text.match(/(\s*[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]+)$/u);
    const suffix = emojiMatch ? emojiMatch[1] : '';
    const baseText = emojiMatch ? text.slice(0, -suffix.length) : text;
    const length = baseText.length;

    // Helper to generate a random encoded string of same length
    const getRandomGlyphs = () => {
      let result = '';
      for (let i = 0; i < length; i++) {
        if (baseText[i] === ' ') {
          result += ' ';
        } else {
          result += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      return result;
    };

    let encodedSnapshot = getRandomGlyphs();

    // 1. Decode Animation: transforms from encodedSnapshot -> baseText
    const startDecode = () => {
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
            // Jumble remaining encoded characters
            current += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }

        setDisplayText(current + suffix);

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(updateDecode);
        } else {
          setDisplayText(text);
          // Wait in decoded plain text state, then encode
          timerRef.current = setTimeout(startEncode, holdDecodedTime);
        }
      };

      animFrameRef.current = requestAnimationFrame(updateDecode);
    };

    // 2. Encode Animation: transforms from baseText -> encodedSnapshot
    const startEncode = () => {
      const startTime = performance.now();
      encodedSnapshot = getRandomGlyphs();

      const updateEncode = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / encodeDuration, 1);
        const encodedCount = Math.floor(progress * length);

        let current = '';
        for (let i = 0; i < length; i++) {
          if (baseText[i] === ' ') {
            current += ' ';
          } else if (i < encodedCount) {
            current += encodedSnapshot[i];
          } else {
            current += baseText[i];
          }
        }

        setDisplayText(current + suffix);

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(updateEncode);
        } else {
          setDisplayText(encodedSnapshot + suffix);
          // Wait in fully encoded state, then decode
          timerRef.current = setTimeout(startDecode, holdEncodedTime);
        }
      };

      animFrameRef.current = requestAnimationFrame(updateEncode);
    };

    // Start with initial pause on decoded text, then begin encode cycle
    timerRef.current = setTimeout(startEncode, holdDecodedTime);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, holdDecodedTime, holdEncodedTime, encodeDuration, decodeDuration]);

  return (
    <Typography
      sx={{
        fontFamily: MONO_FONT_STACK,
        ...sx,
      }}
      {...props}
    >
      {displayText}
    </Typography>
  );
};

export default DecodedText;
