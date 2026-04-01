import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { trackLinkClick } from '../../utils/analytics';

const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  message: '',
};

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [status, setStatus] = useState({
    type: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('https://formsubmit.co/ajax/abhishek220av@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: `Portfolio inquiry from ${formData.name}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const result = await response.json();

      if (!response.ok || result.success === 'false') {
        throw new Error(result.message || 'Unable to send your message right now.');
      }

      setStatus({
        type: 'success',
        message: 'Message sent successfully. Check your inbox for the submission details.',
      });
      setFormData(INITIAL_FORM_DATA);
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Something went wrong. Please try again in a moment.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="w-full py-24 px-6 md:px-12 flex flex-col items-center relative overflow-hidden">

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-t from-[rgba(170,59,255,0.05)] to-transparent pointer-events-none" />

      <div className="max-w-7xl w-full relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Let's <span className="text-glow-blue text-[#00f0ff]">Connect</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00f0ff] to-[#aa3bff] mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">

          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-3xl font-semibold text-theme-primary mb-6">Let's build something amazing</h3>

            <p className="text-theme-secondary mb-10 leading-relaxed font-light">
              I'm always open to discussing new opportunities, collaborations, or exciting tech projects.
              If you have an idea or a project in mind, feel free to reach out. Let's create something impactful together.
            </p>

            <div className="flex flex-col gap-6 mb-12">
              <a href="mailto:abhishek220av@gmail.com" onClick={() => trackLinkClick({ label: 'email', href: 'mailto:abhishek220av@gmail.com', section: 'contact' })} className="flex items-center gap-4 text-theme-primary hover:text-[#00f0ff] transition-colors group">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center border border-theme group-hover:border-[#00f0ff] transition-colors">
                  <Mail size={20} />
                </div>
                <span className="text-lg">abhishek220av@gmail.com</span>
              </a>
            </div>

            <div className="flex gap-4">
              <a
                href="https://github.com/ABHISHEKNAIKN7"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackLinkClick({ label: 'github', href: 'https://github.com/ABHISHEKNAIKN7', section: 'contact' })}
                className="w-12 h-12 rounded-full glass hover:bg-[var(--theme-icon-hover-bg)] hover:text-[var(--theme-icon-hover-text)] transition-all duration-300 flex items-center justify-center border border-theme group"
              >
                <span className="transform group-hover:scale-110 transition-transform">
                  <Github size={20} />
                </span>
              </a>

              <a
                href="https://www.linkedin.com/in/abhisheknaikn7/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackLinkClick({ label: 'linkedin', href: 'https://www.linkedin.com/in/abhisheknaikn7/', section: 'contact' })}
                className="w-12 h-12 rounded-full glass hover:bg-[var(--theme-icon-hover-bg)] hover:text-[var(--theme-icon-hover-text)] transition-all duration-300 flex items-center justify-center border border-theme group"
              >
                <span className="transform group-hover:scale-110 transition-transform">
                  <Linkedin size={20} />
                </span>
              </a>

              <a
                href="https://leetcode.com/u/abhisheknaikn7/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackLinkClick({ label: 'leetcode', href: 'https://leetcode.com/u/abhisheknaikn7/', section: 'contact' })}
                className="w-12 h-12 rounded-full glass hover:bg-[var(--theme-icon-hover-bg)] hover:text-[var(--theme-icon-hover-text)] transition-all duration-300 flex items-center justify-center border border-theme group text-sm font-semibold"
              >
                <span className="transform group-hover:scale-110 transition-transform">
                  LC
                </span>
              </a>

              <a
                href="https://www.instagram.com/abhisheknaikn7/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackLinkClick({ label: 'instagram', href: 'https://www.instagram.com/abhisheknaikn7/', section: 'contact' })}
                className="w-12 h-12 rounded-full glass hover:bg-[var(--theme-icon-hover-bg)] hover:text-[var(--theme-icon-hover-text)] transition-all duration-300 flex items-center justify-center border border-theme group"
              >
                <span className="transform group-hover:scale-110 transition-transform">
                  <Instagram size={20} />
                </span>
              </a>

            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl flex flex-col gap-6">

              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm text-theme-secondary ml-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full input-theme rounded-xl px-4 py-3 focus:outline-none focus:border-[#aa3bff] transition-all duration-300"
                  placeholder="Your Name"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm text-theme-secondary ml-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full input-theme rounded-xl px-4 py-3 focus:outline-none focus:border-[#00f0ff] transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm text-theme-secondary ml-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full input-theme rounded-xl px-4 py-3 focus:outline-none focus:border-[#aa3bff] transition-all duration-300 resize-none"
                  placeholder="Write your message..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl mt-2 overflow-hidden bg-white text-black font-semibold hover:bg-gray-200 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#aa3bff] to-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </span>
                <Send size={18} className="relative z-10 group-hover:text-white group-hover:translate-x-1 -translate-y-1 group-hover:-translate-y-2 transition-all duration-300" />
              </button>

              {status.message && (
                <p
                  className={`text-sm ${status.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}
                  role="status"
                >
                  {status.message}
                </p>
              )}

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
