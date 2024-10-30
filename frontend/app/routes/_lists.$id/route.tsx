import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { Divider, Group, Pagination, Paper, Stack, Title } from "@mantine/core";
import { useState } from "react";
import { readingListsService } from "../../services";
import BookCatalogue from "../../components/BookCatalogue/BookCatalogue";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = (
    parseInt(url.searchParams.get("page") ?? "1", 10) - 1
  ).toString();
  const size = url.searchParams.get("size") ?? "8";

  const readingList = await readingListsService.getReadingList(params.id!);
  const books = await readingListsService.getReadingListBooks(params.id!, {
    page,
    size,
  });

  return json({ readingList, books });
}

export default function List() {
  const { readingList, books } = useLoaderData<typeof loader>();
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
          <BookCatalogue books={books.content} />
          <Group justify="center">
            <Pagination
              total={books.totalPages}
              value={page}
              onChange={handlePageChange}
            />
          </Group>
        </Stack>
      </Paper>
    </>
  );
}
