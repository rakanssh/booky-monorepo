export type Book = {
  id: string;
  title: string;
  author: string;
  pagesNo: number;
  coverUrl: string;
};

export type AddBookDto = {
  isbn: string;
};

export type ReadingList = {
  id: string;
  books: Book[];
};
