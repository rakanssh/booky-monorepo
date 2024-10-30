import { ActionIcon, Group, Table } from "@mantine/core";
import { ReadingList } from "../../../types";
import { IconEdit, IconEye, IconPlus, IconTrash } from "@tabler/icons-react";
import { Link, useFetcher } from "@remix-run/react";
import { notifications } from "@mantine/notifications";

interface ReadingListTableProps {
  readingLists: ReadingList[];
}

export default function ReadingListTable({
  readingLists,
}: ReadingListTableProps) {
  const fetcher = useFetcher();

  const deleteReadingList = (id: string) => (
    <fetcher.Form method="DELETE" action={`/api/reading-lists/${id}`}>
      <ActionIcon variant="subtle" type="submit" color="red">
        <IconTrash />
      </ActionIcon>
    </fetcher.Form>
  );
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
            <Table.Td w={130}>
              <Group gap="xs">
                {deleteReadingList(readingList.id)}
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
                  <IconEdit />
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
