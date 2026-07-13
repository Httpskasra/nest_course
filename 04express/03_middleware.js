/**
 * 03_middleware.js
 * هدف: درک مفهوم middleware (میان‌افزار) – توابعی که درخواست را قبل از رسیدن به مسیر نهایی پردازش می‌کنند
 * 
 * انواع middleware در این فایل:
 * 1. middleware عمومی (app.use) – برای تمام مسیرها
 * 2. middleware داخلی express.json() – برای خواندن JSON بدنه
 * 3. middleware فقط برای یک مسیر خاص (/user/:id)
 * 4. middleware برای فایل‌های ایستا (express.static)
 */

const express = require('express');
const app = express();
const PORT = 3000;

// ------------------------- 1. میدل‌ور عمومی (Logging) -------------------------
// این تابع برای هر درخواستی اجرا می‌شود (صرف نظر از مسیر و متد)
app.use((req, res, next) => {
  // req.method : GET, POST, ...   req.url : مسیر درخواستی
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // VERY IMPORTANT: بدون next()، درخواست متوقف می‌شود و به مسیر بعدی نمی‌رود
});

// ------------------------- 2. میدل‌ور برای دریافت JSON -------------------------
// express.json() بدنه درخواست را می‌خواند و به req.body تبدیل می‌کند (فقط JSON)
app.use(express.json());

// ------------------------- 3. میدل‌ور فقط برای مسیر /user/:id -------------------------
app.use('/user/:id', (req, res, next) => {
  console.log(`درخواست برای کاربر: ${req.params.id}`);
  next(); // اجازه می‌دهد به مسیر اصلی برود
});

// مسیر GET که بعد از میدل‌ور بالا اجرا می‌شود
app.get('/user/:id', (req, res) => {
  res.send(`کاربر ${req.params.id}`);
});

// مسیر POST برای دریافت JSON (محتوا باید در بدنه با header Content-Type: application/json ارسال شود)
app.post('/data', (req, res) => {
  console.log('بدنه درخواست:', req.body);
  res.json({ received: true, data: req.body });
});

// ------------------------- 4. سرو فایل‌های ایستا -------------------------
// اگر پوشه 'public' وجود داشته باشد، فایل‌های داخل آن مستقیماً در دسترس هستند
// مثلاً فایل public/style.css از طریق /style.css قابل دسترسی است
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`سرور: http://localhost:${PORT}`);
});