/// <reference types="vite/client" />

import React, { useState, useEffect } from 'react';
import { Save, LogOut, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface ContentData {
  home: {
    title: string;
    subtitle: string;
    description: string;
  };
  about: {
    title: string;
    bio: string;
  };
  skills: Array<{ name: string; color: string }>;
  projects: Array<{
    id: number;
    title: string;
    description: string;
    technologies: string[];
    link: string;
  }>;
  certificates: Array<{
    id: number;
    name: string;
    issuer: string;
    date: string;
  }>;
  journey: {
    title: string;
    description: string;
  };
  contact: {
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
  };
}

const ADMIN_PASSWORD = (import.meta.env.VITE_ADMIN_PASSWORD as string) || 'admin123';
const SESSION_TIMEOUT = parseInt((import.meta.env.VITE_SESSION_TIMEOUT as string) || '3600000');
const MAX_LOGIN_ATTEMPTS = parseInt((import.meta.env.VITE_MAX_LOGIN_ATTEMPTS as string) || '5');

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [content, setContent] = useState<ContentData | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [saveMessage, setSaveMessage] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [sessionTimer, setSessionTimer] = useState<NodeJS.Timeout | null>(null);

  // Check for existing token on mount
  useEffect(() => {
    const savedToken = sessionStorage.getItem('admin_token');
    const tokenTimestamp = sessionStorage.getItem('admin_token_time');
    
    if (savedToken && tokenTimestamp) {
      const elapsed = Date.now() - parseInt(tokenTimestamp);
      if (elapsed < SESSION_TIMEOUT) {
        setToken(savedToken);
        setIsAuthenticated(true);
        loadContent();
        setupSessionTimer();
      } else {
        // Token expired
        sessionStorage.removeItem('admin_token');
        sessionStorage.removeItem('admin_token_time');
      }
    }
  }, []);

  // Setup auto-logout timer
  const setupSessionTimer = () => {
    if (sessionTimer) clearTimeout(sessionTimer);
    const timer = setTimeout(() => {
      handleLogout();
    }, SESSION_TIMEOUT);
    setSessionTimer(timer);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLocked) {
      setError(`Too many failed attempts. Please try again later.`);
      return;
    }

    if (!password.trim()) {
      setError('Password cannot be empty');
      return;
    }

    try {
      // Simulate API authentication (for production, use real API)
      if (password === ADMIN_PASSWORD) {
        const newToken = generateToken();
        setToken(newToken);
        setIsAuthenticated(true);
        setPassword('');
        setLoginAttempts(0);
        setError('');
        
        // Save token to session storage (not localStorage for security)
        sessionStorage.setItem('admin_token', newToken);
        sessionStorage.setItem('admin_token_time', Date.now().toString());
        
        loadContent();
        setupSessionTimer();
      } else {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        setError('Invalid password');
        
        if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
          setIsLocked(true);
          setError(`Account locked after ${MAX_LOGIN_ATTEMPTS} failed attempts.`);
          setTimeout(() => {
            setIsLocked(false);
            setLoginAttempts(0);
          }, 900000); // 15 minutes
        }
        setPassword('');
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
      console.error('Login error:', err);
    }
  };

  // Generate secure token
  const generateToken = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const loadContent = async () => {
    try {
      const response = await fetch('/content.json');
      if (!response.ok) throw new Error('Failed to load content');
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error('Error loading content:', error);
      setError('Failed to load content');
    }
  };

  const saveContent = async () => {
    if (!content || !token) return;

    try {
      const response = await fetch('/api/save-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(content),
      });

      if (response.status === 401) {
        handleLogout();
        setError('Session expired. Please login again.');
        return;
      }

      if (response.ok) {
        setSaveMessage('✅ Content saved successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
      } else {
        setSaveMessage('❌ Error saving content');
      }
    } catch (error) {
      setSaveMessage('❌ Error saving content');
      console.error('Error:', error);
    }
  };

  const handleContentChange = (path: string, value: any) => {
    if (!content) return;

    // Input validation - limit string length
    if (typeof value === 'string' && value.length > 5000) {
      setError('Text exceeds maximum length (5000 characters)');
      return;
    }

    const keys = path.split('.');
    const newContent = JSON.parse(JSON.stringify(content));
    let current = newContent;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
    setContent(newContent);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setToken('');
    setPassword('');
    setContent(null);
    setError('');
    sessionStorage.removeItem('admin_token');
    sessionStorage.removeItem('admin_token_time');
    if (sessionTimer) clearTimeout(sessionTimer);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="bg-slate-800 p-8 rounded-lg shadow-2xl w-full max-w-md border border-slate-700">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-gray-400 mb-6">Secure Access Required</p>
          
          {error && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded flex items-center gap-2 text-red-300">
              <AlertCircle size={18} />
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLocked}
                className="w-full px-4 py-2 rounded bg-slate-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            {loginAttempts > 0 && loginAttempts < MAX_LOGIN_ATTEMPTS && (
              <p className="text-sm text-yellow-400">
                {MAX_LOGIN_ATTEMPTS - loginAttempts} attempts remaining
              </p>
            )}
            
            <button
              type="submit"
              disabled={isLocked}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLocked ? 'Account Locked' : 'Login'}
            </button>
          </form>
          
          <p className="text-xs text-gray-500 mt-4 text-center">
            Session timeout: {SESSION_TIMEOUT / 60000} minutes
          </p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <nav className="bg-slate-800 border-b border-slate-700 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-48 bg-slate-800 p-4 border-r border-slate-700">
          {['home', 'about', 'skills', 'projects', 'certificates', 'journey', 'contact'].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-2 rounded mb-2 transition capitalize ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-slate-700'
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold capitalize">{activeTab}</h2>
            <button
              onClick={saveContent}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition"
            >
              <Save size={18} />
              Save All Changes
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded flex items-center gap-2 text-red-300">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {saveMessage && (
            <div className="mb-4 p-3 bg-slate-700 rounded text-center text-lg">
              {saveMessage}
            </div>
          )}

          {/* Home Section */}
          {activeTab === 'home' && (
            <div className="space-y-4 max-w-2xl">
              <div>
                <label className="block text-sm font-bold mb-2">Title</label>
                <input
                  type="text"
                  value={content.home.title}
                  onChange={(e) => handleContentChange('home.title', e.target.value)}
                  className="w-full px-4 py-2 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Subtitle</label>
                <input
                  type="text"
                  value={content.home.subtitle}
                  onChange={(e) => handleContentChange('home.subtitle', e.target.value)}
                  className="w-full px-4 py-2 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Description</label>
                <textarea
                  value={content.home.description}
                  onChange={(e) => handleContentChange('home.description', e.target.value)}
                  className="w-full px-4 py-2 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                />
              </div>
            </div>
          )}

          {/* About Section */}
          {activeTab === 'about' && (
            <div className="space-y-4 max-w-2xl">
              <div>
                <label className="block text-sm font-bold mb-2">Title</label>
                <input
                  type="text"
                  value={content.about.title}
                  onChange={(e) => handleContentChange('about.title', e.target.value)}
                  className="w-full px-4 py-2 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Bio</label>
                <textarea
                  value={content.about.bio}
                  onChange={(e) => handleContentChange('about.bio', e.target.value)}
                  className="w-full px-4 py-2 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                />
              </div>
            </div>
          )}

          {/* Contact Section */}
          {activeTab === 'contact' && (
            <div className="space-y-4 max-w-2xl">
              {Object.entries(content.contact).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-bold mb-2 capitalize">{key}</label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleContentChange(`contact.${key}`, e.target.value)}
                    className="w-full px-4 py-2 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Journey Section */}
          {activeTab === 'journey' && (
            <div className="space-y-4 max-w-2xl">
              <div>
                <label className="block text-sm font-bold mb-2">Title</label>
                <input
                  type="text"
                  value={content.journey.title}
                  onChange={(e) => handleContentChange('journey.title', e.target.value)}
                  className="w-full px-4 py-2 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Description</label>
                <textarea
                  value={content.journey.description}
                  onChange={(e) => handleContentChange('journey.description', e.target.value)}
                  className="w-full px-4 py-2 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                />
              </div>
            </div>
          )}

          {activeTab !== 'home' &&
            activeTab !== 'about' &&
            activeTab !== 'contact' &&
            activeTab !== 'journey' && (
              <div className="text-gray-400 text-center py-12">
                Edit {activeTab} section - Coming soon with full management interface
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
