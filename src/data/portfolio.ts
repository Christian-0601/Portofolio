export type PortfolioSectionContent = {
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
    credentialUrl?: string;
    credentialId?: string;
    description?: string;
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
};

export const defaultPortfolioContent: PortfolioSectionContent = {
  home: {
    title: "Christian's Portfolio",
    subtitle: "Full-Stack Developer | Creative Problem Solver",
    description: "Building beautiful and functional web experiences",
  },
  about: {
    title: "About Me",
    bio: "I'm a passionate full-stack developer with experience in React, TypeScript, and modern web technologies. I love creating user-friendly applications and solving complex problems.",
  },
  skills: [
    { name: "React", color: "#61DAFB" },
    { name: "TypeScript", color: "#3178C6" },
    { name: "Node.js", color: "#339933" },
    { name: "Next.js", color: "#FFFFFF" },
    { name: "Tailwind CSS", color: "#06B6D4" },
  ],
  projects: [
    {
      id: 1,
      title: "Project 1",
      description: "A modern web application",
      technologies: ["React", "TypeScript", "Tailwind"],
      link: "https://example.com",
    },
    {
      id: 2,
      title: "Project 2",
      description: "Another amazing project",
      technologies: ["Node.js", "Express", "MongoDB"],
      link: "https://example.com",
    },
  ],
  certificates: [
    {
      id: 1,
      name: "React Fundamentals",
      issuer: "Udemy",
      date: "2024",
    },
    {
      id: 2,
      name: "TypeScript Mastery",
      issuer: "Coursera",
      date: "2024",
    },
  ],
  journey: {
    title: "My Journey",
    description: "Started coding in 2020, passionate about web development and continuous learning.",
  },
  contact: {
    email: "your-email@example.com",
    phone: "+1 (555) 123-4567",
    location: "Your City, Country",
    github: "https://github.com/Christian-0601",
    linkedin: "https://linkedin.com/in/yourprofile",
  },
};

export async function loadPortfolioContent(): Promise<PortfolioSectionContent> {
  const response = await fetch('/content.json');

  if (!response.ok) {
    throw new Error('Failed to load portfolio content');
  }

  const data = await response.json();

  return {
    ...defaultPortfolioContent,
    ...data,
    home: { ...defaultPortfolioContent.home, ...(data.home || {}) },
    about: { ...defaultPortfolioContent.about, ...(data.about || {}) },
    journey: { ...defaultPortfolioContent.journey, ...(data.journey || {}) },
    contact: { ...defaultPortfolioContent.contact, ...(data.contact || {}) },
    skills: Array.isArray(data.skills) && data.skills.length > 0 ? data.skills : defaultPortfolioContent.skills,
    projects: Array.isArray(data.projects) && data.projects.length > 0 ? data.projects : defaultPortfolioContent.projects,
    certificates: Array.isArray(data.certificates) && data.certificates.length > 0 ? data.certificates : defaultPortfolioContent.certificates,
  };
}
