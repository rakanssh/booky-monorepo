import { ReadingList } from "../types";
import { api } from "./api.server";

export const readingListsService = {
  createReadingList: async (name: string) =>
    api.post<ReadingList>("/api/reading-lists", { name }),
};
