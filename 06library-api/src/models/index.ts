export interface Book {
  id: number;
  title: string;
  authorId: number;
  genre: string;
  publishedYear: number;
  available: boolean;
}

export interface Author {
  id: number;
  name: string;
  birthYear: number;
}

export const books: Book[] = [
  { id: 1, title: 'قلعه حیوانات', authorId: 1, genre: 'رمان', publishedYear: 1945, available: true },
  { id: 2, title: 'صد سال تنهایی', authorId: 2, genre: 'رمان', publishedYear: 1967, available: false },
  { id: 3, title: 'مزرعه حیوانات', authorId: 1, genre: 'رمان', publishedYear: 1945, available: true },
];

export const authors: Author[] = [
  { id: 1, name: 'جورج اورول', birthYear: 1903 },
  { id: 2, name: 'گابریل گارسیا مارکز', birthYear: 1927 },
  { id: 3, name: 'داستایفسکی', birthYear: 1821 }
];