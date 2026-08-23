import React, { useEffect, useRef } from 'react';
import { styled } from '@mui/material';
import { useColorMode } from '../../context/ThemeContext';
import { MONO_FONT_STACK } from '../../theme/tokens';

const MatrixCanvas = styled('canvas')(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  pointerEvents: 'none',
  zIndex: 0,
}));

export const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { mode } = useColorMode();
  const isDark = mode === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check user preference for reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Matrix characters: Binary, Hex, and classic Matrix glyphs
    const characters =
      '0101010101アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>{}/=*+';
    const charArray = characters.split('');

    const fontSize = 14;
    let columns = Math.floor(width / fontSize);
    // Stagger initial drop vertical positions
    let drops: number[] = Array.from({ length: columns }, () => Math.floor(Math.random() * -60));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -60));
    };

    window.addEventListener('resize', handleResize);

    let lastTime = 0;
    const fps = 24; // Subtle cinematic framerate
    const interval = 1000 / fps;

    const draw = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(draw);

      const delta = currentTime - lastTime;
      if (delta < interval) return;
      lastTime = currentTime - (delta % interval);

      // Semi-transparent fade layer to create authentic trailing rain effect
      ctx.fillStyle = isDark ? 'rgba(5, 9, 7, 0.18)' : 'rgba(246, 251, 248, 0.18)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px ${MONO_FONT_STACK}`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Leading character is high-contrast
        if (Math.random() > 0.82) {
          ctx.fillStyle = isDark ? '#34d399' : '#047857';
        } else {
          ctx.fillStyle = isDark ? 'rgba(16, 185, 129, 0.55)' : 'rgba(5, 150, 105, 0.75)';
        }

        if (y > 0) {
          ctx.fillText(text, x, y);
        }

        // Reset drop with randomized probability after falling past screen bottom
        if (y > height && Math.random() > 0.978) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDark]);

  return (
    <MatrixCanvas
      ref={canvasRef}
      sx={{
        opacity: isDark ? 0.35 : 0.48,
      }}
      aria-hidden="true"
    />
  );
};

export default MatrixRain;

