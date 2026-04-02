import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, GraduationCap } from 'lucide-react';

const TimelineItem = ({ item, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex flex-col items-start md:items-center group mb-16 last:mb-0">

      {/* Central Line segment connecting points */}
      <div className="hidden md:block absolute top-0 bottom-[-4rem] left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[rgba(170,59,255,0.3)] to-[rgba(0,240,255,0.3)] group-last:bottom-0" />

      {/* Timeline Node */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
        className="absolute left-12 md:left-1/2 md:-translate-x-1/2 top-6 w-12 h-12 rounded-full glass flex items-center justify-center border-2 border-[#aa3bff] z-10 shadow-[0_0_15px_rgba(170,59,255,0.5)] bg-[var(--timeline-node-bg)]"
      >
        {item.type === 'education' ? (
          <GraduationCap size={20} className="text-[#00f0ff]" />
        ) : (
          <Briefcase size={20} className="text-[#00f0ff]" />
        )}
      </motion.div>

      {/* Content Card */}
      <div
        className={`relative w-full pl-24 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-16 md:mr-auto' : 'md:pl-16 md:ml-auto'}`}
      >
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full"
        >
          <div
            className="glass-card p-6 md:p-8 rounded-2xl w-full mt-16 md:mt-0 border border-[rgba(255,255,255,0.05)] hover:border-[rgba(170,59,255,0.3)] transition-colors duration-300 relative group-hover:shadow-[0_0_20px_rgba(170,59,255,0.2)] overflow-hidden break-words text-left"
          >
            {/* Arrow indicating connection to timeline */}
            <div className={`hidden md:block absolute top-10 w-0 h-0 border-y-8 border-y-transparent ${isEven ? 'right-[-8px] border-l-8 border-l-[rgba(255,255,255,0.05)] group-hover:border-l-[rgba(170,59,255,0.3)]' : 'left-[-8px] border-r-8 border-r-[rgba(255,255,255,0.05)] group-hover:border-r-[rgba(170,59,255,0.3)]'} transition-colors duration-300`} />

            <div className="flex flex-col gap-2 mb-4 break-words">
              <span className="text-[#00f0ff] font-mono text-sm tracking-widest uppercase">{item.date}</span>
              <h3 className="text-2xl font-bold text-theme-primary group-hover:text-[#aa3bff] transition-colors leading-tight">{item.title}</h3>
              <h4 className="text-base md:text-lg font-medium text-theme-secondary leading-snug">{item.company}</h4>
            </div>

            <p className="text-theme-secondary font-light leading-7 break-words">
              {item.description}
            </p>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

const Experience = ({ experience = [] }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" className="w-full py-24 px-6 md:px-12 flex flex-col items-center">
      <div className="max-w-7xl w-full">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Journey & <span className="text-glow-purple text-[#aa3bff]">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#aa3bff] to-[#00f0ff] mx-auto rounded-full" />
        </motion.div>

        <div className="relative py-10 w-full flex flex-col items-center">
          {/* Main timeline center line mobile */}
          <div className="absolute top-0 bottom-0 left-12 w-0.5 bg-gradient-to-b from-[rgba(170,59,255,0.3)] via-[rgba(0,240,255,0.3)] to-transparent md:hidden" />

          <div className="w-full relative">
            {experience.map((item, index) => (
              <TimelineItem key={item.id || index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
