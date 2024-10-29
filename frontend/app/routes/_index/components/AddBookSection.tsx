import { ActionIcon, Input, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useFetcher } from "@remix-run/react";
import { notifications } from "@mantine/notifications";

export default function AddBookSection() {
  const [isbn, setIsbn] = useState("");
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data) {
      const data = fetcher.data as { success: boolean; error: string };
      console.log(fetcher.data);
      if (data.success) {
        notifications.show({
          title: "Success",
          message: "Book added successfully",
          color: "green",
        });
        setIsbn("");
      } else {
        notifications.show({
          title: "Error",
          message: data.error || "Failed to add book",
          color: "red",
        });
      }
    }
  }, [fetcher.data]);

  return (
    <fetcher.Form method="post">
      <Input
        name="isbn"
        placeholder="ISBN"
        value={isbn}
        disabled={fetcher.state === "submitting"}
        onChange={(e) => setIsbn(e.target.value)}
      />
      <Button type="submit" variant="light">
        <IconPlus />
      </Button>
    </fetcher.Form>
  );
}
