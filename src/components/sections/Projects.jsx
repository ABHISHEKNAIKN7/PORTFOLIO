import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Pencil, Plus, X } from 'lucide-react';

const DEFAULT_PROJECT_IMAGE = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop';

const ProjectCard = ({ project, index, onEdit }) => {
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
          <button
            type="button"
            onClick={() => onEdit(project)}
            className="text-theme-secondary hover:text-[#aa3bff] transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <Pencil size={18} />
            Edit
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const emptyForm = {
  id: '',
  title: '',
  tech: '',
  description: '',
  image: '',
  github: '',
  link: '',
};

const Projects = ({ projects = [], onAddProject, onUpdateProject }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState('');
  const [formValues, setFormValues] = useState(emptyForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const projectPayload = {
      id: formValues.id || `project-${formValues.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${Date.now()}`,
      title: formValues.title.trim(),
      description: formValues.description.trim(),
      tech: formValues.tech.split(',').map((item) => item.trim()).filter(Boolean),
      image: formValues.image.trim() || DEFAULT_PROJECT_IMAGE,
      link: formValues.link.trim() || '#',
      github: formValues.github.trim() || '#',
    };

    if (editingId) {
      onUpdateProject(projectPayload);
    } else {
      onAddProject(projectPayload);
    }

    setFormValues(emptyForm);
    setEditingId('');
    setIsAdding(false);
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setFormValues({
      id: project.id,
      title: project.title,
      tech: project.tech.join(', '),
      description: project.description,
      image: project.image === DEFAULT_PROJECT_IMAGE ? '' : project.image,
      github: project.github === '#' ? '' : project.github,
      link: project.link === '#' ? '' : project.link,
    });
    setIsAdding(true);
  };

  const handleToggle = () => {
    setIsAdding((current) => {
      const next = !current;
      if (!next) {
        setEditingId('');
        setFormValues(emptyForm);
      }
      return next;
    });
  };

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

        <div className="flex justify-center mb-10">
          <button
            type="button"
            onClick={handleToggle}
            className="flex items-center gap-2 px-5 py-3 rounded-xl glass-card border border-theme text-theme-primary hover:border-[rgba(0,240,255,0.4)] transition-colors"
          >
            {isAdding ? <X size={18} /> : <Plus size={18} />}
            <span>{isAdding ? 'Close Project Form' : 'Add Project'}</span>
          </button>
        </div>

        {isAdding && (
          <div className="glass-card rounded-2xl p-6 md:p-8 border border-theme mb-12">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input name="title" value={formValues.title} onChange={handleChange} required placeholder="Project title" className="input-theme rounded-xl px-4 py-3 focus:outline-none" />
              <input name="tech" value={formValues.tech} onChange={handleChange} required placeholder="React, Node, MongoDB" className="input-theme rounded-xl px-4 py-3 focus:outline-none" />
              <textarea name="description" value={formValues.description} onChange={handleChange} required rows="4" placeholder="Project description" className="md:col-span-2 input-theme rounded-xl px-4 py-3 focus:outline-none resize-none" />
              <input name="image" value={formValues.image} onChange={handleChange} placeholder="Image URL (optional)" className="md:col-span-2 input-theme rounded-xl px-4 py-3 focus:outline-none" />
              <input name="github" value={formValues.github} onChange={handleChange} placeholder="GitHub URL" className="input-theme rounded-xl px-4 py-3 focus:outline-none" />
              <input name="link" value={formValues.link} onChange={handleChange} placeholder="Live demo URL" className="input-theme rounded-xl px-4 py-3 focus:outline-none" />
              <div className="md:col-span-2 flex justify-end">
                <button type="submit" className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors">
                  {editingId ? 'Update Project' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 gap-y-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id || project.title} project={project} index={index} onEdit={handleEdit} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
