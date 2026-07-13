/**
 * 01_hello.js
 * هدف: اولین سرور Express.js - آشنایی با نصب، مسیر پایه و listen
 * 
 * مفاهیم:
 * - require برای ایمپورت express
 * - ایجاد اپلیکیشن با express()
 * - تعریف یک مسیر GET با app.get()
 * - راه‌اندازی سرور با app.listen()
 */

const express = require('express'); // ایمپورت فریمورک
const app = express();              // ساخت نمونه اپلیکیشن
const PORT = 3000;                 // پورت دلخواه

// مسیر ریشه (/) : وقتی کاربر به http://localhost:3000/ برود
app.get('/', (req, res) => {
  // req => شیء درخواست (حاوی اطلاعات کلاینت)
  // res => شیء پاسخ (برای ارسال پاسخ به کلاینت)
  res.send('سلام به Express.js!'); // ارسال متن ساده
});

// گوش دادن به پورت – سرور شروع به کار می‌کند
app.listen(PORT, () => {
  console.log(`سرور روی http://localhost:${PORT} اجرا شد`);
});