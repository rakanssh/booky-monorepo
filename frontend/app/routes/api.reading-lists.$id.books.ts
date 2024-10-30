import { ActionFunctionArgs, json } from "@remix-run/node";
import { readingListsService } from "../services";
import { ErrorResponse } from "../types";

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const bookId = formData.get("bookId") as string;
  const readingListId = params.id;

  try {
    if (request.method === "PATCH") {
      await readingListsService.addBook(readingListId!, bookId);
    } else if (request.method === "DELETE") {
      await readingListsService.removeBook(readingListId!, bookId);
    }
    return json({ success: true });
  } catch (error) {
    return json(
      { success: false, error: (error as ErrorResponse).message },
      { status: 400 }
    );
  }
}
