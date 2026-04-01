import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SkillBar = ({ skill, percentage, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="mb-6" ref={ref}>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-theme-primary">{skill}</span>
        <span className="text-sm font-medium text-[#00f0ff]">{percentage}%</span>
      </div>
      <div className="w-full rounded-full h-2.5 backdrop-blur-sm border border-theme bg-theme-soft">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay, ease: "easeOut" }}
          className="h-2.5 rounded-full bg-gradient-to-r from-[#aa3bff] to-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.5)]"
        />
      </div>
    </div>
  );
};

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="w-full min-h-screen py-24 px-6 md:px-12 flex flex-col items-center justify-center">
      <div className="max-w-7xl w-full">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            About <span className="text-glow-blue text-[#00f0ff]">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#aa3bff] to-[#00f0ff] mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card p-8 rounded-2xl relative overflow-hidden"
          >
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-[rgba(170,59,255,0.3)] rounded-full blur-[60px]" />

            <h3 className="text-2xl font-semibold mb-6 text-theme-primary relative z-10">
              Full Stack Developer, Problem Solver, and Continuous Learner
            </h3>

            <p className="text-theme-secondary leading-relaxed mb-6 font-light relative z-10">
              I'm <span className="text-theme-primary font-medium">Abhishek K</span>, a full stack developer with hands-on experience in MERN stack development, Python, REST APIs, and responsive frontend engineering. My goal is to become highly proficient in both frontend and backend development, building products that are clean, fast, scalable, and easy to use.
            </p>

            <p className="text-theme-secondary leading-relaxed font-light relative z-10">
              Through internships at EY GDS, Unified Mentor, and REDYNOX, I have worked across web development and cybersecurity, improving application performance, building user interfaces, developing backend features, and learning how secure systems are designed and tested. Along with core MERN technologies, I keep expanding my stack with tools like Tailwind CSS, GitHub, Web3.js, Solidity, Wireshark, and OWASP ZAP through project work and continuous practice.
            </p>

          </motion.div>

          {/* Core Skills Bars */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-2"
          >
            <SkillBar skill="React.js, JavaScript, HTML/CSS & Frontend Development" percentage={90} delay={0.6} />
            <SkillBar skill="Node.js, Express.js, MongoDB & Backend Development" percentage={86} delay={0.8} />
            <SkillBar skill="Python, REST APIs & Problem Solving" percentage={82} delay={1.0} />
            <SkillBar skill="Security Tools, GitHub & Continuous Learning" percentage={78} delay={1.2} />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
