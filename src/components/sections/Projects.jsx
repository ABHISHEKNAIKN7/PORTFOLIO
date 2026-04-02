import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ y: -10 }}
      className="glass-card rounded-2xl overflow-hidden group border border-[rgba(255,255,255,0.05)] hover:border-[rgba(0,240,255,0.3)] transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--project-overlay)] to-transparent z-10" />
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        {/* Floating animated overlay element */}
        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full backdrop-blur-md bg-white/10 flex items-center justify-center border border-white/20">
            <ExternalLink size={20} className="text-[#00f0ff]" />
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-theme-primary group-hover:text-[#00f0ff] transition-colors">
          {project.title}
        </h3>
        <p className="text-theme-secondary text-sm mb-6 leading-7 min-h-[7rem]">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs rounded-full bg-[rgba(170,59,255,0.1)] text-[#aa3bff] border border-[rgba(170,59,255,0.2)]"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 border-t border-theme pt-4 flex-wrap">
          <a href={project.github} className="text-theme-secondary hover:text-theme-primary transition-colors flex items-center gap-2 text-sm font-medium">
            <Github size={18} />
            Code
          </a>
          <a href={project.link} className="text-theme-secondary hover:text-[#00f0ff] transition-colors flex items-center gap-2 text-sm font-medium">
            <ExternalLink size={18} />
            Live Demo
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = ({ projects = [] }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="projects" className="w-full py-24 px-6 md:px-12 flex flex-col items-center">
      <div className="max-w-7xl w-full">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Featured <span className="text-glow-purple text-[#aa3bff]">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00f0ff] to-[#aa3bff] mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 gap-y-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id || project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
