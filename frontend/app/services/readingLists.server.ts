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
  createReadingList: async (name: string) =>
    api.post<ReadingList>("/api/reading-lists", { name }),
};