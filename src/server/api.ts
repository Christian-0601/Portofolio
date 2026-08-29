import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDb } from './db.js';

const router = express.Router();
const JWT_SECRET = 'super_secret_jwt_key_for_demo';

// Middleware for Admin Auth
const authMiddleware = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// --- AUTH ---
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const db = await getDb();
  const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
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

export default router;
