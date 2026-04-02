import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const getSkillCategory = (name) => {
  if (['HTML', 'CSS', 'JavaScript', 'React.js', 'Tailwind CSS'].includes(name)) {
    return 'Frontend';
  }

  if (['Node.js', 'Express.js', 'REST APIs', 'Solidity', 'Web3.js', 'Django'].includes(name)) {
    return 'Backend';
  }

  if (['MongoDB', 'SQL', 'MySQL'].includes(name)) {
    return 'Database';
  }

  if (['Wireshark', 'OWASP ZAP'].includes(name)) {
    return 'Security';
  }

  if (['Windows', 'Linux', 'Ubuntu'].includes(name)) {
    return 'Platforms';
  }

  return 'Tools';
};

const SkillIcon = ({ skill, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.5, y: 20 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
      className="flex flex-col items-center justify-center p-4 md:p-5 glass-card rounded-2xl min-h-[10rem] cursor-pointer group hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-shadow duration-300"
    >
      <motion.img
        src={skill.icon}
        alt={skill.name}
        className="w-11 h-11 md:w-14 md:h-14 mb-3 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-300"
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <span className="text-sm font-medium text-theme-secondary group-hover:text-theme-primary transition-colors duration-300 text-center">
        {skill.name}
      </span>
    </motion.div>
  );
};

const Skills = ({ skills = [] }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillGroups = skills.reduce((groups, skill) => {
    const category = getSkillCategory(skill.name);
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(skill);
    return groups;
  }, {});

  return (
    <section id="skills" className="w-full py-24 px-6 md:px-12 flex flex-col items-center relative overflow-hidden">
      {/* Background glow for anti-gravity feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[rgba(0,240,255,0.05)] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl w-full relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Technical <span className="text-glow-blue text-[#00f0ff]">Arsenal</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00f0ff] to-[#aa3bff] mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-8 max-w-6xl mx-auto">
          {Object.entries(skillGroups).map(([category, groupedSkills], groupIndex) => (
            <div key={category} className="glass-card rounded-[2rem] border border-theme p-5 md:p-7 relative overflow-hidden">
              <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(0,240,255,0.12),transparent_72%)] pointer-events-none" />
              <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-theme-secondary">{category}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-theme-primary">{category} Skills</h3>
                </div>
                <span className="rounded-full border border-theme px-3 py-1 text-xs uppercase tracking-[0.22em] text-theme-secondary">
                  {groupedSkills.length} items
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                {groupedSkills.map((skill, index) => (
                  <SkillIcon
                    key={skill.id || skill.name}
                    skill={skill}
                    index={index + groupIndex}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
