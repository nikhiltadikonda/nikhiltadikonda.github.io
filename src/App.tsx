import React from 'react';
import { Box } from '@mui/material';
import NavBar from './components/NavBar';
import AmbientBackground from './components/layout/AmbientBackground';
import ScrollToTop from './components/common/ScrollToTop';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';

export const App: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      {/* Background ambient lighting, mesh, and Matrix rain */}
      <AmbientBackground />

      {/* Floating Liquid Glass Navigation */}
      <NavBar />

      {/* Main Sections */}
      <Box component="main">
        <About />
        <Skills />
        <Projects />
        <Contact />
      </Box>

      {/* Floating Liquid Glass Scroll-To-Top Bubble */}
      <ScrollToTop />
    </Box>
  );
};

export default App;
