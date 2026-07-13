/**
 * 10_authentication_jwt.js
 * هدف: پیاده‌سازی احراز هویت با JWT (JSON Web Token)
 * 
 * دستورات: npm install jsonwebtoken bcrypt
 * 
 * سناریو:
 * - کاربر با ایمیل و رمز عبور ثبت‌نام می‌کند (رمز هش می‌شود)
 * - کاربر با دریافت token می‌تواند به مسیرهای محافظت شده دسترسی داشته باشد
 */

require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'my_secret_key';
// در حقیقت کاربران در دیتابیس ذخیره می‌شوند – اینجا برای سادگی از آرایه استفاده می‌کنیم
let users = []; // { email, passwordHash }

// ثبت‌نام
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'ایمیل و رمز الزامی است' });
  const existing = users.find(u => u.email === email);
  if (existing) return res.status(409).json({ message: 'کاربر وجود دارد' });
  const hashed = await bcrypt.hash(password, 10);
  users.push({ email, passwordHash: hashed });
  res.status(201).json({ message: 'ثبت‌نام موفق' });
});

// ورود (دریافت token)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ message: 'اعتبار نامعتبر' });
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: 'اعتبار نامعتبر' });
  // ساخت token
  const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// میدل‌ور برای بررسی token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  if (!token) return res.status(401).json({ message: 'توکن الزامی است' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'توکن نامعتبر' });
    req.user = user;
    next();
  });
}

// مسیر محافظت شده – فقط کاربران احراز هویت شده می‌توانند ببینند
app.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: `خوش آمدید ${req.user.email}`, user: req.user });
});

app.listen(3000, () => console.log('سرور احراز هویت روشن است'));