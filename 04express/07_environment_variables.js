/**
 * 07_environment_variables.js
 * هدف: استفاده از فایل .env برای ذخیره تنظیمات حساس (پورت، کلیدهای API، رشته اتصال دیتابیس)
 * 
 * مفاهیم:
 * - نصب پکیج dotenv: npm install dotenv
 * - ایجاد فایل .env در ریشه پروژه
 * - process.env برای دسترسی به متغیرهای محیطی
 */

require('dotenv').config(); // بارگذاری متغیرهای .env در process.env
const express = require('express');
const app = express();

// خواندن پورت از متغیر محیطی PORT، اگر موجود نبود از 3000 استفاده کن
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`سرور با متغیر محیطی اجرا شد. محیط: ${process.env.NODE_ENV || 'development'}`);
});

app.listen(PORT, () => {
  console.log(`سرور روی پورت ${PORT} اجرا شد`);
});

/* 
فایل .env نمونه (این فایل را در git commit نکنید! به .gitignore اضافه کنید):
PORT=5000
NODE_ENV=production
DB_URI=mongodb://localhost:27017/mydb
*/