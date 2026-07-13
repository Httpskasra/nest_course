/**
 * 02_routing.js
 * هدف: آشنایی با مسیرهای مختلف، پارامترهای مسیر، پارامترهای Query و متدهای HTTP
 * 
 * مفاهیم:
 * - req.params : برای گرفتن پارامترهای داخل URL (مثل /users/:userId)
 * - req.query : برای گرفتن query string (مثل ?q=ali)
 * - متدهای GET و POST
 */

const express = require('express');
const app = express();
const PORT = 3000;

// صفحه اصلی
app.get('/', (req, res) => {
  res.send('صفحه اصلی');
});

// پارامتر مسیر (route parameter) – هر عددی به جای :userId قرار گیرد در req.params.userId ذخیره می‌شود
app.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  res.send(`پروفایل کاربر ${userId}`);
});

// پارامترهای Query (بعد از ?) – مثال: /search?q=express&page=1
app.get('/search', (req, res) => {
  const term = req.query.q || 'همه'; // اگر q نبود، مقدار پیش‌فرض "همه"
  res.send(`جستجو برای: ${term}`);
});

// درخواست POST – معمولاً برای ایجاد داده جدید (بدون بدنه در این مثال)
app.post('/submit', (req, res) => {
  res.send('داده دریافت شد');
});

app.listen(PORT, () => {
  console.log(`سرور آماده است: http://localhost:${PORT}`);
});