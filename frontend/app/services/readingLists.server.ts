import { api } from "./api.server";

export const readingListsService = {
  createReadingList: async (name: string) =>
    api.post("/api/reading-lists", { name }),
};
