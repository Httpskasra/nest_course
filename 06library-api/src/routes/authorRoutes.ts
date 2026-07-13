import { Router, Request, Response } from "express";
import { authors, books } from "../models";
import type { Author ,Book } from "../models";
console.log('author routes loaded');
type IdParam = { id: string };

const router = Router();

router.get("/", (req, res) => {
  console.log("authors endpoint hit");
  res.json(authors);
});

router.get("/:id/books", (req: Request<IdParam>, res: Response) => {
  const authorId : number = parseInt(req.params.id);
  const author: Author | undefined = authors.find((a) => a.id === authorId);
  if (!author) return res.status(404).json({ message: "نویسنده یافت نشد" });
  const authorBooks : Book[] | undefined = books.filter((b) => b.authorId === authorId);
  res.json({ author, books: authorBooks });
});

export default router;
