import { ActionFunctionArgs, json } from "@remix-run/node";
import { readingListsService } from "../services";
import { ErrorResponse } from "../types";

export async function action({ request, params }: ActionFunctionArgs) {
  const id = params.id;

  try {
    await readingListsService.deleteReadingList(id);
    return json({ success: true });
  } catch (error) {
    return json(
      { success: false, error: (error as ErrorResponse).message },
      { status: 400 }
    );
  }
}
