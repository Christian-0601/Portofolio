import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { SiReact, SiTypescript, SiNodedotjs, SiNextdotjs, SiTailwindcss } from 'react-icons/si';
import AnimatedSection from '../../components/AnimatedSection';
import { loadPortfolioContent, defaultPortfolioContent } from '../../data/portfolio';

// Import sections
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Certificates from './Certificates';
import Journey from './Journey';
import Contact from './Contact';

export default function Home() {
  const [content, setContent] = useState(defaultPortfolioContent);

  useEffect(() => {
    loadPortfolioContent()
      .then(setContent)
      .catch(() => setContent(defaultPortfolioContent));
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex-1 flex flex-col relative z-20 w-full">
      {/* Hero Section */}
      <section id="home" className="min-h-[calc(100vh-80px)] pt-10 pb-20 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <div className="flex flex-col justify-center order-2 lg:order-1 pb-16">
            <AnimatedSection>
              <div className="inline-block bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-6">
                I'm a Web Developer
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight mb-4">
                Hi, I'm <span className="text-accent">{content.home.title.includes('Portfolio') ? 'Aloysius' : content.home.title}</span>
                <br />
                {content.home.subtitle}
              </h1>
              
              <p className="text-lg text-gray-400 font-light mb-10 max-w-lg leading-relaxed">
                {content.home.description}
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={0.1} className="flex flex-col sm:flex-row gap-4 mb-12">
              <a href="#projects" onClick={(e) => handleScrollTo(e, 'projects')} className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white px-6 py-3.5 rounded-lg font-medium transition-all group">
                View My Work
                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <a
                href="/Aloysius%20Christian%20Putra_CV%20ATS%20VII%20TKJ%202026%20.pdf"
                download="Aloysius-Christian-CV-ATS-VII-TKJ-2026.pdf"
                className="flex items-center justify-center gap-2 border border-border-hover text-white hover:bg-white/5 px-6 py-3.5 rounded-lg font-medium transition-all"
              >
                Download CV
                <Download size={18} />
              </a>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Technologies I Work With</p>
              <div className="flex flex-wrap gap-4 items-center">
                {[
                  { name: 'React', Icon: SiReact, color: 'group-hover:text-[#61DAFB]' },
                  { name: 'TypeScript', Icon: SiTypescript, color: 'group-hover:text-[#3178C6]' },
                  { name: 'Node.js', Icon: SiNodedotjs, color: 'group-hover:text-[#339933]' },
                  { name: 'Next.js', Icon: SiNextdotjs, color: 'group-hover:text-white' },
                  { name: 'Tailwind', Icon: SiTailwindcss, color: 'group-hover:text-[#06B6D4]' },
                ].map((tech) => (
                  <div key={tech.name} title={tech.name} className="w-10 h-10 rounded-lg bg-bg-card border border-border-main flex items-center justify-center group hover:border-accent/50 transition-colors">
                    <span className={`text-xl text-gray-400 transition-colors ${tech.color}`}>
                      <tech.Icon />
                    </span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Right Content / Hero Graphic */}
          <div className="relative flex justify-center items-center order-1 lg:order-2 pb-10 lg:pb-0">
            <AnimatedSection delay={0.3} className="relative w-full max-w-md aspect-square flex items-center justify-center">
              {/* Purple Circle Background */}
              <div className="absolute inset-0 bg-accent rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute inset-4 bg-linear-to-br from-accent/80 to-[#1e1b4b] rounded-full overflow-hidden flex items-center justify-center ring-2 ring-accent p-1">
                 <img 
                   src="/profilephoto.jpeg" 
                   alt="Portrait of Aloysius" 
                   className="w-full h-full object-cover object-center rounded-full transition-all duration-500 scale-[1.08]"
                 />
                 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-white/10 to-black/40 pointer-events-none"></div>
              </div>

              {/* Floating Code Card */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
                className="absolute -bottom-8 right-0 md:-right-16 lg:-right-24 md:bottom-8 bg-[#0a0a0f] border border-border-main p-4 rounded-xl shadow-2xl z-10 w-64 md:w-72"
              >
                <div className="flex items-center justify-between mb-3 border-b border-border-main/50 pb-2">
                   <span className="text-[10px] text-gray-500 font-mono">{'</> Code'}</span>
                   <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="font-mono text-xs text-left leading-relaxed">
                  <span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> = {'{'}
                  <br />
                  &nbsp;&nbsp;<span className="text-gray-300">name:</span> <span className="text-orange-300">"Aloysius"</span>,
                  <br />
                  &nbsp;&nbsp;<span className="text-gray-300">skills:</span> [<span className="text-orange-300">"React"</span>, <span className="text-orange-300">"TS"</span>],
                  <br />
                  &nbsp;&nbsp;<span className="text-gray-300">passion:</span> <span className="text-orange-300">"Building web"</span>
                  <br />
                  {'}'};
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Other Sections */}
      <section id="about" className="py-20 scroll-mt-20">
        <About />
      </section>
      
      <section id="skills" className="py-20 scroll-mt-20">
        <Skills />
      </section>

      <section id="projects" className="py-20 scroll-mt-20">
        <Projects />
      </section>

      <section id="certificates" className="py-20 scroll-mt-20">
        <Certificates />
      </section>

      <section id="journey" className="py-20 scroll-mt-20">
        <Journey />
      </section>

      <section id="contact" className="py-20 scroll-mt-20">
        <Contact />
      </section>
    </div>
  );
}
