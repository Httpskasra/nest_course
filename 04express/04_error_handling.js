/**
 * 04_error_handling.js
 * هدف: مدیریت خطاها در Express – خطاهای 404 (پیدا نشدن مسیر) و خطاهای سرور (500)
 * 
 * مفاهیم:
 * - next(err) : ارسال خطا به middleware مخصوص خطا
 * - middleware 404 : زمانی که هیچ مسیری با درخواست مطابقت نداشته باشد
 * - middleware خطا با چهار پارامتر (err, req, res, next) – Express آن را تشخیص می‌دهد
 * - تنظیم statusCode و ارسال پاسخ JSON خطا
 */

const express = require('express');
const app = express();
const PORT = 3000;

// مسیری که عمداً خطا ایجاد می‌کند
app.get('/error', (req, res, next) => {
  const err = new Error('یک خطای برنامه‌نویسی');
  err.statusCode = 500; // کد وضعیت دلخواه
  next(err); // ارسال خطا به middleware بعدی که مخصوص خطا است
});

// مسیر عادی
app.get('/', (req, res) => {
  res.send('همه چیز خوب است');
});

// ------------------------- میدل‌ور 404 (مسیر پیدا نشد) -------------------------
// این middleware فقط زمانی اجرا می‌شود که هیچ مسیر قبلی درخواست را پاسخ نداده باشد
app.use((req, res, next) => {
  res.status(404).json({ message: 'مسیر یافت نشد' });
});

// ------------------------- میدل‌ور مرکزی مدیریت خطا (4 پارامتر) -------------------------
// اولین پارامتر err است – Express به طور خودکار توابع با ۴ پارامتر را به عنوان خطاگیر می‌شناسد
app.use((err, req, res, next) => {
  console.error('خطا:', err.message);
  // اگر err.statusCode وجود نداشت، از 500 استفاده کن
  const status = err.statusCode || 500;
  res.status(status).json({
    error: err.message || 'خطای داخلی سرور'
  });
});

app.listen(PORT, () => {
  console.log(`سرور http://localhost:${PORT}`);
});