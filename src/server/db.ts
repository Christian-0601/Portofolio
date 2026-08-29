import bcrypt from 'bcryptjs';

// In-memory data store for preview
export const dbData: any = {
  users: [],
  profiles: [],
  hero: [],
  skills: [],
  projects: [],
  certificates: [],
  experiences: [],
  contact_messages: []
};

export async function getDb() {
  // Mock db interface
  return {
    get: async (query: string, params: any[] = []) => {
      const tableMatch = query.match(/FROM\s+(\w+)/i);
      if (!tableMatch) return null;
      const table = tableMatch[1];
      if (query.includes('LIMIT 1')) return dbData[table]?.[0] || null;
      
      // Basic mock for username
      if (query.includes('username = ?')) {
        return dbData[table].find((u: any) => u.username === params[0]) || null;
      }
      return dbData[table]?.[0] || null;
    },
    all: async (query: string, params: any[] = []) => {
      const tableMatch = query.match(/FROM\s+(\w+)/i);
      if (!tableMatch) return [];
      const table = tableMatch[1];
      return dbData[table] || [];
    },
    run: async (query: string, params: any[] = []) => {
      const tableMatch = query.match(/INTO\s+(\w+)/i) || query.match(/UPDATE\s+(\w+)/i);
      if (!tableMatch) return;
      const table = tableMatch[1];
      
      if (query.includes('INSERT')) {
        dbData[table].push(params); // Just mock pushing data
      }
    },
    exec: async (query: string) => {
      // Do nothing for exec
    }
  };
}

export async function initDb() {
  const hash = await bcrypt.hash('password123', 10);
  dbData.users.push({ id: 1, username: 'admin', password: hash });

  dbData.hero.push({
    id: 1,
    greeting: "Hello, I'm",
    name: 'Aloysius Christian Putra',
    headline: 'Building Digital Solutions Through Technology.',
    description: 'Web Developer | Network Enthusiast',
    cta_text: 'View My Projects',
    cta_url: '#projects',
    target_role: 'Future Cloud Architect'
  });

  dbData.profiles.push({
    id: 1,
    name: 'Aloysius Christian Putra',
    title: 'Technology Enthusiast',
    bio: 'I am a vocational high school student majoring in Computer and Network Engineering, currently developing skills in technology with the goal of becoming a Cloud Architect.',
    email: 'tianputra594@gmail.com',
    location: 'Indonesia'
  });
}
