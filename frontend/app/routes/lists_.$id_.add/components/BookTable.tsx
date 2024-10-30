import { ActionIcon, Table } from "@mantine/core";
import { Book } from "../../../types";
import { IconMinus, IconPlus } from "@tabler/icons-react";

type BookTableProps = {
  books: Book[];
};

export default function BookTable({ books }: BookTableProps) {
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
            <Table.Td></Table.Td>
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
