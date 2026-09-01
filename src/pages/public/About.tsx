import React, { useEffect, useState } from 'react';
import { BottomBar } from '../../components/layout/BottomBar';
import { BookOpen, Target, Cpu, Code2, Shield, Server, GraduationCap } from 'lucide-react';

import AnimatedSection from '../../components/AnimatedSection';
import { defaultPortfolioContent, loadPortfolioContent } from '../../data/portfolio';

const mockStats = [
  { label: 'Proyek', value: '5+', description: 'Proyek web dan jaringan yang dikerjakan secara langsung' },
  { label: 'Sertifikat', value: '3', description: 'Sertifikat profesional yang berhasil diraih' },
  { label: 'Teknologi', value: '10+', description: 'Alat, framework, dan sistem utama yang digunakan' },
  { label: 'Tahun Belajar', value: '3+', description: 'Pertumbuhan fokus di bidang IT dan pengembangan' },
];

const mockInterests = [
  { name: 'Pengembangan Web', icon: Code2 },
  { name: 'Jaringan', icon: Server },
  { name: 'Keamanan Siber', icon: Shield },
  { name: 'Cloud Computing', icon: Cpu },
  { name: 'Administrasi Linux', icon: Target },
];

export default function About() {
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
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-4">Kenali</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-6">{content.about.title}</h1>
          <p className="text-[#888] text-lg max-w-2xl leading-relaxed">
            {content.about.bio}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Edu & Goal */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Education Card */}
            <AnimatedSection delay={0.1} className="bg-bg-card border border-border-main rounded-3xl p-8 hover:border-border-hover transition-colors">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                  <GraduationCap size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">Pendidikan</h2>
              </div>
              
              <div className="border-l-2 border-border-main pl-6 ml-6 space-y-8 relative">
                <div className="relative">
                  <div className="absolute -left-8.75 top-1 w-4 h-4 rounded-full bg-bg-card border-2 border-accent"></div>
                  <h3 className="text-xl font-bold text-white">Teknik Komputer & Jaringan (TKJ)</h3>
                  <p className="text-accent font-mono text-sm mt-2">Sekolah Menengah Kejuruan (SMK)</p>
                  <p className="text-[#888] mt-4 leading-relaxed">
                    Saat ini fokus pada jaringan komputer, administrasi sistem, dan teknologi web modern. 
                    Mendapatkan pengalaman langsung dalam TCP/IP, MikroTik, server Linux, dan pengembangan software full-stack.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Career Goal Card */}
            <AnimatedSection delay={0.2} className="bg-bg-card border border-border-main rounded-3xl p-8 hover:border-border-hover transition-colors">
               <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white">
                  <Target size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">Tujuan Karier</h2>
              </div>
              <p className="text-[#888] leading-relaxed text-lg">
                Tujuan utama saya adalah menjadi <strong className="text-white font-medium">Cloud Architect</strong>. 
                Saya ingin merancang, membangun, dan mengelola infrastruktur cloud yang scalable, aman, dan tersedia dengan tinggi untuk mendukung aplikasi digital modern.
              </p>
            </AnimatedSection>

          </div>

          {/* Right Column - Interests & Stats */}
          <div className="space-y-8">
            
            {/* Tech Interests */}
            <AnimatedSection delay={0.3} className="bg-bg-card border border-border-main rounded-3xl p-8 hover:border-border-hover transition-colors h-full">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white">
                  <BookOpen size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">Minat Teknologi</h2>
              </div>
              <div className="space-y-4">
                {mockInterests.map((interest, idx) => {
                  const Icon = interest.icon;
                  return (
                    <div key={idx} className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all">
                      <div className="text-accent">
                        <Icon size={20} />
                      </div>
                      <span className="text-white font-medium tracking-wide text-sm">{interest.name}</span>
                    </div>
                  )
                })}
              </div>
            </AnimatedSection>

          </div>
        </div>

        {/* Statistics Grid */}
        <AnimatedSection delay={0.4} className="pt-8">
          <h2 className="text-2xl font-bold text-white mb-8">Dalam Angka</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockStats.map((stat, idx) => (
              <div key={idx} className="bg-bg-card border border-border-main rounded-3xl p-6 flex flex-col justify-center hover:border-accent/50 transition-colors group">
                <p className="text-4xl md:text-5xl font-bold text-white group-hover:text-accent transition-colors mb-3">{stat.value}</p>
                <p className="text-sm uppercase tracking-widest text-white font-bold mb-2">{stat.label}</p>
                <p className="text-xs text-[#666] leading-relaxed">{stat.description}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

      </div>
      
    </div>
  );
}
