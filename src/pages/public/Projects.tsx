import React, { useState, useEffect } from 'react';
import { BottomBar } from '../../components/layout/BottomBar';
import { ExternalLink, GitBranch, FolderGit2 } from 'lucide-react';

import AnimatedSection from '../../components/AnimatedSection';
import { defaultPortfolioContent, loadPortfolioContent } from '../../data/portfolio';

const mockProjects = [
  {
    title: 'UMKM Hub',
    category: 'Web Application',
    description: 'A comprehensive digital platform designed to connect local micro, small, and medium enterprises with a broader market, featuring a robust CMS.',
    tech: ['Laravel', 'PHP', 'MySQL', 'Tailwind'],
    github: '#',
    demo: '#'
  },
  {
    title: 'FirjaNet',
    category: 'Networking',
    description: 'A complete ISP network architecture setup and management dashboard integrating MikroTik API for automated billing and bandwidth management.',
    tech: ['MikroTik API', 'PHP', 'Linux', 'Docker'],
    github: '#',
    demo: '#'
  },
  {
    title: 'Library Website',
    category: 'Web Application',
    description: 'An integrated school library management system allowing students to search for books, place holds, and librarians to manage inventory seamlessly.',
    tech: ['Laravel', 'MySQL', 'JavaScript'],
    github: '#',
    demo: '#'
  },
  {
    title: 'News Website',
    category: 'CMS Platform',
    description: 'A high-performance news portal featuring dynamic category routing, role-based access control for editors, and SEO-optimized structures.',
    tech: ['PHP', 'MySQL', 'Tailwind', 'SEO'],
    github: '#',
    demo: '#'
  },
  {
    title: 'E-Commerce Website',
    category: 'Full-Stack E-Commerce',
    description: 'A scalable online storefront complete with a shopping cart, secure checkout flow, and a dedicated admin dashboard for inventory control.',
    tech: ['Laravel', 'React', 'MySQL', 'Stripe'],
    github: '#',
    demo: '#'
  },
  {
    title: 'Developer Portfolio',
    category: 'Personal Branding',
    description: 'A modern, elegant dark-themed portfolio designed for a technology professional, complete with a custom built backend CMS.',
    tech: ['React', 'TypeScript', 'Tailwind'],
    github: '#',
    demo: '#'
  }
];

export default function Projects() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(defaultPortfolioContent);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    loadPortfolioContent()
      .then(setContent)
      .catch(() => setContent(defaultPortfolioContent));

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col relative z-20 h-full">
      <div className="flex-1 w-full space-y-12 pb-10">
        
        {/* Header */}
        <AnimatedSection className="mt-8">
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-4">Showcase</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-6">Featured Projects</h1>
          <p className="text-[#888] text-lg max-w-2xl leading-relaxed">
            This portfolio website is my current project showcase, highlighting my capabilities and professional identity.
          </p>
        </AnimatedSection>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="bg-bg-card border border-border-main rounded-3xl overflow-hidden flex flex-col h-100">
                <div className="w-full aspect-video bg-border-main animate-pulse"></div>
                <div className="p-6 flex flex-col flex-1 gap-4">
                  <div className="h-3 w-20 bg-border-main animate-pulse rounded-full"></div>
                  <div className="h-6 w-3/4 bg-border-main animate-pulse rounded-full"></div>
                  <div className="space-y-2 mt-2">
                    <div className="h-4 w-full bg-border-main animate-pulse rounded-full"></div>
                    <div className="h-4 w-5/6 bg-border-main animate-pulse rounded-full"></div>
                  </div>
                  <div className="flex gap-2 mt-auto">
                     <div className="h-6 w-16 bg-border-main animate-pulse rounded-full"></div>
                     <div className="h-6 w-16 bg-border-main animate-pulse rounded-full"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            content.projects.map((project, idx) => (
              <AnimatedSection 
                key={idx} 
                delay={idx * 0.1}
                className="bg-bg-card border border-border-main rounded-3xl overflow-hidden hover:border-accent/40 hover:shadow-[0_0_30px_rgba(0,255,0,0.05)] transition-all duration-300 group flex flex-col cursor-pointer"
              >
                {/* Project Image Area */}
                <div className="w-full aspect-video bg-bg-muted relative overflow-hidden border-b border-border-main">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-linear-to-br from-border-main to-transparent opacity-50"></div>
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {!project.image && <FolderGit2 size={48} className="text-[#222] group-hover:text-border-hover transition-colors duration-300" />}
                  </div>
                  
                  {/* Links */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-2.5 group-hover:translate-y-0">
                    <a href={project.github || '#'} className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-accent hover:text-black transition-colors">
                      <GitBranch size={18} />
                    </a>
                    <a href={project.demo || '#'} className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-accent hover:text-black transition-colors">
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-accent font-mono text-[10px] uppercase tracking-widest mb-2">Project</p>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">{project.title}</h3>
                  <p className="text-[#888] text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies.map((tech, techIdx) => (
                      <span 
                        key={techIdx} 
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-[#ccc]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))
          )}
        </div>

      </div>
      
    </div>
  );
}
