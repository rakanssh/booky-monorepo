import { api } from "./api.server";
import { Book, PaginationParams } from "../types";

export const booksService = {
  getBooks: async (params?: PaginationParams) =>
    api.get<Book[]>("/api/books", params),
  getBook: async (id: string) => api.get<Book>(`/api/books/${id}`),
  addBook: async (isbn: string) => api.post<Book>(`/api/books`, { isbn }),
};
