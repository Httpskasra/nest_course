import { Router, Request, Response, NextFunction } from 'express';
import { Task, ErrorWithStatus } from '../types';

let tasks: Task[] = [
  { id: 1, title: 'یادگیری Express', completed: false },
  { id: 2, title: 'ساخت REST API', completed: false },
];

const router = Router();

// GET /api/tasks
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

// GET /api/tasks/:id
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (!task) {
      const err = new Error('وظیفه یافت نشد') as ErrorWithStatus;
      err.statusCode = 404;
      throw err;
    }
    res.json(task);
  } catch (err) {
    next(err);
  }
});

// POST /api/tasks
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title } = req.body;
    if (!title || typeof title !== 'string') {
      const err = new Error('عنوان الزامی است') as ErrorWithStatus;
      err.statusCode = 400;
      throw err;
    }
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
});

// PUT /api/tasks/:id
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (!task) {
      const err = new Error('یافت نشد') as ErrorWithStatus;
      err.statusCode = 404;
      throw err;
    }
    const { title, completed } = req.body;
    if (title !== undefined && typeof title === 'string') task.title = title;
    if (completed !== undefined && typeof completed === 'boolean') task.completed = completed;
    res.json(task);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/tasks/:id
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) {
      const err = new Error('یافت نشد') as ErrorWithStatus;
      err.statusCode = 404;
      throw err;
    }
    tasks.splice(index, 1);
    res.json({ message: 'حذف شد' });
  } catch (err) {
    next(err);
  }
});

export default router;