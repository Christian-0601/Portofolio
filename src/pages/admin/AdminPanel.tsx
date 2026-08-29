import React, { useState, useEffect } from 'react';
import { Save, LogOut, Edit2 } from 'lucide-react';

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

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [content, setContent] = useState<ContentData | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [saveMessage, setSaveMessage] = useState('');

  const ADMIN_PASSWORD = 'admin123'; // Change this to your preferred password

  useEffect(() => {
    if (isAuthenticated) {
      loadContent();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Invalid password');
      setPassword('');
    }
  };

  const loadContent = async () => {
    try {
      const response = await fetch('/content.json');
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error('Error loading content:', error);
    }
  };

  const saveContent = async () => {
    if (!content) return;

    try {
      const response = await fetch('/api/save-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

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

    const keys = path.split('.');
    const newContent = JSON.parse(JSON.stringify(content));
    let current = newContent;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
    setContent(newContent);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="bg-slate-800 p-8 rounded-lg shadow-xl w-full max-w-md">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-gray-400 mb-6">Enter password to access</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-slate-700 text-white placeholder-gray-500 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <nav className="bg-slate-800 border-b border-slate-700 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => setIsAuthenticated(false)}
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
