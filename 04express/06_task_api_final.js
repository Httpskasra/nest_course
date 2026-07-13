/**
 * 06_task_api_final.js
 * هدف: بهبود API قبلی با استفاده از:
 * - express.Router() برای ماژولار کردن مسیرها
 * - مدیریت خطای یکسان با try/catch و next(err)
 * - استفاده از Date.now() به جای id ساده
 * - افزودن CORS (مهم برای فراخوانی از مرورگر با front جدا)
 * 
 * این فایل نشان می‌دهد که چگونه یک پروژه واقعی ساختاردهی می‌شود.
 */

const express = require('express');
const cors = require('cors'); // باید نصب شود: npm install cors
const app = express();
const PORT = 3000;

app.use(cors());            // اجازه درخواست از هر دامنه (برای توسعه)
app.use(express.json());

// ---------- داده‌ها ----------
let tasks = [
  { id: 1, title: 'یادگیری Express', completed: false },
  { id: 2, title: 'ساخت REST API', completed: false }
];

// ---------- استفاده از Router ----------
const router = express.Router();

// همه مسیرهای مربوط به tasks در این router تعریف می‌شوند و بعد با app.use('/api/tasks', router) متصل می‌شوند
router.get('/', async (req, res, next) => {
  try {
    res.json(tasks);
  } catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) throw { statusCode: 404, message: 'وظیفه یافت نشد' };
    res.json(task);
  } catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) throw { statusCode: 400, message: 'عنوان الزامی است' };
    const newTask = {
      id: Date.now(), // استفاده از timestamp برای id یکتا
      title,
      completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) throw { statusCode: 404, message: 'یافت نشد' };
    const { title, completed } = req.body;
    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;
    res.json(task);
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) throw { statusCode: 404, message: 'یافت نشد' };
    tasks.splice(index, 1);
    res.json({ message: 'حذف شد' });
  } catch (err) { next(err); }
});

// اتصال router به مسیر پایه /api/tasks
app.use('/api/tasks', router);

// ---------- مدیریت خطا ----------
app.use((req, res) => {
  res.status(404).json({ message: 'مسیر یافت نشد' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || 'خطای سرور'
  });
});

app.listen(PORT, () => {
  console.log(`API نهایی روی http://localhost:${PORT}/api/tasks`);
});