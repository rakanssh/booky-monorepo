import { Divider, Paper, Stack, Title } from "@mantine/core";
import AddListSection from "./components/AddListSection";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { ErrorResponse } from "../../types";
import { readingListsService } from "../../services";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  try {
    await readingListsService.createReadingList(name);
    return json({ success: true });
  } catch (error) {
    return json(
      { success: false, error: (error as ErrorResponse).message },
      { status: (error as ErrorResponse).status }
    );
  }
}

export default function Lists() {
  return (
    <>
      <Title>Lists</Title>
      <Divider />
      <Paper>
        <Stack gap="md">
          <AddListSection />
        </Stack>
      </Paper>
    </>
  );
}
