import { Request, Response, NextFunction } from 'express';
import { ErrorWithStatus } from '../types';

// Middleware 404 برای مسیرهای پیدا نشده
export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({ message: 'مسیر یافت نشد' });
};

// Middleware اصلی خطاها
export const errorHandler = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'خطای سرور',
  });
};