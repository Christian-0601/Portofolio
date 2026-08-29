# Portfolio Website - Deployment & Admin Guide

## 🎯 Quick Start

### Admin Panel Access
- Navigate to: `http://localhost:3000/admin`
- Default Password: `admin123` ⚠️ **Change this immediately!**

### Running Locally
```bash
npm install
npm run dev
```

---

## 📝 Admin Panel Features

The admin panel allows you to edit:
- ✅ **Home** - Title, Subtitle, Description
- ✅ **About** - Bio and introduction
- ✅ **Contact** - Email, Phone, Social Links
- ✅ **Journey** - Career description
- ⏳ **Skills** - Tech stack (coming soon with full UI)
- ⏳ **Projects** - Portfolio projects (coming soon with full UI)
- ⏳ **Certificates** - Education/Certifications (coming soon with full UI)

All changes are saved to `/public/content.json`

---

## 🔐 Security - IMPORTANT!

1. **Change the admin password** in `src/pages/admin/AdminPanel.tsx`:
   ```typescript
   const ADMIN_PASSWORD = 'admin123'; // ← Change this!
   ```

2. For production, implement proper authentication:
   - Use JWT tokens (already set up in API)
   - Store credentials securely in environment variables
   - Never hardcode passwords

---

## 🚀 Deploy to Vercel

### Step 1: Prepare for Deployment
```bash
# Make sure everything is committed
git add .
git commit -m "Add admin panel"
git push origin main
```

### Step 2: Create Vercel Account
1. Go to **https://vercel.com**
2. Sign up with GitHub
3. Click "New Project"
4. Select your `Portofolio` repository
5. Click "Import"

### Step 3: Configure Build Settings
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 4: Set Environment Variables (Optional)
Add any required `.env` variables in Vercel project settings

### Step 5: Deploy
Click "Deploy" - Vercel will automatically deploy your site!

---

## 📱 Your Live Site
After deployment, your portfolio will be available at:
- `https://[your-project-name].vercel.app`

---

## 🔄 Auto-Deploy on Every Push
Once connected to Vercel, every time you:
```bash
git push origin main
```

Your site automatically redeploys! ✨

---

## 📋 File Structure
```
d:\Program Files\Portfolio\
├── src/
│   ├── pages/
│   │   ├── admin/
│   │   │   └── AdminPanel.tsx          (Admin dashboard)
│   │   └── public/
│   │       ├── Home.tsx
│   │       ├── About.tsx
│   │       └── ... (other pages)
│   └── server/
│       └── api.ts                      (API endpoints)
├── public/
│   └── content.json                    (Editable content)
├── server.ts                           (Express server)
└── package.json
```

---

## 🛠️ Tech Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Backend**: Express, Node.js
- **Database**: SQLite (optional)
- **Hosting**: Vercel
- **Version Control**: GitHub

---

## 🔗 Useful Links
- GitHub: https://github.com/Christian-0601/Portofolio
- Vercel: https://vercel.com
- React Router: https://reactrouter.com/
- Tailwind CSS: https://tailwindcss.com/

---

## ❓ FAQ

**Q: Can I password-protect the admin panel?**
A: Yes! The admin panel already has basic password protection. For production, upgrade to JWT-based authentication.

**Q: How do I add more editable content?**
A: Edit `public/content.json`, add fields to `AdminPanel.tsx`, and create corresponding form inputs.

**Q: Will my content persist after deployment?**
A: Yes, content is saved to the JSON file which is deployed with your app.

**Q: Can I use a database instead of JSON?**
A: Yes, the backend already supports SQLite. Update `AdminPanel.tsx` to use API endpoints instead of JSON file.

---

## 📞 Support
For issues or questions, check your GitHub repository discussions or documentation.

Happy deploying! 🚀
