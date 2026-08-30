import React, { useState, useEffect } from 'react';
import { BottomBar } from '../../components/layout/BottomBar';
import { Milestone } from 'lucide-react';
import { defaultPortfolioContent, loadPortfolioContent } from '../../data/portfolio';

const mockJourney = [
  {
    id: 1,
    year: '2024 - Present',
    title: 'Cloud Architecture & Full-Stack Development',
    description: 'Preparing for cloud certifications (AWS) while building complex full-stack applications using React, Node.js, and modern CI/CD pipelines. Exploring containerization with Docker and Kubernetes.'
  },
  {
    id: 2,
    year: '2023',
    title: 'Professional Certifications & Advanced Networking',
    description: 'Achieved the MTCNA certification and deepened knowledge in enterprise networking. Began integrating network automation tools and developing custom ISP management dashboards.'
  },
  {
    id: 3,
    year: '2022',
    title: 'Diving into Web Development',
    description: 'Transitioned from pure networking into software development. Learned HTML, CSS, JavaScript, and PHP. Built first dynamic web projects using Laravel and MySQL.'
  },
  {
    id: 4,
    year: '2021',
    title: 'Started Vocational High School (TKJ)',
    description: 'Enrolled in Computer and Network Engineering. Built a strong foundation in hardware troubleshooting, operating systems (Linux/Windows), and basic LAN topologies.'
  }
];

export default function Journey() {
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
        <div className="mt-8">
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-4">Timeline</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-6">{content.journey.title}</h1>
          <p className="text-[#888] text-lg max-w-2xl leading-relaxed">
            {content.journey.description}
          </p>
        </div>

        {/* Timeline Section */}
        <div className="pt-8">
          <div className="relative border-l border-border-main ml-4 md:ml-8">
            {loading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="relative pl-8 md:pl-12 pb-16 last:pb-0">
                  <div className="absolute -left-5.25 top-1">
                    <div className="w-10 h-10 rounded-full bg-border-main animate-pulse shadow-[0_0_0_8px_#000]"></div>
                  </div>
                  <div className="bg-bg-card border border-border-main rounded-3xl p-6 md:p-8 h-45 flex flex-col gap-4">
                     <div className="flex justify-between items-center">
                       <div className="h-6 w-1/2 bg-border-main animate-pulse rounded-full"></div>
                       <div className="h-6 w-24 bg-border-main animate-pulse rounded-full"></div>
                     </div>
                     <div className="space-y-3 mt-4">
                       <div className="h-4 w-full bg-border-main animate-pulse rounded-full"></div>
                       <div className="h-4 w-5/6 bg-border-main animate-pulse rounded-full"></div>
                       <div className="h-4 w-4/6 bg-border-main animate-pulse rounded-full"></div>
                     </div>
                  </div>
                </div>
              ))
            ) : (
              mockJourney.map((item, idx) => (
                <div key={item.id} className="relative pl-8 md:pl-12 pb-16 last:pb-0 group">
                  
                  {/* Timeline Node/Dot */}
                  <div className="absolute -left-5.25 top-1 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-bg-card border border-border-main flex items-center justify-center group-hover:border-accent transition-colors duration-300 z-10 shadow-[0_0_0_8px_#000]">
                      <Milestone size={16} className="text-[#666] group-hover:text-accent transition-colors duration-300" />
                    </div>
                    {/* Subtle glow behind the node */}
                    <div className="absolute inset-0 rounded-full bg-accent/0 group-hover:bg-accent/20 blur-md transition-all duration-300"></div>
                  </div>

                  {/* Content Card */}
                  <div className="bg-bg-card border border-border-main rounded-3xl p-6 md:p-8 hover:border-border-hover hover:-translate-y-1 transition-all duration-300 group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-accent transition-colors">{item.title}</h3>
                      <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-border-main border border-[#222] text-accent font-mono text-sm tracking-widest whitespace-nowrap">
                        {item.year}
                      </div>
                    </div>
                    <p className="text-[#888] text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                </div>
              ))
            )}
          </div>
        </div>

      </div>
      
    </div>
  );
}
