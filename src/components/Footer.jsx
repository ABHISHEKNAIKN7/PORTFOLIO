import React from 'react';
import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { trackLinkClick } from '../utils/analytics';

const Footer = ({ visitorCount = 0 }) => {
  return (
    <footer className="w-full px-6 md:px-12 pb-10">
      <div className="max-w-7xl mx-auto glass-card rounded-[2rem] border border-theme px-6 py-8 md:px-10 md:py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.36em] text-theme-secondary">Abhishek K</p>
            <h3 className="mt-3 text-2xl font-bold text-theme-primary">Let&apos;s build something polished and useful.</h3>
            <p className="mt-3 max-w-2xl text-theme-secondary leading-7">
              Full stack development, responsive interfaces, and practical digital products with a clean modern feel.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a href="https://github.com/ABHISHEKNAIKN7" target="_blank" rel="noopener noreferrer" className="hero-social" onClick={() => trackLinkClick({ label: 'github', href: 'https://github.com/ABHISHEKNAIKN7', section: 'footer' })}>
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/abhisheknaikn7/" target="_blank" rel="noopener noreferrer" className="hero-social" onClick={() => trackLinkClick({ label: 'linkedin', href: 'https://www.linkedin.com/in/abhisheknaikn7/', section: 'footer' })}>
              <Linkedin size={18} />
            </a>
            <a href="https://leetcode.com/u/abhisheknaikn7/" target="_blank" rel="noopener noreferrer" className="hero-social hero-social-text" onClick={() => trackLinkClick({ label: 'leetcode', href: 'https://leetcode.com/u/abhisheknaikn7/', section: 'footer' })}>
              LC
            </a>
            <a href="https://www.instagram.com/abhisheknaikn7/" target="_blank" rel="noopener noreferrer" className="hero-social" onClick={() => trackLinkClick({ label: 'instagram', href: 'https://www.instagram.com/abhisheknaikn7/', section: 'footer' })}>
              <Instagram size={18} />
            </a>
            <a href="mailto:abhishek220av@gmail.com" className="hero-social" onClick={() => trackLinkClick({ label: 'email', href: 'mailto:abhishek220av@gmail.com', section: 'footer' })}>
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-theme pt-6 text-sm text-theme-secondary md:flex-row md:items-center md:justify-between">
          <p>Designed and developed by Abhishek K. Browser visits tracked here: {visitorCount}</p>
          <div className="flex items-center gap-5">
            <a href="#home" className="hover:text-theme-primary transition-colors">Top</a>
            <a href="#projects" className="hover:text-theme-primary transition-colors">Projects</a>
            <a href="#contact" className="hover:text-theme-primary transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
