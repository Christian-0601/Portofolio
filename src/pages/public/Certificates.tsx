import React, { useState, useEffect } from 'react';
import { BottomBar } from '../../components/layout/BottomBar';
import { Award, X, ExternalLink, ShieldCheck, Calendar, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const mockCertificates = [
  {
    id: 1,
    name: 'MikroTik Certified Network Associate (MTCNA)',
    issuer: 'MikroTik',
    date: 'Aug 2023',
    timestamp: new Date('2023-08-01').getTime(),
    credentialId: 'MTCNA-2023-87654',
    credentialUrl: '#',
    description: 'Validates familiarity with RouterOS software and RouterBOARD products, capable of connecting clients to the Internet, configuring, managing, and troubleshooting a MikroTik router.'
  },
  {
    id: 2,
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: 'Jan 2024',
    timestamp: new Date('2024-01-01').getTime(),
    credentialId: 'AWS-CCP-12345',
    credentialUrl: '#',
    description: 'Demonstrates overall understanding of the AWS Cloud platform, covering basic cloud concepts, security, architecture, pricing, and support.'
  },
  {
    id: 3,
    name: 'Junior Web Developer',
    issuer: 'BNSP',
    date: 'Nov 2023',
    timestamp: new Date('2023-11-01').getTime(),
    credentialId: 'BNSP-JWD-9999',
    credentialUrl: '#',
    description: 'National certification for web development proficiency, encompassing HTML, CSS, JavaScript, PHP, database integration, and basic security practices.'
  },
  {
    id: 4,
    name: 'Cisco Networking Academy: CCNA v7',
    issuer: 'Cisco',
    date: 'May 2023',
    timestamp: new Date('2023-05-01').getTime(),
    credentialId: 'CISCO-CCNA-555',
    credentialUrl: '#',
    description: 'Comprehensive networking fundamentals including routing, switching, wireless essentials, and basic network security.'
  }
];

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<typeof mockCertificates[0] | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Newest');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Prevent background scrolling when modal is open
  React.useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedCert]);

  const filteredCerts = mockCertificates
    .filter(cert => filter === 'All' || cert.issuer === filter)
    .sort((a, b) => {
      if (sort === 'Newest') return b.timestamp - a.timestamp;
      return a.timestamp - b.timestamp;
    });

  return (
    <div className="flex-1 flex flex-col relative z-20 h-full">
      <div className="flex-1 w-full space-y-12 pb-10">
        
        {/* Header */}
        <div className="mt-8">
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-4">Credentials</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-6">Certificates</h1>
          <p className="text-[#888] text-lg max-w-2xl leading-relaxed">
            Professional certifications and awards that validate my skills in network engineering, 
            cloud computing, and software development.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex space-x-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            {['All', 'Amazon Web Services', 'MikroTik', 'Cisco', 'BNSP'].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-4 py-2 rounded-full text-xs font-mono whitespace-nowrap transition-colors border ${
                  filter === filterOption
                    ? 'bg-accent text-black border-accent'
                    : 'bg-white/5 text-[#888] border-white/10 hover:text-white hover:border-white/30'
                }`}
              >
                {filterOption}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-bg-card border border-border-main rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-accent w-full sm:w-auto appearance-none cursor-pointer"
          >
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
          </select>
        </div>

        {/* Certificates Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {loading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <motion.div 
                  key={`skeleton-${idx}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-bg-card border border-border-main rounded-3xl p-6 flex flex-col h-[220px]"
                >
                  <div className="flex justify-between mb-6">
                    <div className="w-12 h-12 bg-border-main animate-pulse rounded-2xl"></div>
                    <div className="w-20 h-6 bg-border-main animate-pulse rounded-full"></div>
                  </div>
                  <div className="h-6 w-3/4 bg-border-main animate-pulse rounded-full mb-3"></div>
                  <div className="h-4 w-1/2 bg-border-main animate-pulse rounded-full mb-4"></div>
                  <div className="mt-auto pt-4 border-t border-border-main">
                     <div className="h-3 w-24 bg-border-main animate-pulse rounded-full"></div>
                  </div>
                </motion.div>
              ))
            ) : (
              filteredCerts.map((cert) => (
                <motion.div 
                  layout
                  key={cert.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedCert(cert)}
                  className="bg-bg-card border border-border-main rounded-3xl p-6 flex flex-col cursor-pointer hover:border-accent/40 hover:shadow-[0_0_30px_rgba(0,255,0,0.05)] transition-colors duration-300 group"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 bg-white/5 group-hover:bg-accent/10 rounded-2xl flex items-center justify-center text-white group-hover:text-accent transition-colors">
                      <Award size={24} />
                    </div>
                    <div className="bg-border-main px-3 py-1 rounded-full text-xs font-mono text-[#888] group-hover:text-white transition-colors">
                      {cert.date}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">{cert.name}</h3>
                  <div className="flex items-center space-x-2 text-[#666] mb-4">
                    <ShieldCheck size={16} />
                    <span className="text-sm font-medium">{cert.issuer}</span>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-border-main flex items-center justify-between">
                    <span className="text-accent text-xs font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      View Details
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      

      {/* Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
              onClick={() => setSelectedCert(null)}
            ></div>
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-bg-main border border-border-main rounded-3xl w-full max-w-lg relative z-10 overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-border-main flex justify-between items-start">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                  <Award size={24} />
                </div>
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#888] hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Modal Body */}
              <div className="p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedCert.name}</h3>
                  <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-[#ccc] text-sm">
                    <ShieldCheck size={16} className="text-accent" />
                    <span>{selectedCert.issuer}</span>
                  </div>
                </div>
                
                <p className="text-[#888] leading-relaxed">
                  {selectedCert.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border-main">
                  <div>
                    <p className="text-[10px] text-[#666] font-mono uppercase tracking-widest mb-1 flex items-center gap-1">
                      <Calendar size={12} /> Issued Date
                    </p>
                    <p className="text-white text-sm font-medium">{selectedCert.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#666] font-mono uppercase tracking-widest mb-1 flex items-center gap-1">
                      <Hash size={12} /> Credential ID
                    </p>
                    <p className="text-white text-sm font-medium">{selectedCert.credentialId}</p>
                  </div>
                </div>
              </div>
              
              {/* Modal Footer */}
              <div className="p-6 bg-[#0f0f0f] border-t border-border-main flex justify-end">
                <a 
                  href={selectedCert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2 bg-accent hover:bg-accent-hover text-black px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-colors"
                >
                  <span>Verify Credential</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
