import { ActionIcon, Table, Input } from "@mantine/core";
import { Book } from "../../../types";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useFetcher } from "@remix-run/react";

type BookTableProps = {
  books: Book[];
  readingListId: string;
};

export default function BookTable({ books, readingListId }: BookTableProps) {
  const fetcher = useFetcher();

  const addBook = (bookId: number) => (
    <fetcher.Form
      method="PATCH"
      action={`/api/reading-lists/${readingListId}/books`}
    >
      <Input type="hidden" name="bookId" value={bookId} />
      <ActionIcon type="submit">
        <IconPlus />
      </ActionIcon>
    </fetcher.Form>
  );

  const removeBook = (bookId: number) => (
    <fetcher.Form
      method="DELETE"
      action={`/api/reading-lists/${readingListId}/books`}
    >
      <Input type="hidden" name="bookId" value={bookId} />
      <ActionIcon type="submit">
        <IconMinus />
      </ActionIcon>
    </fetcher.Form>
  );

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th></Table.Th>
          <Table.Th>Title</Table.Th>
          <Table.Th>Authors</Table.Th>
          <Table.Th>Pages</Table.Th>
          <Table.Th>ISBN</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {books.map((book) => (
          <Table.Tr
            key={book.id}
            {...(book.inReadingList ? { bg: "green.1" } : {})}
          >
            <Table.Td>
              {book.inReadingList ? removeBook(book.id) : addBook(book.id)}
            </Table.Td>
            <Table.Td>{book.title}</Table.Td>
            <Table.Td>
              {book.authors.map((author) => author.name).join(", ")}
            </Table.Td>
            <Table.Td>{book.pagesNo}</Table.Td>
            <Table.Td>{book.isbn}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
