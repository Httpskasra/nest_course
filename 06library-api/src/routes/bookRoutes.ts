import { Router, Request, Response } from 'express';
import { books, Book } from '../models';

// تایپ برای پارامترهای روت
type IdParam = { id: string };

// تایپ بدنه POST
interface CreateBookBody {
  title: string;
  authorId: number;
  genre?: string;
  publishedYear: number;
}

// تایپ بدنه PUT (همه فیلدها اختیاری می‌شوند)
type UpdateBookBody = Partial<Omit<Book, 'id'>>;

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json(books);
});

router.get('/:id', (req: Request<IdParam>, res: Response) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ message: 'کتاب یافت نشد' });
  res.json(book);
});

router.post('/', (req: Request<{}, {}, CreateBookBody>, res: Response) => {
  const { title, authorId, genre, publishedYear } = req.body;
  if (!title || !authorId || !publishedYear) {
    return res.status(400).json({ message: 'عنوان، نویسنده و سال انتشار الزامی است' });
  }
  const newBook: Book = {
    id: Math.max(...books.map(b => b.id), 0) + 1,
    title,
    authorId,
    genre: genre || 'متفرقه',
    publishedYear,
    available: true
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

router.put('/:id', (req: Request<IdParam, {}, UpdateBookBody>, res: Response) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ message: 'کتاب یافت نشد' });
  // به‌روزرسانی فقط فیلدهای موجود در بدنه
  Object.assign(book, req.body);
  res.json(book);
});

router.delete('/:id', (req: Request<IdParam>, res: Response) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);
  if (index === -1) return res.status(404).json({ message: 'کتاب یافت نشد' });
  books.splice(index, 1);
  res.json({ message: 'کتاب حذف شد' });
});

export default router;