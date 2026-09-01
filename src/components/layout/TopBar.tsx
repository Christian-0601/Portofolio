import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const links = [
    { name: 'Beranda', path: '#home' },
    { name: 'Tentang', path: '#about' },
    { name: 'Keahlian', path: '#skills' },
    { name: 'Proyek', path: '#projects' },
    { name: 'Sertifikat', path: '#certificates' },
    { name: 'Perjalanan', path: '#journey' },
    { name: 'Kontak', path: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map(link => link.path.substring(1));
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            current = section;
          }
        }
      }
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    const id = path.substring(1);
    
    // Close the menu immediately
    setIsOpen(false);

    // Defer the scroll to allow the menu to close and the DOM to settle,
    // ensuring the scroll isn't interrupted by removing elements on mobile.
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        // Calculate offset relative to the window to account for the fixed header (80px)
        const y = element.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <nav className="w-full bg-bg-main/80 backdrop-blur-md border-b border-border-main fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="shrink-0 flex items-center gap-2">
              <Code2 className="text-accent" size={28} />
              <span className="font-bold tracking-tight text-xl text-white">Christian.dev</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-1">
                {links.map((link) => {
                  const isActive = activeSection === link.path.substring(1);
                  return (
                    <a
                      key={link.path}
                      href={link.path}
                      onClick={(e) => handleLinkClick(e, link.path)}
                      className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                          initial={false}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all"
              >
                Hubungi Saya
                <ArrowUpRight size={16} />
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-400 hover:text-white p-2 inline-flex items-center justify-center"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-bg-card border-b border-border-main shadow-2xl z-40 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {links.map((link) => {
                const isActive = activeSection === link.path.substring(1);
                return (
                  <a
                    key={link.path}
                    href={link.path}
                    onClick={(e) => handleLinkClick(e, link.path)}
                    style={{ pointerEvents: 'auto' }}
                    className={`block px-3 py-3 rounded-md text-base font-medium cursor-pointer ${
                      isActive
                        ? 'bg-accent/10 text-accent'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              <div className="pt-4 px-3">
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, '#contact')}
                  style={{ pointerEvents: 'auto' }}
                  className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent-hover text-white px-5 py-3 rounded-lg font-medium text-sm transition-all cursor-pointer"
                >
                  Hubungi Saya
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
