import React, { useState } from 'react';
import { BottomBar } from '../../components/layout/BottomBar';
import { Shield, Lock, AlertCircle, CheckCircle, Plus, LayoutDashboard, LogOut } from 'lucide-react';
import AnimatedSection from '../../components/AnimatedSection';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Login Form State
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});

  // CMS Form State
  const [cmsData, setCmsData] = useState({
    title: '',
    category: '',
    description: '',
    github: ''
  });
  const [cmsErrors, setCmsErrors] = useState<Record<string, string>>({});

  // --- Handlers for Login ---
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginData(prev => ({ ...prev, [id]: value }));
    if (loginErrors[id]) setLoginErrors(prev => ({ ...prev, [id]: '' }));
  };

  const validateLogin = () => {
    const errors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!loginData.email.trim()) errors.email = 'Email is required';
    else if (!emailRegex.test(loginData.email)) errors.email = 'Invalid email format';

    if (!loginData.password) errors.password = 'Password is required';
    else if (loginData.password.length < 6) errors.password = 'Password must be at least 6 characters';

    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateLogin()) {
      setIsSubmitting(true);
      // Simulate API authentication
      setTimeout(() => {
        setIsSubmitting(false);
        if (loginData.email === 'admin@acp.dev' && loginData.password === 'admin123') {
          setIsAuthenticated(true);
        } else {
          setLoginErrors({ password: 'Invalid credentials. Hint: admin@acp.dev / admin123' });
        }
      }, 1000);
    }
  };

  // --- Handlers for CMS ---
  const handleCmsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setCmsData(prev => ({ ...prev, [id]: value }));
    if (cmsErrors[id]) setCmsErrors(prev => ({ ...prev, [id]: '' }));
  };

  const validateCms = () => {
    const errors: Record<string, string> = {};
    
    if (!cmsData.title.trim()) errors.title = 'Project title is required';
    else if (cmsData.title.length < 3) errors.title = 'Title must be at least 3 characters';
    else if (cmsData.title.length > 50) errors.title = 'Title must be less than 50 characters';

    if (!cmsData.category.trim()) errors.category = 'Category is required';

    if (!cmsData.description.trim()) errors.description = 'Description is required';
    else if (cmsData.description.length < 10) errors.description = 'Description must be at least 10 characters';
    else if (cmsData.description.length > 300) errors.description = 'Description must be less than 300 characters';

    if (cmsData.github.trim() && !cmsData.github.startsWith('http')) {
      errors.github = 'URL must start with http:// or https://';
    }

    setCmsErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCmsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateCms()) {
      setIsSubmitting(true);
      // Simulate API save
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setCmsData({ title: '', category: '', description: '', github: '' });
        setTimeout(() => setIsSuccess(false), 3000);
      }, 1200);
    }
  };

  return (
    <div className="flex-1 flex flex-col relative z-20 h-full">
      <div className="flex-1 w-full space-y-12 pb-10">
        
        {/* Header */}
        <AnimatedSection className="mt-8">
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-4">Control Panel</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-6">Admin CMS</h1>
          <p className="text-[#888] text-lg max-w-2xl leading-relaxed">
            {isAuthenticated 
              ? "Manage your portfolio content, projects, and site settings securely."
              : "Restricted area. Please sign in to access the content management system."}
          </p>
        </AnimatedSection>

        {!isAuthenticated ? (
          /* Login Form */
          <AnimatedSection delay={0.1} className="max-w-md mx-auto mt-12">
            <div className="bg-bg-card border border-border-main rounded-3xl p-8 lg:p-10 shadow-2xl">
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                  <Lock size={32} />
                </div>
              </div>
              
              <form className="space-y-6" onSubmit={handleLoginSubmit}>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-[#888] uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    className={`w-full bg-bg-main border ${loginErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-border-main focus:border-accent focus:ring-accent'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all duration-300 placeholder:text-[#444]`}
                    placeholder="admin@example.com"
                    disabled={isSubmitting}
                  />
                  {loginErrors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/>{loginErrors.email}</p>}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-[#888] uppercase tracking-wider">Password</label>
                  <input 
                    type="password" 
                    id="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className={`w-full bg-bg-main border ${loginErrors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-border-main focus:border-accent focus:ring-accent'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all duration-300 placeholder:text-[#444]`}
                    placeholder="••••••••"
                    disabled={isSubmitting}
                  />
                  {loginErrors.password && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/>{loginErrors.password}</p>}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-accent text-black hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed rounded-xl px-6 py-4 font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <span>{isSubmitting ? 'Authenticating...' : 'Sign In'}</span>
                </button>
              </form>
            </div>
          </AnimatedSection>
        ) : (
          /* CMS Dashboard Form */
          <AnimatedSection delay={0.1} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
            {/* Sidebar CMS Actions */}
            <div className="col-span-1 space-y-4">
              <div className="bg-bg-card border border-border-main rounded-3xl p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-accent">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Admin User</h3>
                    <p className="text-[#888] text-xs font-mono">Session Active</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <button className="w-full text-left px-4 py-3 bg-white/5 text-accent rounded-xl text-sm font-bold flex items-center space-x-3">
                    <Plus size={16} /> <span>Add New Project</span>
                  </button>
                  <button className="w-full text-left px-4 py-3 hover:bg-white/5 text-[#888] hover:text-white transition-colors rounded-xl text-sm font-bold flex items-center space-x-3">
                    <LayoutDashboard size={16} /> <span>Manage Projects</span>
                  </button>
                  <button 
                    onClick={() => setIsAuthenticated(false)}
                    className="w-full text-left px-4 py-3 hover:bg-red-500/10 text-red-500 rounded-xl text-sm font-bold flex items-center space-x-3 mt-8 transition-colors"
                  >
                    <LogOut size={16} /> <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Main CMS Area */}
            <div className="col-span-1 lg:col-span-2">
              <div className="bg-bg-card border border-border-main rounded-3xl p-8 lg:p-10 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-8">Add New Project</h2>
                
                <form className="space-y-6" onSubmit={handleCmsSubmit}>
                  {isSuccess && (
                    <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 flex items-center space-x-3 text-accent">
                      <CheckCircle size={20} />
                      <span className="font-medium text-sm">Project added successfully to the database!</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label htmlFor="title" className="block text-sm font-medium text-[#888] uppercase tracking-wider">Project Title</label>
                      <span className="text-xs text-[#555] font-mono">{cmsData.title.length}/50</span>
                    </div>
                    <input 
                      type="text" 
                      id="title"
                      value={cmsData.title}
                      onChange={handleCmsChange}
                      className={`w-full bg-bg-main border ${cmsErrors.title ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-border-main focus:border-accent focus:ring-accent'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all duration-300`}
                      placeholder="E.g. E-Commerce Platform"
                      disabled={isSubmitting}
                    />
                    {cmsErrors.title && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/>{cmsErrors.title}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="category" className="block text-sm font-medium text-[#888] uppercase tracking-wider">Category</label>
                    <select 
                      id="category"
                      value={cmsData.category}
                      onChange={handleCmsChange}
                      className={`w-full bg-bg-main border ${cmsErrors.category ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-border-main focus:border-accent focus:ring-accent'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all duration-300 appearance-none`}
                      disabled={isSubmitting}
                    >
                      <option value="">Select a category</option>
                      <option value="Web Application">Web Application</option>
                      <option value="Networking">Networking</option>
                      <option value="CMS Platform">CMS Platform</option>
                    </select>
                    {cmsErrors.category && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/>{cmsErrors.category}</p>}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label htmlFor="description" className="block text-sm font-medium text-[#888] uppercase tracking-wider">Short Description</label>
                      <span className="text-xs text-[#555] font-mono">{cmsData.description.length}/300</span>
                    </div>
                    <textarea 
                      id="description" 
                      rows={4}
                      value={cmsData.description}
                      onChange={handleCmsChange}
                      className={`w-full bg-bg-main border ${cmsErrors.description ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-border-main focus:border-accent focus:ring-accent'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all duration-300 resize-none`}
                      placeholder="Briefly describe the project..."
                      disabled={isSubmitting}
                    ></textarea>
                    {cmsErrors.description && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/>{cmsErrors.description}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="github" className="block text-sm font-medium text-[#888] uppercase tracking-wider">Repository URL (Optional)</label>
                    <input 
                      type="url" 
                      id="github"
                      value={cmsData.github}
                      onChange={handleCmsChange}
                      className={`w-full bg-bg-main border ${cmsErrors.github ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-border-main focus:border-accent focus:ring-accent'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all duration-300 placeholder:text-[#444]`}
                      placeholder="https://github.com/..."
                      disabled={isSubmitting}
                    />
                    {cmsErrors.github && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/>{cmsErrors.github}</p>}
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-white/5 border border-white/10 hover:bg-accent hover:text-black hover:border-accent text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-xl px-8 py-4 font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-3 group"
                  >
                    <Plus size={18} />
                    <span>{isSubmitting ? 'Saving...' : 'Publish Project'}</span>
                  </button>
                </form>
              </div>
            </div>
          </AnimatedSection>
        )}

      </div>
      
    </div>
  );
}
