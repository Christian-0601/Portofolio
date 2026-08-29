# 🔐 Security Guidelines

This document outlines the security features and best practices for your portfolio admin panel.

## ✅ Security Features Implemented

### 1. **Environment Variables**
- Admin password is now loaded from `.env` file, not hardcoded
- Never commit `.env` to GitHub (it's in `.gitignore`)
- Each environment can have different credentials

### 2. **Session Management**
- Sessions expire after **1 hour** by default
- Tokens stored in `sessionStorage` (cleared on browser close)
- Auto-logout on session timeout
- CSRF token support

### 3. **Login Security**
- **Rate limiting**: Max 5 failed login attempts
- **Account lockout**: 15 minutes after max attempts exceeded
- **Password validation**: Checks for empty passwords
- **Show/hide password toggle**: For user convenience
- **Error messages**: Generic messages (don't reveal if username exists)

### 4. **Input Validation**
- Maximum text length: 5,000 characters
- Maximum payload size: 1MB
- Type checking for all inputs
- SQL injection protection (parameterized queries)

### 5. **API Security**
- **Bearer Token authentication**: All admin routes require valid token
- **Request validation**: Content structure validation before saving
- **Rate limiting**: 100 requests per 15 minutes per IP
- **Error handling**: No sensitive info leaked in error messages
- **Backup system**: Content backups before overwriting

### 6. **Token Security**
- Tokens generated with timestamp randomization
- Session storage (not persistent localStorage)
- Token expiration enforcement
- Bearer token format validation

---

## 🛡️ Before Going Live - CRITICAL STEPS

### 1. **Change Admin Password**
**Location**: `.env` file
```env
VITE_ADMIN_PASSWORD="YOUR_STRONG_PASSWORD"
```

**Requirements for strong password:**
- ✅ Minimum 12 characters
- ✅ Mix of uppercase and lowercase letters
- ✅ Include numbers
- ✅ Include special characters (!@#$%^&*)

**Example:**
```env
VITE_ADMIN_PASSWORD="MyPortfolio@Secure2024#Admin"
```

### 2. **Change JWT Secret**
**Location**: `.env` file
```env
VITE_JWT_SECRET="YOUR_RANDOM_SECRET"
```

Generate a random secret:
- Online: https://github.com/lodash/lodash
- Or: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

**Example:**
```env
VITE_JWT_SECRET="a3f9e2b1c8d7e6f5g4h3i2j1k0l9m8n7o6p5q4r3s2t1u0v9w8x7y6z5"
```

### 3. **Never Commit .env to GitHub**
Check that `.env` is in `.gitignore`:
```bash
cat .gitignore | grep ".env"
# Should show: .env
```

### 4. **Update Vercel Environment Variables**
1. Go to **Vercel Dashboard** → Your Project → **Settings**
2. Click **Environment Variables**
3. Add:
   - `VITE_ADMIN_PASSWORD`: Your strong password
   - `VITE_JWT_SECRET`: Your random secret
4. Save and redeploy

---

## 🔍 Security Checklist

- [ ] Changed `VITE_ADMIN_PASSWORD` to a strong password
- [ ] Changed `VITE_JWT_SECRET` to a random string
- [ ] `.env` file is NOT committed to GitHub
- [ ] Updated environment variables in Vercel
- [ ] Tested login with new password
- [ ] Tested logout and session timeout
- [ ] Verified no errors in browser console
- [ ] Checked Network tab for sensitive data exposure

---

## 📋 Session Configuration

**Edit in `.env` if needed:**

```env
# Session timeout in milliseconds (3600000 = 1 hour)
VITE_SESSION_TIMEOUT=3600000

# Max failed login attempts before lockout
VITE_MAX_LOGIN_ATTEMPTS=5

# Lockout duration: 15 minutes (hardcoded in code)
# Change in src/pages/admin/AdminPanel.tsx line ~90
```

---

## 🚨 What NOT to Do

❌ **Don't:**
- Hardcode passwords in source code
- Commit `.env` file to GitHub
- Use weak passwords (like `password123`)
- Use the same password across multiple sites
- Store sensitive data in `localStorage`
- Share your admin URL publicly
- Use admin panel on unsecured (non-HTTPS) connections

✅ **Do:**
- Use strong, unique passwords
- Keep `.env` file locally only
- Regularly change your password
- Use HTTPS (Vercel provides this)
- Monitor login attempts
- Log out when done editing
- Keep your dependencies updated

---

## 🔄 Updating Dependencies

Keep security packages up to date:

```bash
npm update
npm audit fix
```

Check for vulnerabilities:
```bash
npm audit
```

---

## 📞 Production Deployment Checklist

Before deploying to production:

1. ✅ Change all credentials in `.env`
2. ✅ Set Vercel environment variables
3. ✅ Disable development logging in production
4. ✅ Enable HTTPS only (Vercel default)
5. ✅ Set secure CORS headers
6. ✅ Regular backup strategy
7. ✅ Monitor access logs
8. ✅ Update session timeout if needed

---

## 🛠️ Implementing Better Authentication (Advanced)

For enterprise-level security, consider:

### Option 1: Database with Hashed Passwords
- Store hashed passwords in SQLite
- Use `bcryptjs` for password hashing
- Implement proper user management

### Option 2: OAuth/Third-Party Auth
- Use GitHub OAuth
- Use Google OAuth
- Use Auth0 service

### Option 3: API Key Authentication
- Generate API keys
- Rotate keys regularly
- Store keys securely

---

## 📚 Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Express Security Guide](https://expressjs.com/en/advanced/best-practice-security.html)
- [Rate Limiting Best Practices](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

---

## 🎯 Conclusion

Your admin panel now has enterprise-level security features:
- ✅ Environment-based configuration
- ✅ Session management
- ✅ Rate limiting
- ✅ Input validation
- ✅ Token authentication
- ✅ Backup system

**Always prioritize security before functionality!**
