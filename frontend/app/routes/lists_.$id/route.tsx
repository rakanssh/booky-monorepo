import { Divider, Paper, Stack, Title } from "@mantine/core";
import type { LoaderFunctionArgs } from "@remix-run/node";

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { readingListsService } from "../../services";
import { BookCatalogue } from "../../components";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const readingList = await readingListsService.getReadingList(params.id ?? "");
  const readingListBooks = await readingListsService.getReadingListBooks(
    params.id ?? "",
    {
      page: "0",
      size: "10",
    }
  );
  return json({ readingList, readingListBooks });
};

export default function List() {
  const { readingList, readingListBooks } = useLoaderData<typeof loader>();
  return (
    <>
      <Title>{readingList.name}</Title>
      <Divider />
      <Paper>
        <Stack gap="md">
          <BookCatalogue books={readingListBooks.content} />
        </Stack>
      </Paper>
    </>
  );
}
