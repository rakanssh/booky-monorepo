import { ActionIcon, Table } from "@mantine/core";
import { Book } from "../../../types";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useFetcher } from "@remix-run/react";
import { notifications } from "@mantine/notifications";

type BookTableProps = {
  books: Book[];
  readingListId: string;
};

export default function BookTable({ books, readingListId }: BookTableProps) {
  const fetcher = useFetcher();

  const handleBookAction = async (bookId: number, action: "add" | "remove") => {
    try {
      await fetcher.submit(
        { bookId: bookId.toString() },
        {
          method: action === "add" ? "PATCH" : "DELETE",
          action: `/api/reading-lists/${readingListId}/books`,
        }
      );
    } catch (error) {
      notifications.show({
        title: "Error",
        message: `Failed to ${action} book`,
        color: "red",
      });
    }
  };

  const addBook = (bookId: number) => (
    <ActionIcon onClick={() => handleBookAction(bookId, "add")}>
      <IconPlus />
    </ActionIcon>
  );

  const removeBook = (bookId: number) => (
    <ActionIcon onClick={() => handleBookAction(bookId, "remove")}>
      <IconMinus />
    </ActionIcon>
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
