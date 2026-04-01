import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Icosahedron } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

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

const Hero = () => {
  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center pt-20">
      <FloatingShapes />

      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl px-4">

        {/* Welcome Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-kicker mb-6 inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm md:text-base font-medium backdrop-blur-md"
        >
          <span className="h-2 w-2 rounded-full bg-[#00f0ff] shadow-[0_0_16px_rgba(0,240,255,0.9)]" />
          Full Stack Developer Portfolio
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-title text-5xl md:text-7xl lg:text-[7.5rem] font-black tracking-tight mb-5 leading-none"
        >
          Hi, I'm <span className="text-glow-purple text-[#aa3bff]">Abhishek</span>
        </motion.h1>

        {/* 👇 Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6"
        >
          <div className="relative w-36 h-36 md:w-44 md:h-44 mx-auto">

            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#aa3bff] via-[#6d49ff] to-[#00f0ff] blur-[28px] opacity-80 animate-pulse" />

            {/* Image */}
            <div className="hero-avatar-frame relative w-full h-full overflow-hidden rounded-full border border-white/20 shadow-[0_0_30px_rgba(0,240,255,0.45)] bg-black/10">
              <img
                src="/profile.png"
                alt="Abhishek"
                className="relative w-full h-full object-cover object-top scale-[1.18] hover:scale-[1.22] transition-transform duration-300"
              />
            </div>

          </div>
        </motion.div>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hero-role text-lg md:text-2xl text-theme-secondary mb-5 max-w-2xl font-light leading-relaxed"
        >
          Full Stack Developer <span className="text-[#00f0ff]">|</span> MERN Stack <span className="text-[#00f0ff]">|</span> Python
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-theme-secondary max-w-2xl mb-10 text-base md:text-lg leading-8"
        >
          I build responsive and scalable web applications using modern technologies like
          React, Node.js, and MongoDB. Passionate about creating impactful digital solutions
          and continuously learning new technologies.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#projects"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#aa3bff] to-[#00f0ff] text-white font-medium hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(170,59,255,0.4)]"
          >
            View Projects
          </a>

          <a
            href="/resume.pdf"
            className="px-8 py-3 rounded-full border border-theme hover:bg-theme-soft text-theme-primary font-medium transition-colors duration-300 backdrop-blur-md"
          >
            Download Resume
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
