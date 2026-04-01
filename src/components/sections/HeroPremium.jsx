import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { trackLinkClick } from '../../utils/analytics';

const InteractiveShape = ({ position, scale, color, speed, distort, floatIntensity }) => {
  const mesh = useRef();

  useFrame((state) => {
    if (!mesh.current) {
      return;
    }

    mesh.current.position.x += ((position[0] + state.mouse.x * 0.7) - mesh.current.position.x) * 0.04;
    mesh.current.position.y += ((position[1] + state.mouse.y * 0.45) - mesh.current.position.y) * 0.04;
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.012;
  });

  return (
    <Float speed={speed} rotationIntensity={1.5} floatIntensity={floatIntensity}>
      <Icosahedron ref={mesh} position={position} args={[scale, 0]}>
        <MeshDistortMaterial
          color="#1a1a2e"
          emissive={color}
          emissiveIntensity={0.55}
          distort={distort}
          speed={speed}
          wireframe
        />
      </Icosahedron>
    </Float>
  );
};

const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#aa3bff" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#00f0ff" />

        <InteractiveShape
          position={[2, 1, -1]}
          scale={1}
          color="#aa3bff"
          speed={2}
          distort={0.4}
          floatIntensity={2}
        />
        <InteractiveShape
          position={[-2, -1, 0]}
          scale={0.7}
          color="#00f0ff"
          speed={3}
          distort={0.3}
          floatIntensity={1.5}
        />
      </Canvas>
    </div>
  );
};

const HeroPremium = () => {
  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-12">
      <FloatingShapes />
      <div className="absolute inset-x-0 top-24 mx-auto h-80 w-[78%] rounded-full bg-[radial-gradient(circle,rgba(0,240,255,0.12),transparent_62%)] blur-[90px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full px-6 md:px-12">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="hero-kicker mb-6 inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm md:text-base font-medium backdrop-blur-md"
            >
              <span className="h-2 w-2 rounded-full bg-[#00f0ff] shadow-[0_0_16px_rgba(0,240,255,0.9)]" />
              Available for internships, freelance, and full-stack builds
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-4 text-sm uppercase tracking-[0.42em] text-theme-secondary"
            >
              Abhishek K
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hero-title text-5xl md:text-7xl lg:text-[6.2rem] font-black tracking-tight mb-6 leading-[0.92]"
            >
              Building fast,
              <br />
              <span className="text-glow-purple text-[#aa3bff]">modern products</span>
              <br />
              for the web.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="hero-role text-lg md:text-2xl text-theme-secondary mb-5 max-w-2xl font-light leading-relaxed mx-auto lg:mx-0"
            >
              Full Stack Web Development <span className="text-[#00f0ff]">|</span> Backend Development <span className="text-[#00f0ff]">|</span> Python <span className="text-[#00f0ff]">|</span> Cybersecurity
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-theme-secondary max-w-2xl mb-10 text-base md:text-lg leading-8 mx-auto lg:mx-0"
            >
              I design and develop responsive, scalable web experiences with strong interest in both full stack web development and backend systems, with a focus on clean UI, solid architecture, performance, and practical problem solving.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center lg:items-start gap-4"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#aa3bff] to-[#00f0ff] text-white font-medium hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(170,59,255,0.4)]"
              >
                View Projects
                <ArrowRight size={18} />
              </a>

              <a
                href="#contact"
                className="px-8 py-3 rounded-full border border-theme hover:bg-theme-soft text-theme-primary font-medium transition-colors duration-300 backdrop-blur-md"
              >
                Let&apos;s Talk
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.72 }}
              className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
            >
              <div className="grid grid-cols-3 gap-4 mx-auto lg:mx-0 max-w-xl">
                <div className="glass-card rounded-2xl px-5 py-4 text-center">
                  <div className="text-2xl font-bold text-theme-primary">10+</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.24em] text-theme-secondary">Projects</div>
                </div>
                <div className="glass-card rounded-2xl px-5 py-4 text-center">
                  <div className="text-2xl font-bold text-theme-primary">3</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.24em] text-theme-secondary">Internships</div>
                </div>
                <div className="glass-card rounded-2xl px-5 py-4 text-center">
                  <div className="text-2xl font-bold text-theme-primary">Full Stack</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.24em] text-theme-secondary">Core Stack</div>
                </div>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-3">
                <a href="https://github.com/ABHISHEKNAIKN7" target="_blank" rel="noopener noreferrer" className="hero-social" onClick={() => trackLinkClick({ label: 'github', href: 'https://github.com/ABHISHEKNAIKN7', section: 'hero' })}>
                  <Github size={18} />
                </a>
                <a href="https://www.linkedin.com/in/abhisheknaikn7/" target="_blank" rel="noopener noreferrer" className="hero-social" onClick={() => trackLinkClick({ label: 'linkedin', href: 'https://www.linkedin.com/in/abhisheknaikn7/', section: 'hero' })}>
                  <Linkedin size={18} />
                </a>
                <a href="https://leetcode.com/u/abhisheknaikn7/" target="_blank" rel="noopener noreferrer" className="hero-social hero-social-text" onClick={() => trackLinkClick({ label: 'leetcode', href: 'https://leetcode.com/u/abhisheknaikn7/', section: 'hero' })}>
                  LC
                </a>
                <a href="https://www.instagram.com/abhisheknaikn7/" target="_blank" rel="noopener noreferrer" className="hero-social" onClick={() => trackLinkClick({ label: 'instagram', href: 'https://www.instagram.com/abhisheknaikn7/', section: 'hero' })}>
                  <Instagram size={18} />
                </a>
                <a href="mailto:abhishek220av@gmail.com" className="hero-social" onClick={() => trackLinkClick({ label: 'email', href: 'mailto:abhishek220av@gmail.com', section: 'hero' })}>
                  <Mail size={18} />
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.86, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="hero-panel glass-card relative w-full max-w-md rounded-[2rem] p-5 md:p-6">
              <div className="absolute inset-0 rounded-[2rem] bg-[linear-gradient(135deg,rgba(0,240,255,0.08),transparent_38%,rgba(170,59,255,0.12))] pointer-events-none" />
              <div className="relative rounded-[1.7rem] border border-white/10 bg-[rgba(4,6,12,0.55)] p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-theme-secondary">Profile Snapshot</p>
                    <h2 className="mt-2 text-2xl font-bold text-theme-primary">Abhishek K</h2>
                  </div>
                  <div className="h-3 w-3 rounded-full bg-[#00f0ff] shadow-[0_0_14px_rgba(0,240,255,0.9)]" />
                </div>

                <div className="relative mx-auto mb-6 w-52 h-52 md:w-64 md:h-64">
                  <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#aa3bff] via-[#4f46e5] to-[#00f0ff] blur-[32px] opacity-65" />
                  <div className="hero-avatar-frame relative h-full w-full overflow-hidden rounded-[2rem] border border-white/20 bg-black/20 shadow-[0_0_30px_rgba(0,240,255,0.24)]">
                    <img
                      src="/profile.png"
                      alt="Abhishek"
                      className="relative h-full w-full object-cover object-top scale-[1.15]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-theme-secondary">Focus</p>
                    <p className="mt-2 text-sm font-medium text-theme-primary">Full Stack + Backend</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-theme-secondary">Location</p>
                    <p className="mt-2 text-sm font-medium text-theme-primary">Bengaluru, Karnataka</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroPremium;
