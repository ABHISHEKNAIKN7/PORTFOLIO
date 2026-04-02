import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import HeroPremium from './components/sections/HeroPremium';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Certificates from './components/sections/Certificates';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';
import StatsPanel from './components/StatsPanel';
import { defaultPortfolioContent } from './data/portfolioContent';
import { initGoogleAnalytics, LOCAL_CLICK_STATS_KEY, trackEvent } from './utils/analytics';

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  const savedTheme = window.localStorage.getItem('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const BackgroundEffects = ({ mousePosition }) => {
  const { x, y } = mousePosition;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="background-noise"
        style={{
          transform: `translate3d(${x * 14}px, ${y * 10}px, 0)`,
        }}
      />
      <motion.div
        className="background-orb background-orb-purple"
        animate={{
          x: x * 90,
          y: y * 70,
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{
          x: { type: 'spring', stiffness: 70, damping: 18 },
          y: { type: 'spring', stiffness: 70, damping: 18 },
          scale: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
      <motion.div
        className="background-orb background-orb-cyan"
        animate={{
          x: x * -120,
          y: y * -85,
          scale: [1, 0.92, 1.06, 1],
        }}
        transition={{
          x: { type: 'spring', stiffness: 65, damping: 18 },
          y: { type: 'spring', stiffness: 65, damping: 18 },
          scale: { duration: 11, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
      <motion.div
        className="background-beam"
        animate={{
          x: x * 130,
          y: y * 90,
          rotate: 18 + x * 8,
        }}
        transition={{ type: 'spring', stiffness: 55, damping: 16 }}
      />
      <motion.div
        className="background-ring"
        animate={{
          x: x * -70,
          y: y * 55,
          rotate: y * 10,
        }}
        transition={{ type: 'spring', stiffness: 60, damping: 18 }}
      />
    </div>
  );
};

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visitorCount, setVisitorCount] = useState(0);
  const [clickStats, setClickStats] = useState({});

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    initGoogleAnalytics();
  }, []);

  useEffect(() => {
    const counterKey = 'portfolio-visitor-counter';
    const sessionKey = 'portfolio-visitor-session-counted';
    const existingCount = Number(window.localStorage.getItem(counterKey) || '0');
    setClickStats(JSON.parse(window.localStorage.getItem(LOCAL_CLICK_STATS_KEY) || '{}'));

    if (!window.sessionStorage.getItem(sessionKey)) {
      const nextCount = existingCount + 1;
      window.localStorage.setItem(counterKey, String(nextCount));
      window.sessionStorage.setItem(sessionKey, 'true');
      setVisitorCount(nextCount);
      trackEvent('portfolio_visit', { visit_count: nextCount });
      return;
    }

    setVisitorCount(existingCount);
  }, []);

  useEffect(() => {
    const syncLocalStats = () => {
      setClickStats(JSON.parse(window.localStorage.getItem(LOCAL_CLICK_STATS_KEY) || '{}'));
      setVisitorCount(Number(window.localStorage.getItem('portfolio-visitor-counter') || '0'));
    };

    window.addEventListener('focus', syncLocalStats);
    window.addEventListener('storage', syncLocalStats);

    return () => {
      window.removeEventListener('focus', syncLocalStats);
      window.removeEventListener('storage', syncLocalStats);
    };
  }, []);

  useEffect(() => {
    let frameId = 0;

    const handleMouseMove = (event) => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 2;
        const y = (event.clientY / window.innerHeight - 0.5) * 2;
        setMousePosition({ x, y });
        frameId = 0;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="relative w-full min-h-screen">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BackgroundEffects mousePosition={mousePosition} />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full">
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        
        <main className="w-full flex flex-col pb-24">
          <HeroPremium />
          <About />
          <Projects projects={defaultPortfolioContent.projects} />
          <Skills skills={defaultPortfolioContent.skills} />
          <Experience experience={defaultPortfolioContent.experience} />
          <Certificates certificates={defaultPortfolioContent.certificates} />
          <Contact />
          <StatsPanel visitorCount={visitorCount} clickStats={clickStats} />
        </main>
        <Footer visitorCount={visitorCount} />
      </div>
      <Analytics />
    </div>
  );
}

export default App;
