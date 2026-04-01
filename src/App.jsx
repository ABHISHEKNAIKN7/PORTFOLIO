import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import CanvasBackground from './components/ui/CanvasBackground';
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
import { defaultPortfolioContent, PORTFOLIO_STORAGE_KEY } from './data/portfolioContent';
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
  const trailLength = 12;
  const [cursorTrail, setCursorTrail] = useState(
    Array.from({ length: trailLength }, () => ({ x: 0, y: 0, angle: 0 }))
  );
  const [portfolioContent, setPortfolioContent] = useState(defaultPortfolioContent);
  const [visitorCount, setVisitorCount] = useState(0);
  const [clickStats, setClickStats] = useState({});
  const pointerRef = useRef({ x: 0, y: 0 });
  const trailRef = useRef(Array.from({ length: trailLength }, () => ({ x: 0, y: 0, angle: 0 })));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    initGoogleAnalytics();
  }, []);

  useEffect(() => {
    const savedContent = window.localStorage.getItem(PORTFOLIO_STORAGE_KEY);

    if (!savedContent) {
      return;
    }

    try {
      const parsedContent = JSON.parse(savedContent);
      const mergeById = (savedItems = [], defaultItems = []) => {
        const savedIds = new Set(savedItems.map((item) => item.id));
        const missingDefaults = defaultItems.filter((item) => !savedIds.has(item.id));
        return [...savedItems, ...missingDefaults];
      };

      setPortfolioContent({
        projects: parsedContent.projects || defaultPortfolioContent.projects,
        skills: mergeById(parsedContent.skills || [], defaultPortfolioContent.skills),
        experience: parsedContent.experience || defaultPortfolioContent.experience,
        certificates: mergeById(parsedContent.certificates || [], defaultPortfolioContent.certificates),
      });
    } catch (error) {
      console.error('Failed to parse portfolio content:', error);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(portfolioContent));
  }, [portfolioContent]);

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
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;

      setMousePosition({ x, y });
      pointerRef.current = { x: event.clientX, y: event.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let frameId;

    const animateTrail = () => {
      const nextTrail = trailRef.current.map((segment, index) => {
        const target = index === 0 ? pointerRef.current : trailRef.current[index - 1];
        const easing = Math.max(0.16, 0.34 - index * 0.02);
        const nextX = segment.x + (target.x - segment.x) * easing;
        const nextY = segment.y + (target.y - segment.y) * easing;
        const angle = Math.atan2(target.y - nextY, target.x - nextX) * (180 / Math.PI);

        return {
          x: nextX,
          y: nextY,
          angle,
        };
      });

      trailRef.current = nextTrail;
      setCursorTrail(nextTrail);
      frameId = window.requestAnimationFrame(animateTrail);
    };

    frameId = window.requestAnimationFrame(animateTrail);

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  const handleAddProject = (project) => {
    setPortfolioContent((current) => ({
      ...current,
      projects: [project, ...current.projects],
    }));
  };

  const handleUpdateProject = (updatedProject) => {
    setPortfolioContent((current) => ({
      ...current,
      projects: current.projects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      ),
    }));
  };

  const handleAddSkill = (skill) => {
    setPortfolioContent((current) => ({
      ...current,
      skills: [skill, ...current.skills],
    }));
  };

  const handleUpdateSkill = (updatedSkill) => {
    setPortfolioContent((current) => ({
      ...current,
      skills: current.skills.map((skill) =>
        skill.id === updatedSkill.id ? updatedSkill : skill
      ),
    }));
  };

  const handleAddExperience = (experienceItem) => {
    setPortfolioContent((current) => ({
      ...current,
      experience: [experienceItem, ...current.experience],
    }));
  };

  const handleUpdateExperience = (updatedExperience) => {
    setPortfolioContent((current) => ({
      ...current,
      experience: current.experience.map((item) =>
        item.id === updatedExperience.id ? updatedExperience : item
      ),
    }));
  };

  const handleAddCertificate = (certificate) => {
    setPortfolioContent((current) => ({
      ...current,
      certificates: [certificate, ...current.certificates],
    }));
  };

  const handleUpdateCertificate = (updatedCertificate) => {
    setPortfolioContent((current) => ({
      ...current,
      certificates: current.certificates.map((certificate) =>
        certificate.id === updatedCertificate.id ? updatedCertificate : certificate
      ),
    }));
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* 3D Particle Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BackgroundEffects mousePosition={mousePosition} />
        <CanvasBackground theme={theme} />
      </div>

      <div className="cursor-trail-wrap">
        {cursorTrail.map((segment, index) => (
          <motion.div
            key={index}
            className={`cursor-follower cursor-follower-${index === 0 ? 'head' : 'tail'}`}
            animate={{
              x: segment.x - (index === 0 ? 18 : 16),
              y: segment.y - 7,
              rotate: segment.angle,
              scale: Math.max(0.34, 1 - index * 0.08),
              opacity: Math.max(0.06, 0.56 - index * 0.04),
            }}
            transition={{ duration: 0.12, ease: 'linear' }}
            style={{
              width: `${Math.max(14, 36 - index * 2)}px`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center w-full">
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        
        <main className="w-full flex flex-col pb-24">
          <HeroPremium />
          <About />
          <Projects
            projects={portfolioContent.projects}
            onAddProject={handleAddProject}
            onUpdateProject={handleUpdateProject}
          />
          <Skills
            skills={portfolioContent.skills}
            onAddSkill={handleAddSkill}
            onUpdateSkill={handleUpdateSkill}
          />
          <Experience
            experience={portfolioContent.experience}
            onAddExperience={handleAddExperience}
            onUpdateExperience={handleUpdateExperience}
          />
          <Certificates
            certificates={portfolioContent.certificates}
            onAddCertificate={handleAddCertificate}
            onUpdateCertificate={handleUpdateCertificate}
          />
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
