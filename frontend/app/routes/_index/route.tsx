import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { Divider, Group, Pagination, Paper, Stack, Title } from "@mantine/core";
import { useState } from "react";
import { BookCatalogue } from "../../components";
import AddBookSection from "./components/AddBookSection";
import { ErrorResponse } from "../../types";
import { booksService } from "../../services";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = (
    parseInt(url.searchParams.get("page") ?? "1", 10) - 1
  ).toString();
  const size = url.searchParams.get("size") ?? "8";
  const books = await booksService.getBooks({
    page: page ?? "1",
    size: size ?? "8",
  });
  return json(books);
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const isbn = formData.get("isbn") as string;
  try {
    await booksService.addBook(isbn);
    return json({ success: true });
  } catch (error) {
    return json(
      { success: false, error: (error as ErrorResponse).message },
      { status: (error as ErrorResponse).status }
    );
  }
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(
    parseInt(searchParams.get("page") ?? "1", 10)
  );
  const [size] = useState(parseInt(searchParams.get("size") ?? "6", 10));

  const handlePageChange = (value: number) => {
    setPage(value);
    setSearchParams({ page: value.toString(), size: size.toString() });
  };

  return (
    <>
      <Title>Books</Title>
      <Divider />
      <Paper>
        <Stack gap="md">
          <AddBookSection />
          <BookCatalogue books={data.content} />
          <Group justify="center">
            <Pagination
              total={data.totalPages}
              value={page}
              onChange={handlePageChange}
            />
          </Group>
        </Stack>
      </Paper>
    </>
  );
}
