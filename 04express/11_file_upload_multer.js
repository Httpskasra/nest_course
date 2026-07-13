/**
 * 11_file_upload_multer.js
 * هدف: آپلود فایل با استفاده از multer
 * 
 * دستور: npm install multer
 * 
 * نکات:
 * - ایجاد پوشه uploads/ در ریشه پروژه
 * - multer می‌تواند فایل را در دیسک ذخیره کند یا در حافظه (برای آپلود به ابر)
 */

const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// تنظیمات ذخیره‌سازی
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // پوشه مقصد
  },
  filename: (req, file, cb) => {
    // نام یکتا: timestamp + نام اصلی
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// مسیر آپلود (فیلد فرم باید name="avatar" باشد)
app.post('/upload', upload.single('avatar'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'هیچ فایلی آپلود نشد' });
  res.json({
    message: 'فایل آپلود شد',
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size
  });
});

// سرو فایل‌های آپلود شده (اختیاری – احتیاط امنیتی)
app.use('/uploads', express.static('uploads'));

app.listen(3000, () => console.log('سرور آپلود فایل روی پورت 3000'));