import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { booksService } from "../../services/books.server";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { Divider, Group, Pagination, Paper, Title } from "@mantine/core";
import { useState } from "react";
import BooksTable from "./components/BooksTable";
import AddBookSection from "./components/AddBookSection";
import { ErrorResponse } from "../../types/api";
export const meta: MetaFunction = () => {
  return [
    { title: "Booky" },
    { name: "description", content: "Booky: Your personal librarian" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = (
    parseInt(url.searchParams.get("page") ?? "1", 10) - 1
  ).toString();
  const size = url.searchParams.get("size") ?? 10;
  const books = await booksService.getBooks({
    page,
    size: size as string,
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
  const [size] = useState(parseInt(searchParams.get("size") ?? "10", 10));

  const handlePageChange = (value: number) => {
    setPage(value);
    setSearchParams({ page: value.toString(), size: size.toString() });
  };

  return (
    <>
      <Title>Books</Title>
      <Divider />
      <Paper>
        <Group>
          <AddBookSection />
          <BooksTable books={data.content} />
          <Pagination
            total={data.totalPages}
            value={page}
            onChange={handlePageChange}
          />
        </Group>
      </Paper>
    </>
  );
}
