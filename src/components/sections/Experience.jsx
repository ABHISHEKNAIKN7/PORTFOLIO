import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, GraduationCap, Pencil, Plus, X } from 'lucide-react';

const TimelineItem = ({ item, index, onEdit }) => {
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
            <button
              type="button"
              onClick={() => onEdit(item)}
              className="mt-5 text-sm text-theme-secondary hover:text-[#aa3bff] transition-colors inline-flex items-center gap-2"
            >
              <Pencil size={16} />
              Edit
            </button>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

const emptyForm = {
  id: '',
  title: '',
  company: '',
  date: '',
  description: '',
};

const Experience = ({ experience = [], onAddExperience, onUpdateExperience }) => {
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
    const experiencePayload = {
      id: formValues.id || `experience-${formValues.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${Date.now()}`,
      type: 'work',
      title: formValues.title.trim(),
      company: formValues.company.trim(),
      date: formValues.date.trim(),
      description: formValues.description.trim(),
    };

    if (editingId) {
      onUpdateExperience(experiencePayload);
    } else {
      onAddExperience(experiencePayload);
    }

    setFormValues(emptyForm);
    setEditingId('');
    setIsAdding(false);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormValues({
      id: item.id,
      title: item.title,
      company: item.company,
      date: item.date,
      description: item.description,
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

        <div className="flex justify-center mb-10">
          <button
            type="button"
            onClick={handleToggle}
            className="flex items-center gap-2 px-5 py-3 rounded-xl glass-card border border-theme text-theme-primary hover:border-[rgba(170,59,255,0.45)] transition-colors"
          >
            {isAdding ? <X size={18} /> : <Plus size={18} />}
            <span>{isAdding ? 'Close Experience Form' : 'Add Experience'}</span>
          </button>
        </div>

        {isAdding && (
          <div className="glass-card rounded-2xl p-6 md:p-8 border border-theme mb-12">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input name="title" value={formValues.title} onChange={handleChange} required placeholder="Role title" className="input-theme rounded-xl px-4 py-3 focus:outline-none" />
              <input name="company" value={formValues.company} onChange={handleChange} required placeholder="Company name" className="input-theme rounded-xl px-4 py-3 focus:outline-none" />
              <input name="date" value={formValues.date} onChange={handleChange} required placeholder="Jan 2026 - Mar 2026" className="md:col-span-2 input-theme rounded-xl px-4 py-3 focus:outline-none" />
              <textarea name="description" value={formValues.description} onChange={handleChange} required rows="5" placeholder="Experience description" className="md:col-span-2 input-theme rounded-xl px-4 py-3 focus:outline-none resize-none" />
              <div className="md:col-span-2 flex justify-end">
                <button type="submit" className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors">
                  {editingId ? 'Update Experience' : 'Save Experience'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="relative py-10 w-full flex flex-col items-center">
          {/* Main timeline center line mobile */}
          <div className="absolute top-0 bottom-0 left-12 w-0.5 bg-gradient-to-b from-[rgba(170,59,255,0.3)] via-[rgba(0,240,255,0.3)] to-transparent md:hidden" />

          <div className="w-full relative">
            {experience.map((item, index) => (
              <TimelineItem key={item.id || index} item={item} index={index} onEdit={handleEdit} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
