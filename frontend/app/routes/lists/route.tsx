import { Divider, Group, Pagination, Paper, Stack, Title } from "@mantine/core";
import AddListSection from "./components/AddListSection";
import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { ErrorResponse } from "../../types";
import { readingListsService } from "../../services";
import ReadingListTable from "./components/ReadingListTable";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { useState } from "react";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = (
    parseInt(url.searchParams.get("page") ?? "1", 10) - 1
  ).toString();
  const size = url.searchParams.get("size") ?? "8";
  const data = await readingListsService.getReadingLists({
    page,
    size,
  });
  return json(data);
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  try {
    await readingListsService.createReadingList(name);
    return json({ success: true });
  } catch (error) {
    return json(
      { success: false, error: (error as ErrorResponse).message },
      { status: (error as ErrorResponse).status }
    );
  }
}

export default function Lists() {
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
      <Title>Lists</Title>
      <Divider />
      <Paper>
        <Stack gap="md">
          <AddListSection />
          <ReadingListTable readingLists={data.content} />
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
