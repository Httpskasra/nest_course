/**
 * 09_validation.js
 * هدف: اعتبارسنجی داده‌های ورودی با استفاده از express-validator
 * 
 * دستور: npm install express-validator
 * 
 * مزایا:
 * - بررسی وجود فیلدها، نوع داده، طول، فرمت ایمیل و ...
 * - جلوگیری از ورود داده‌های نادرست به دیتابیس
 */

require('dotenv').config();
const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();
app.use(express.json());

// مسیر ثبت‌نام با اعتبارسنجی
app.post('/register',
  // قوانین اعتبارسنجی
  body('email').isEmail().withMessage('ایمیل معتبر نیست'),
  body('password').isLength({ min: 6 }).withMessage('رمز عبور حداقل ۶ کاراکتر'),
  body('age').optional().isInt({ min: 1, max: 120 }).withMessage('سن باید عدد بین ۱ تا ۱۲۰ باشد'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // اگر اعتبارسنجی قبول شد
    res.json({ message: 'ثبت‌نام موفق', data: req.body });
  }
);

app.listen(3000, () => console.log('سرور اعتبارسنجی روشن است'));