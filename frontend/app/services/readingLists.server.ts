import {
  Book,
  PaginatedResponse,
  PaginationParams,
  ReadingList,
} from "../types";
import { api } from "./api.server";

export const readingListsService = {
  getReadingLists: async (params?: PaginationParams) =>
    api.get<PaginatedResponse<ReadingList>>("/api/reading-lists", params),
  getReadingList: async (id: string) =>
    api.get<ReadingList>(`/api/reading-lists/${id}`),
  getReadingListBooks: async (id: string, params?: PaginationParams) =>
    api.get<PaginatedResponse<Book>>(`/api/reading-lists/${id}/books`, params),
  getAvailableBooks: async (
    params?: PaginationParams,
    readingListId?: string
  ) =>
    api.get<PaginatedResponse<Book>>(`/api/books`, {
      ...params,
      readingListId,
    }),
  createReadingList: async (name: string) =>
    api.post<ReadingList>("/api/reading-lists", { name }),
  addBook: async (id: string, bookId: string) =>
    api.patch<ReadingList>(`/api/reading-lists/${id}/books`, { bookId }),
  removeBook: async (id: string, bookId: string) =>
    api.delete<ReadingList>(`/api/reading-lists/${id}/books`, { bookId }),
  deleteReadingList: async (id: string) =>
    api.delete<ReadingList>(`/api/reading-lists/${id}`, {}),
};
