import { Table } from "@mantine/core";
import { ReadingList } from "../../../types";

interface ReadingListTableProps {
  readingLists: ReadingList[];
}

export default function ReadingListTable({
  readingLists,
}: ReadingListTableProps) {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Number of books</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {readingLists.map((readingList) => (
          <Table.Tr key={readingList.id}>
            <Table.Td>{readingList.name}</Table.Td>
            <Table.Td>{readingList.bookCount}</Table.Td>
            <Table.Td></Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
