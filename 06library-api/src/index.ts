import express from 'express';
import cors from 'cors';
import bookRoutes from './routes/bookRoutes';
import authorRoutes from './routes/authorRoutes';
import { notFoundHandler, errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// مسیرها
app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);

// مدیریت خطا
// app.use('/api/books', bookRoutes);
// app.use('/api/authors', authorRoutes);

app.use(notFoundHandler);
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Library API ready at http://localhost:${PORT}`);
});