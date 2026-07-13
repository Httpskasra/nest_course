/**
 * 05_task_api.js
 * هدف: ساخت یک REST API کامل برای مدیریت «وظایف» (Tasks) – با ذخیره در آرایه (حافظه موقت)
 * 
 * عملیات CRUD:
 * - GET /tasks         → دریافت همه وظایف
 * - GET /tasks/:id     → دریافت یک وظیفه
 * - POST /tasks        → ایجاد وظیفه جدید (دریافت title از بدنه)
 * - PUT /tasks/:id     → به‌روزرسانی کامل یک وظیفه
 * - DELETE /tasks/:id  → حذف یک وظیفه
 * 
 * نکات آموزشی:
 * - استفاده از req.params، req.body، res.json، status codes
 * - اعتبارسنجی ساده (وجود title در POST)
 * - مدیریت خطای 404 زمانی که وظیفه یافت نشود
 */

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // برای خواندن JSON بدنه

// داده‌های اولیه در حافظه (آرایه)
let tasks = [
  { id: 1, title: 'یادگیری Express', completed: false },
  { id: 2, title: 'ساخت API', completed: false }
];

// دریافت همه وظایف
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// دریافت یک وظیفه با id
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: 'وظیفه یافت نشد' });
  res.json(task);
});

// ایجاد وظیفه جدید
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: 'عنوان الزامی است' });
  const newTask = {
    id: tasks.length + 1, // ساده (در واقع از uuid یا timestamp استفاده کنید)
    title,
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask); // 201 Created
});

// به‌روزرسانی کامل یک وظیفه (ویرایش title و completed)
app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: 'یافت نشد' });
  const { title, completed } = req.body;
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;
  res.json(task);
});

// حذف یک وظیفه
app.delete('/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'یافت نشد' });
  tasks.splice(index, 1);
  res.json({ message: 'حذف شد' });
});

// middleware 404 برای مسیرهای نامعتبر (اختیاری)
app.use((req, res) => res.status(404).json({ message: 'مسیر نامعتبر' }));
app.use((err, req, res, next) => res.status(500).json({ error: err.message }));

app.listen(PORT, () => console.log(`API آماده: http://localhost:${PORT}/tasks`));