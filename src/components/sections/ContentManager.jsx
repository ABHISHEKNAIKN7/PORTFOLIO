import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, FolderPlus, Sparkles, Trash2, Wrench } from 'lucide-react';

const DEFAULT_PROJECT_IMAGE = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop';

const FORM_TEMPLATES = {
  project: {
    title: '',
    description: '',
    tech: '',
    image: '',
    link: '',
    github: '',
  },
  skill: {
    name: '',
    icon: '',
  },
  internship: {
    title: '',
    company: '',
    date: '',
    description: '',
  },
};

const CONTENT_TYPE_META = {
  project: {
    label: 'Project',
    icon: FolderPlus,
    helper: 'Add a featured project with image, stack, and links.',
  },
  skill: {
    label: 'Skill',
    icon: Sparkles,
    helper: 'Add one skill and its icon URL.',
  },
  internship: {
    label: 'Internship',
    icon: Briefcase,
    helper: 'Add a new internship or experience entry.',
  },
};

const emptyStateFor = (type) => ({ ...FORM_TEMPLATES[type] });

const createId = (prefix, value) =>
  `${prefix}-${value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${Date.now()}`;

const ContentManager = ({ content, onAddItem, onDeleteItem }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeType, setActiveType] = useState('project');
  const [formValues, setFormValues] = useState(emptyStateFor('project'));
  const [status, setStatus] = useState('');

  const visibleItems = useMemo(() => {
    if (activeType === 'project') {
      return content.projects;
    }

    if (activeType === 'skill') {
      return content.skills;
    }

    return content.experience;
  }, [activeType, content]);

  const handleTypeChange = (type) => {
    setActiveType(type);
    setFormValues(emptyStateFor(type));
    setStatus('');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (activeType === 'project') {
      onAddItem('project', {
        id: createId('project', formValues.title),
        title: formValues.title.trim(),
        description: formValues.description.trim(),
        tech: formValues.tech.split(',').map((item) => item.trim()).filter(Boolean),
        image: formValues.image.trim() || DEFAULT_PROJECT_IMAGE,
        link: formValues.link.trim() || '#',
        github: formValues.github.trim() || '#',
      });
    }

    if (activeType === 'skill') {
      onAddItem('skill', {
        id: createId('skill', formValues.name),
        name: formValues.name.trim(),
        icon: formValues.icon.trim(),
      });
    }

    if (activeType === 'internship') {
      onAddItem('internship', {
        id: createId('experience', formValues.title),
        type: 'work',
        title: formValues.title.trim(),
        company: formValues.company.trim(),
        date: formValues.date.trim(),
        description: formValues.description.trim(),
      });
    }

    setFormValues(emptyStateFor(activeType));
    setStatus(`${CONTENT_TYPE_META[activeType].label} added successfully.`);
  };

  const renderPreviewText = (item) => {
    if (activeType === 'project') {
      return item.description;
    }

    if (activeType === 'skill') {
      return item.icon;
    }

    return `${item.company} • ${item.date}`;
  };

  return (
    <section id="content-manager" className="w-full py-24 px-6 md:px-12 flex flex-col items-center relative overflow-hidden">
      <div className="absolute inset-x-0 top-10 mx-auto h-72 w-[70%] rounded-full bg-[rgba(170,59,255,0.08)] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl w-full relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Manage <span className="text-glow-purple text-[#aa3bff]">Portfolio Content</span>
          </h2>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Use this one section to add new projects, skills, or internships. Each new entry is saved in your browser and displayed instantly in the matching section below.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#aa3bff] to-[#00f0ff] mx-auto rounded-full mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass-card rounded-3xl p-8 border border-theme"
          >
            <div className="flex flex-wrap gap-3 mb-8">
              {Object.entries(CONTENT_TYPE_META).map(([type, meta]) => {
                const Icon = meta.icon;
                const isActive = activeType === type;

                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleTypeChange(type)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-300 ${
                      isActive
                        ? 'bg-[rgba(170,59,255,0.18)] border-[rgba(170,59,255,0.45)] text-white'
                        : 'bg-transparent border-theme text-theme-secondary hover:text-theme-primary'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{meta.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Wrench size={18} className="text-[#00f0ff]" />
                <h3 className="text-2xl font-semibold text-theme-primary">
                  Add {CONTENT_TYPE_META[activeType].label}
                </h3>
              </div>
              <p className="text-theme-secondary">{CONTENT_TYPE_META[activeType].helper}</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {activeType === 'project' && (
                <>
                  <input name="title" value={formValues.title} onChange={handleChange} required placeholder="Project title" className="input-theme rounded-xl px-4 py-3 focus:outline-none" />
                  <input name="tech" value={formValues.tech} onChange={handleChange} required placeholder="React, Node, MongoDB" className="input-theme rounded-xl px-4 py-3 focus:outline-none" />
                  <textarea name="description" value={formValues.description} onChange={handleChange} required placeholder="Project description" rows="4" className="md:col-span-2 input-theme rounded-xl px-4 py-3 focus:outline-none resize-none" />
                  <input name="image" value={formValues.image} onChange={handleChange} placeholder="Image URL (optional)" className="md:col-span-2 input-theme rounded-xl px-4 py-3 focus:outline-none" />
                  <input name="github" value={formValues.github} onChange={handleChange} placeholder="GitHub URL" className="input-theme rounded-xl px-4 py-3 focus:outline-none" />
                  <input name="link" value={formValues.link} onChange={handleChange} placeholder="Live demo URL" className="input-theme rounded-xl px-4 py-3 focus:outline-none" />
                </>
              )}

              {activeType === 'skill' && (
                <>
                  <input name="name" value={formValues.name} onChange={handleChange} required placeholder="Skill name" className="input-theme rounded-xl px-4 py-3 focus:outline-none" />
                  <input name="icon" value={formValues.icon} onChange={handleChange} required placeholder="Icon image URL" className="input-theme rounded-xl px-4 py-3 focus:outline-none" />
                </>
              )}

              {activeType === 'internship' && (
                <>
                  <input name="title" value={formValues.title} onChange={handleChange} required placeholder="Role title" className="input-theme rounded-xl px-4 py-3 focus:outline-none" />
                  <input name="company" value={formValues.company} onChange={handleChange} required placeholder="Company name" className="input-theme rounded-xl px-4 py-3 focus:outline-none" />
                  <input name="date" value={formValues.date} onChange={handleChange} required placeholder="Jan 2026 - Mar 2026" className="md:col-span-2 input-theme rounded-xl px-4 py-3 focus:outline-none" />
                  <textarea name="description" value={formValues.description} onChange={handleChange} required placeholder="Internship description" rows="5" className="md:col-span-2 input-theme rounded-xl px-4 py-3 focus:outline-none resize-none" />
                </>
              )}

              <div className="md:col-span-2 flex items-center justify-between gap-4 flex-wrap">
                <p className="text-sm text-theme-secondary">
                  {status || 'For projects, only title, stack, and description are required. Your latest additions stay in this browser using local storage.'}
                </p>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
                >
                  Save {CONTENT_TYPE_META[activeType].label}
                </button>
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass-card rounded-3xl p-8 border border-theme"
          >
            <h3 className="text-2xl font-semibold text-theme-primary mb-2">
              Current {CONTENT_TYPE_META[activeType].label}s
            </h3>
            <p className="text-theme-secondary mb-6">
              Remove an item here if you do not want it displayed anymore.
            </p>

            <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1">
              {visibleItems.map((item) => (
                <div key={item.id} className="rounded-2xl border border-theme p-4 bg-[rgba(255,255,255,0.02)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-semibold text-theme-primary">
                        {item.title || item.name}
                      </h4>
                      <p className="text-sm text-theme-secondary mt-1 break-words">
                        {renderPreviewText(item)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onDeleteItem(activeType, item.id)}
                      className="text-rose-400 hover:text-rose-300 transition-colors"
                      aria-label={`Delete ${item.title || item.name}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContentManager;
