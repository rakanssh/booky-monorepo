import { Divider, Group, Pagination, Paper, Stack, Title } from "@mantine/core";
import type { LoaderFunctionArgs } from "@remix-run/node";

import { json } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { readingListsService } from "../../services";
import { BookCatalogue } from "../../components";
import { useState } from "react";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const page = (
    parseInt(url.searchParams.get("page") ?? "1", 10) - 1
  ).toString();
  const size = url.searchParams.get("size") ?? "8";
  const readingList = await readingListsService.getReadingList(params.id ?? "");
  const readingListBooks = await readingListsService.getReadingListBooks(
    params.id ?? "",
    {
      page: page ?? "0",
      size: size ?? "10",
    }
  );
  return json({ readingList, readingListBooks });
};

export default function List() {
  const { readingList, readingListBooks } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(
    parseInt(searchParams.get("page") ?? "1", 10)
  );
  const [size] = useState(parseInt(searchParams.get("size") ?? "8", 10));

  const handlePageChange = (value: number) => {
    setPage(value);
    setSearchParams({ page: value.toString(), size: size.toString() });
  };
  return (
    <>
      <Title>{readingList.name}</Title>
      <Divider />
      <Paper>
        <Stack gap="md">
          <BookCatalogue books={readingListBooks.content} />
          <Group justify="center">
            <Pagination
              total={readingListBooks.totalPages}
              value={page}
              onChange={handlePageChange}
            />
          </Group>
        </Stack>
      </Paper>
    </>
  );
}
