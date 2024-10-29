import { Table, Image, Box, Box } from "@mantine/core";
import { Book } from "../../../types";

export type BooksTableProps = {
  books: Book[];
};

export default function BooksTable({ books }: BooksTableProps) {
  const rows = books.map((book) => (
    <Table.Tr key={book.id}>
      <Table.Td style={{ display: "flex", alignItems: "center" }}>
        <Box w={50} h={100} style={{ alignSelf: "center" }}>
          <Image
            src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-S.jpg`}
            alt={book.title}
          />
        </Box>
      </Table.Td>
      <Table.Td>{book.title}</Table.Td>
      <Table.Td>
        {book.authors.map((author) => author.name).join(", ")}
      </Table.Td>
      <Table.Td>{book.isbn}</Table.Td>
    </Table.Tr>
  ));
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th style={{ width: 50 }}></Table.Th>
          <Table.Th>Title</Table.Th>
          <Table.Th>Author</Table.Th>
          <Table.Th>ISBN</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
