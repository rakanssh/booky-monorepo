import { Author } from "./Authors";

export type Book = {
  id: number;
  title: Author;
  authors: Author[];
  pagesNo: number;
};

export type AddBookDto = {
  isbn: string;
};

export type ReadingList = {
  id: string;
  books: Book[];
};
