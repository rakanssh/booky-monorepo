import { ActionIcon, Group, Table } from "@mantine/core";
import { ReadingList } from "../../../types";
import { IconEye, IconPlus } from "@tabler/icons-react";
import { Link } from "@remix-run/react";

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
          <Table.Th></Table.Th>
          <Table.Th>ID</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>Number of books</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {readingLists.map((readingList) => (
          <Table.Tr key={readingList.id}>
            <Table.Td w={100}>
              <Group gap="xs">
                <ActionIcon
                  variant="subtle"
                  component={Link}
                  to={`/lists/${readingList.id}`}
                >
                  <IconEye />
                </ActionIcon>
                <ActionIcon
                  variant="subtle"
                  component={Link}
                  to={`/lists/${readingList.id}/add`}
                >
                  <IconPlus />
                </ActionIcon>
              </Group>
            </Table.Td>
            <Table.Td>{readingList.id}</Table.Td>
            <Table.Td>{readingList.name}</Table.Td>
            <Table.Td>{readingList.bookCount}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
