import React, { useState, useEffect } from 'react';
import { BottomBar } from '../../components/layout/BottomBar';
import { Send, GitBranch, Briefcase, MessageSquare, Mail, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { SiLinktree } from 'react-icons/si';
import AnimatedSection from '../../components/AnimatedSection';
import { defaultPortfolioContent, loadPortfolioContent } from '../../data/portfolio';

export default function Contact() {
  const [content, setContent] = useState(defaultPortfolioContent);
  const whatsappPhone = content.contact.phone.replace(/\D/g, '');
  const socialLinks = [
    {
      name: 'Linktree',
      icon: SiLinktree,
      url: 'https://linktr.ee/aloysiuschrist',
      description: 'Temukan semua tautan penting saya di satu tempat.'
    },
    {
      name: 'GitHub',
      icon: GitBranch,
      url: 'https://github.com/Christian-0601',
      description: 'Jelajahi proyek open-source dan repositori kode saya.'
    },
    {
      name: 'LinkedIn',
      icon: Briefcase,
      url: 'https://www.linkedin.com/in/aloysius-christian-putra/',
      description: 'Terhubung dengan saya untuk peluang profesional dan networking.'
    },
    {
      name: 'WhatsApp',
      icon: MessageSquare,
      url: whatsappPhone ? `https://wa.me/${whatsappPhone}` : '#',
      description: 'Chat langsung dengan saya melalui WhatsApp.'
    }
  ];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    loadPortfolioContent()
      .then(setContent)
      .catch(() => setContent(defaultPortfolioContent));
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Nama wajib diisi';
    else if (formData.name.length < 2) newErrors.name = 'Nama minimal 2 karakter';
    else if (formData.name.length > 50) newErrors.name = 'Nama maksimal 50 karakter';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = 'Email wajib diisi';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Format email tidak valid';

    if (!formData.subject.trim()) newErrors.subject = 'Subjek wajib diisi';
    else if (formData.subject.length < 3) newErrors.subject = 'Subjek minimal 3 karakter';
    else if (formData.subject.length > 100) newErrors.subject = 'Subjek maksimal 100 karakter';

    if (!formData.message.trim()) newErrors.message = 'Pesan wajib diisi';
    else if (formData.message.length < 10) newErrors.message = 'Pesan minimal 10 karakter';
    else if (formData.message.length > 1000) newErrors.message = 'Pesan maksimal 1000 karakter';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      }, 1500);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  return (
    <div className="flex-1 flex flex-col relative z-20 h-full">
      <div className="flex-1 w-full space-y-12 pb-10">
        
        {/* Header */}
        <AnimatedSection className="mt-8">
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-4">Hubungi Saya</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-6">Kontak</h1>
          <p className="text-[#888] text-lg max-w-2xl leading-relaxed">
            Baik Anda punya pertanyaan, proposal proyek, atau hanya ingin menyapa, 
            saya akan berusaha membalas secepat mungkin.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">
          
          {/* Left Column - Contact Form */}
          <AnimatedSection delay={0.1} className="bg-bg-card border border-border-main rounded-3xl p-8 lg:p-10 hover:border-[#222] transition-colors">
            <h2 className="text-2xl font-bold text-white mb-8">Kirim Pesan</h2>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              {isSuccess && (
                <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 flex items-center space-x-3 text-accent">
                  <CheckCircle size={20} />
                  <span className="font-medium text-sm">Pesan berhasil dikirim! Saya akan segera membalas Anda.</span>
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-[#888] uppercase tracking-wider">Nama Anda</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-bg-main border ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-border-main focus:border-accent focus:ring-accent'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all duration-300 placeholder:text-[#444]`}
                    placeholder="Nama Anda"
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/>{errors.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-[#888] uppercase tracking-wider">Alamat Email</label>
                  <input 
                    type="email" 
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-bg-main border ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-border-main focus:border-accent focus:ring-accent'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all duration-300 placeholder:text-[#444]`}
                    placeholder="contoh@email.com"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/>{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="subject" className="block text-sm font-medium text-[#888] uppercase tracking-wider">Subjek</label>
                  <span className="text-xs text-[#555] font-mono">{formData.subject.length}/100</span>
                </div>
                <input 
                  type="text" 
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full bg-bg-main border ${errors.subject ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-border-main focus:border-accent focus:ring-accent'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all duration-300 placeholder:text-[#444]`}
                  placeholder="Pertanyaan Proyek"
                  disabled={isSubmitting}
                />
                {errors.subject && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/>{errors.subject}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="message" className="block text-sm font-medium text-[#888] uppercase tracking-wider">Pesan</label>
                  <span className="text-xs text-[#555] font-mono">{formData.message.length}/1000</span>
                </div>
                <textarea 
                  id="message" 
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full bg-bg-main border ${errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-border-main focus:border-accent focus:ring-accent'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all duration-300 placeholder:text-[#444] resize-none`}
                  placeholder="Halo, saya ingin membahas tentang..."
                  disabled={isSubmitting}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/>{errors.message}</p>
                )}
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-white/5 border border-white/10 hover:bg-accent hover:text-black hover:border-accent text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-xl px-6 py-4 font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-3 group"
              >
                <span>{isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}</span>
                {!isSubmitting && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />}
              </button>
            </form>
          </AnimatedSection>

          {/* Right Column - Contact Info & Socials */}
          <div className="space-y-8">
            
            <AnimatedSection delay={0.2} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-bg-card border border-border-main rounded-3xl p-6 flex flex-col items-start hover:border-border-hover transition-colors">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-accent mb-4">
                  <Mail size={24} />
                </div>
                <p className="text-[#888] text-sm uppercase tracking-widest mb-1 font-medium">Email Saya</p>
                <p className="text-white font-medium">{content.contact.email}</p>
              </div>

              <div className="bg-bg-card border border-border-main rounded-3xl p-6 flex flex-col items-start hover:border-border-hover transition-colors">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-accent mb-4">
                  <MapPin size={24} />
                </div>
                <p className="text-[#888] text-sm uppercase tracking-widest mb-1 font-medium">Lokasi</p>
                <p className="text-white font-medium">{content.contact.location}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <h2 className="text-2xl font-bold text-white pt-4 mb-2">Terhubung dengan saya</h2>
              <p className="text-[#888] mb-6">Temukan saya di berbagai ruang digital ini.</p>

              <div className="space-y-4">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <a 
                      key={idx} 
                      href={social.url}
                      target={social.url.startsWith('http') ? '_blank' : undefined}
                      rel={social.url.startsWith('http') ? 'noreferrer' : undefined}
                      className="flex items-center space-x-4 sm:space-x-6 p-4 sm:p-6 rounded-3xl bg-bg-card border border-border-main hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 bg-bg-muted rounded-2xl flex items-center justify-center text-white group-hover:text-accent group-hover:scale-110 transition-all duration-300 shadow-inner">
                        <Icon size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors mb-1">{social.name}</h3>
                        <p className="text-[#888] text-sm leading-snug">{social.description}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </AnimatedSection>

          </div>
        </div>
      </div>
      
    </div>
  );
}
