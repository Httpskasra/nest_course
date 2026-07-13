/**
 * 13_testing_supertest.js
 * هدف: نوشتن تست خودکار برای API با استفاده از Jest و Supertest
 * 
 * دستورات:
 * npm install --save-dev jest supertest
 * 
 * سپس در package.json:
 * "scripts": { "test": "jest" }
 * 
 * اجرای تست: npm test
 */

// این فایل را با نام app.js (برای اپلیکیشن اصلی) و test/app.test.js (برای تست) جدا کنید
// در اینجا یک نمونه ساده از تست نوشته می‌شود.

// ---------- فایل app.js (سرور Express) ----------
const express = require('express');
const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.post('/echo', (req, res) => {
  res.json(req.body);
});

module.exports = app; // برای تست صادر می‌شود

// ---------- فایل test/app.test.js ----------
/*
const request = require('supertest');
const app = require('../app');

describe('API Tests', () => {
  test('GET /health باید status OK برگرداند', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('OK');
  });

  test('POST /echo باید همان داده را برگرداند', async () => {
    const testData = { name: 'Ali', age: 20 };
    const response = await request(app)
      .post('/echo')
      .send(testData);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(testData);
  });
});
*/