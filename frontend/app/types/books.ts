import { Author } from "./Authors";

export type Book = {
  id: number;
  title: string;
  authors: Author[];
  pagesNo: number;
  isbn: string;
};

export type AddBookDto = {
  isbn: string;
};

export type ReadingList = {
  id: string;
  books: Book[];
};
