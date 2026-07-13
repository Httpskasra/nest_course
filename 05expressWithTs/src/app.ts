import express from 'express';
import cors from 'cors';
import tasksRouter from './routes/tasks';
import { notFoundHandler, errorHandler } from './middleware/errorHandler';

const app = express();

// Middlewareهای عمومی
app.use(cors());
app.use(express.json());

// مسیرهای API
app.use('/api/tasks', tasksRouter);

// مدیریت خطا (باید بعد از همه مسیرها باشد)
app.use(notFoundHandler);
app.use(errorHandler);

export default app;