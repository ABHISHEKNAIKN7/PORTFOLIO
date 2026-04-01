import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { trackLinkClick } from '../utils/analytics';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = ({ theme, onToggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks
        .map((link) => document.querySelector(link.href))
        .filter(Boolean);

      const currentSection = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 140 && rect.bottom >= 140;
      });

      if (currentSection?.id) {
        setActiveSection(currentSection.id);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDarkTheme = theme === 'dark';

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-6'
        }`}
    >
      <div className={`max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between rounded-[28px] transition-all duration-300 ${
        scrolled ? 'glass shadow-[0_18px_60px_rgba(15,23,42,0.22)] px-5 py-3 md:px-7' : ''
      }`}>

        {/* Logo */}
        <a
          href="#home"
          className="z-50 group"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[rgba(0,240,255,0.28)] bg-[linear-gradient(135deg,rgba(0,240,255,0.14),rgba(170,59,255,0.16))] text-sm font-semibold tracking-[0.24em] text-[#00f0ff] shadow-[0_0_25px_rgba(0,240,255,0.12)] transition-transform duration-300 group-hover:scale-105">
              AK
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[1.15rem] font-semibold tracking-[0.18em] uppercase text-theme-primary">
                Abhishek K
              </span>
              <span className="mt-1 text-[0.62rem] uppercase tracking-[0.36em] text-theme-secondary">
                Portfolio
              </span>
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`relative text-sm font-medium transition-colors ${
                activeSection === link.href.replace('#', '')
                  ? 'text-theme-primary'
                  : 'text-theme-secondary hover:text-[#00f0ff]'
              }`}
            >
              {link.name}
              {activeSection === link.href.replace('#', '') && (
                <span className="absolute left-0 top-full mt-2 h-0.5 w-full rounded-full bg-gradient-to-r from-[#00f0ff] to-[#aa3bff]" />
              )}
            </a>
          ))}

          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex items-center gap-2 rounded-full border border-theme px-4 py-2 text-sm font-medium text-theme-primary hover:border-[#00f0ff] hover:text-[#00f0ff] transition-colors"
            aria-label={`Switch to ${isDarkTheme ? 'light' : 'dark'} theme`}
          >
            {isDarkTheme ? <Sun size={16} /> : <Moon size={16} />}
            {isDarkTheme ? 'Light' : 'Dark'}
          </button>

          {/* Resume Button */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackLinkClick({ label: 'resume', href: '/resume.pdf', section: 'navbar' })}
            className="px-5 py-2 rounded-full border border-[rgba(0,240,255,0.5)] bg-[rgba(0,240,255,0.1)] text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-all text-sm font-medium"
          >
            Resume
          </a>

          {/* Contact Button */}
          <a
            href="#contact"
            className="px-5 py-2 rounded-full border border-[rgba(170,59,255,0.5)] bg-[rgba(170,59,255,0.1)] text-[#aa3bff] hover:bg-[#aa3bff] hover:text-white transition-all text-sm font-medium"
          >
            Let's Talk
          </a>
        </nav>

        <div className="md:hidden z-50 flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className="rounded-full border border-theme p-2 text-theme-primary transition-colors hover:border-[#00f0ff] hover:text-[#00f0ff]"
            aria-label={`Switch to ${isDarkTheme ? 'light' : 'dark'} theme`}
          >
            {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            className="text-theme-primary p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass-card border-t border-[rgba(255,255,255,0.05)] py-6 flex flex-col items-center gap-6 shadow-2xl md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg font-medium transition-colors ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-theme-primary'
                    : 'text-theme-secondary hover:text-[#00f0ff]'
                }`}
              >
                {link.name}
              </a>
            ))}

            <button
              type="button"
              onClick={() => {
                onToggleTheme();
                setMobileMenuOpen(false);
              }}
              className="inline-flex items-center gap-2 rounded-full border border-theme px-4 py-2 text-sm font-medium text-theme-primary hover:border-[#00f0ff] hover:text-[#00f0ff] transition-colors"
            >
              {isDarkTheme ? <Sun size={16} /> : <Moon size={16} />}
              {isDarkTheme ? 'Light theme' : 'Dark theme'}
            </button>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackLinkClick({ label: 'resume', href: '/resume.pdf', section: 'navbar_mobile' });
                setMobileMenuOpen(false);
              }}
              className="text-lg font-medium text-[#00f0ff]"
            >
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
