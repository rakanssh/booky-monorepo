import { Author } from "./";

export type Book = {
  id: number;
  title: string;
  authors: Author[];
  pagesNo: number;
  isbn: string;
  inReadingList: boolean;
};

export type AddBookDto = {
  isbn: string;
};
