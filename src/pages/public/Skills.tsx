import React, { useEffect, useState } from 'react';
import { BottomBar } from '../../components/layout/BottomBar';
import { Code2, Network, Wrench, ShieldCheck } from 'lucide-react';

import AnimatedSection from '../../components/AnimatedSection';
import { defaultPortfolioContent, loadPortfolioContent } from '../../data/portfolio';

const skillCategories = [
  {
    title: 'Development',
    icon: Code2,
    description: 'Building robust logic and interfaces',
    skills: [
      { name: 'PHP', level: 90 },
      { name: 'Laravel', level: 85 },
      { name: 'MySQL', level: 85 },
      { name: 'JavaScript', level: 80 },
      { name: 'HTML & CSS', level: 95 },
    ]
  },
  {
    title: 'Networking',
    icon: Network,
    description: 'Architecting and managing infrastructures',
    skills: [
      { name: 'MikroTik', level: 85 },
      { name: 'TCP/IP Protocols', level: 90 },
      { name: 'Network Installation', level: 80 },
      { name: 'Fiber Optic', level: 75 },
    ]
  },
  {
    title: 'Cybersecurity',
    icon: ShieldCheck,
    description: 'Securing systems and endpoints',
    skills: [
      { name: 'Network Security', level: 80 },
      { name: 'Endpoint Security', level: 75 },
      { name: 'Basic Cryptography', level: 70 },
      { name: 'Access Control', level: 85 },
    ]
  },
  {
    title: 'Tools & OS',
    icon: Wrench,
    description: 'Environments and deployment',
    skills: [
      { name: 'Linux Administration', level: 85 },
      { name: 'Docker', level: 75 },
      { name: 'Git & GitHub', level: 85 },
      { name: 'VirtualBox / Proxmox', level: 80 },
      { name: 'VS Code & XAMPP', level: 95 },
    ]
  },
];

export default function Skills() {
  const [content, setContent] = useState(defaultPortfolioContent);

  useEffect(() => {
    loadPortfolioContent()
      .then(setContent)
      .catch(() => setContent(defaultPortfolioContent));
  }, []);

  return (
    <div className="flex-1 flex flex-col relative z-20 h-full">
      <div className="flex-1 w-full space-y-12 pb-10">
        
        {/* Header */}
        <AnimatedSection className="mt-8">
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-4">Capabilities</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-6">Technical Skills</h1>
          <p className="text-[#888] text-lg max-w-2xl leading-relaxed">
            {content.about.bio}
          </p>
        </AnimatedSection>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <AnimatedSection key={idx} delay={idx * 0.1} className="bg-bg-card border border-border-main rounded-3xl p-8 hover:border-border-hover transition-colors group">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="w-12 h-12 bg-white/5 group-hover:bg-accent/10 rounded-2xl flex items-center justify-center text-white group-hover:text-accent transition-colors">
                    <Icon size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                </div>
                <p className="text-[#666] text-sm mb-8">{category.description}</p>
                
                <div className="space-y-6">
                  {category.skills.map((skill, skillIdx) => (
                    <div key={skillIdx} className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-white font-medium">{skill.name}</span>
                        <span className="text-[#666] font-mono">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-border-main rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-accent rounded-full shadow-[0_0_10px_#00FF00]/50"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            );
          })}
        </div>

      </div>
      
    </div>
  );
}
