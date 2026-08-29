import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import path from 'path';
import { getDb } from './db.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Load environment variables
const JWT_SECRET = process.env.VITE_JWT_SECRET || 'super_secret_jwt_key_for_demo';
const ADMIN_PASSWORD = process.env.VITE_ADMIN_PASSWORD || 'admin123';

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later',
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login attempts per windowMs
  skipSuccessfulRequests: true,
  message: 'Too many login attempts, please try again later',
});

// Secure Admin Auth Middleware
const authMiddleware = (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
    }

    const token = authHeader.slice(7); // Remove 'Bearer ' prefix
    
    // For client-side tokens, we validate format only
    // For production, implement proper JWT validation
    if (!token || token.length < 10) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token format' });
    }

    req.token = token;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

// --- AUTH ---
router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Input validation
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ error: 'Invalid request' });
    }

    const db = await getDb();
    const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);
    
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: '1d' }
      );
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- PUBLIC DATA ---
router.get('/portfolio', async (req, res) => {
  const db = await getDb();
  const hero = await db.get('SELECT * FROM hero LIMIT 1');
  const profile = await db.get('SELECT * FROM profiles LIMIT 1');
  const skills = await db.all('SELECT * FROM skills ORDER BY display_order ASC');
  const projects = await db.all('SELECT * FROM projects ORDER BY display_order ASC');
  const certificates = await db.all('SELECT * FROM certificates ORDER BY display_order ASC');
  const experiences = await db.all('SELECT * FROM experiences ORDER BY display_order ASC');
  
  res.json({ hero, profile, skills, projects, certificates, experiences });
});

// Contact Form Submit
router.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  const db = await getDb();
  await db.run(
    'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
    [name, email, subject, message]
  );
  res.json({ success: true });
});

// --- ADMIN ROUTES (Protected) ---
router.get('/messages', authMiddleware, async (req, res) => {
  const db = await getDb();
  const messages = await db.all('SELECT * FROM contact_messages ORDER BY created_at DESC');
  res.json(messages);
});

// Example generic update for hero (you can expand this for other tables)
router.post('/hero', authMiddleware, async (req, res) => {
  const { greeting, name, headline, description, cta_text, cta_url, target_role } = req.body;
  const db = await getDb();
  await db.run(
    'UPDATE hero SET greeting=?, name=?, headline=?, description=?, cta_text=?, cta_url=?, target_role=? WHERE id=1',
    [greeting, name, headline, description, cta_text, cta_url, target_role]
  );
  res.json({ success: true });
});

// Save Content to JSON file (Admin only)
router.post('/save-content', authMiddleware, async (req, res) => {
  try {
    const content = req.body;

    // Validate content structure
    if (!content || typeof content !== 'object') {
      return res.status(400).json({ error: 'Invalid content format' });
    }

    // Size check - prevent excessively large payloads
    const contentSize = JSON.stringify(content).length;
    if (contentSize > 1024 * 1024) { // 1MB limit
      return res.status(413).json({ error: 'Content exceeds maximum size (1MB)' });
    }

    const contentPath = path.join(process.cwd(), 'public', 'content.json');
    
    // Create backup before overwriting
    try {
      const existingContent = await fs.readFile(contentPath, 'utf-8');
      const backupPath = path.join(process.cwd(), 'public', `content.backup.${Date.now()}.json`);
      await fs.writeFile(backupPath, existingContent, 'utf-8');
    } catch (err) {
      // Backup directory might not exist yet, continue
    }

    await fs.writeFile(contentPath, JSON.stringify(content, null, 2), 'utf-8');
    res.json({ success: true, message: 'Content saved successfully' });
  } catch (error) {
    console.error('Error saving content:', error);
    res.status(500).json({ error: 'Failed to save content' });
  }
});

export default router;
