import React, { useState } from 'react';
import { BottomBar } from '../../components/layout/BottomBar';
import { Send, GitBranch, Briefcase, MessageSquare, Mail, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { SiLinktree } from 'react-icons/si';
import AnimatedSection from '../../components/AnimatedSection';

const socialLinks = [
  {
    name: 'Linktree',
    icon: SiLinktree,
    url: '#',
    description: 'Find all my important links in one place.'
  },
  {
    name: 'GitHub',
    icon: GitBranch,
    url: '#',
    description: 'Explore my open-source projects and code repositories.'
  },
  {
    name: 'LinkedIn',
    icon: Briefcase,
    url: '#',
    description: 'Connect with me for professional opportunities and networking.'
  },
  {
    name: 'Discord',
    icon: MessageSquare,
    url: '#',
    description: 'Join my community or send me a direct message.'
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (formData.name.length < 2) newErrors.name = 'Name must be at least 2 characters';
    else if (formData.name.length > 50) newErrors.name = 'Name must be less than 50 characters';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format';

    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    else if (formData.subject.length < 3) newErrors.subject = 'Subject must be at least 3 characters';
    else if (formData.subject.length > 100) newErrors.subject = 'Subject must be less than 100 characters';

    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.length < 10) newErrors.message = 'Message must be at least 10 characters';
    else if (formData.message.length > 1000) newErrors.message = 'Message must be less than 1000 characters';

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
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-4">Get In Touch</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-6">Contact Me</h1>
          <p className="text-[#888] text-lg max-w-2xl leading-relaxed">
            Whether you have a question, a project proposal, or just want to say hi, 
            I'll try my best to get back to you!
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">
          
          {/* Left Column - Contact Form */}
          <AnimatedSection delay={0.1} className="bg-bg-card border border-border-main rounded-3xl p-8 lg:p-10 hover:border-[#222] transition-colors">
            <h2 className="text-2xl font-bold text-white mb-8">Send a Message</h2>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              {isSuccess && (
                <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 flex items-center space-x-3 text-accent">
                  <CheckCircle size={20} />
                  <span className="font-medium text-sm">Message sent successfully! I'll get back to you soon.</span>
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-[#888] uppercase tracking-wider">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-bg-main border ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-border-main focus:border-accent focus:ring-accent'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all duration-300 placeholder:text-[#444]`}
                    placeholder="John Doe"
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/>{errors.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-[#888] uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-bg-main border ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-border-main focus:border-accent focus:ring-accent'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all duration-300 placeholder:text-[#444]`}
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/>{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="subject" className="block text-sm font-medium text-[#888] uppercase tracking-wider">Subject</label>
                  <span className="text-xs text-[#555] font-mono">{formData.subject.length}/100</span>
                </div>
                <input 
                  type="text" 
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full bg-bg-main border ${errors.subject ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-border-main focus:border-accent focus:ring-accent'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all duration-300 placeholder:text-[#444]`}
                  placeholder="Project Inquiry"
                  disabled={isSubmitting}
                />
                {errors.subject && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/>{errors.subject}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="message" className="block text-sm font-medium text-[#888] uppercase tracking-wider">Message</label>
                  <span className="text-xs text-[#555] font-mono">{formData.message.length}/1000</span>
                </div>
                <textarea 
                  id="message" 
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full bg-bg-main border ${errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-border-main focus:border-accent focus:ring-accent'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all duration-300 placeholder:text-[#444] resize-none`}
                  placeholder="Hello, I'd like to talk about..."
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
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
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
                <p className="text-[#888] text-sm uppercase tracking-widest mb-1 font-medium">Email Me</p>
                <p className="text-white font-medium">tianputra594@gmail.com</p>
              </div>

              <div className="bg-bg-card border border-border-main rounded-3xl p-6 flex flex-col items-start hover:border-border-hover transition-colors">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-accent mb-4">
                  <MapPin size={24} />
                </div>
                <p className="text-[#888] text-sm uppercase tracking-widest mb-1 font-medium">Location</p>
                <p className="text-white font-medium">Indonesia</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <h2 className="text-2xl font-bold text-white pt-4 mb-2">Connect with me</h2>
              <p className="text-[#888] mb-6">Find me across these digital spaces.</p>

              <div className="space-y-4">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <a 
                      key={idx} 
                      href={social.url}
                      className="flex items-center space-x-4 sm:space-x-6 p-4 sm:p-6 rounded-3xl bg-bg-card border border-border-main hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 bg-bg-muted rounded-2xl flex items-center justify-center text-white group-hover:text-accent group-hover:scale-110 transition-all duration-300 shadow-inner">
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
