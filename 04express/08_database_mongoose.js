/**
 * 08_database_mongoose.js
 * هدف: اتصال به MongoDB با استفاده از Mongoose و تعریف مدل Task
 * پیش نیاز: نصب mongodb (محلی یا ابری Atlas) و پکیج mongoose
 * 
 * دستورات: npm install mongoose
 */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ------------------------- اتصال به MongoDB -------------------------
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/taskdb';
mongoose.connect(DB_URI)
  .then(() => console.log('✅ متصل به دیتابیس MongoDB'))
  .catch(err => console.error('❌ خطا در اتصال به دیتابیس:', err));

// ------------------------- تعریف مدل (Schema) -------------------------
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false }
}, { timestamps: true }); // createdAt و updatedAt خودکار اضافه می‌شوند

const Task = mongoose.model('Task', taskSchema);

// ------------------------- مسیرهای API با دیتابیس واقعی -------------------------
// دریافت همه وظایف
app.get('/tasks', async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) { next(err); }
});

// ایجاد وظیفه جدید
app.post('/tasks', async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: 'عنوان الزامی است' });
    const newTask = new Task({ title });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) { next(err); }
});

// ... سایر مسیرها (GET by id, PUT, DELETE) مشابه قبل ولی با متدهای Mongoose

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => console.log(`سرور با دیتابیس روی پورت ${PORT}`));