import { PaginatedResponse, PaginationParams, ReadingList } from "../types";
import { api } from "./api.server";

export const readingListsService = {
  getReadingLists: async (params?: PaginationParams) =>
    api.get<PaginatedResponse<ReadingList>>("/api/reading-lists", params),
  createReadingList: async (name: string) =>
    api.post<ReadingList>("/api/reading-lists", { name }),
};
