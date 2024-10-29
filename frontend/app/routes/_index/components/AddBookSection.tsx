import { ActionIcon, Input, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useFetcher } from "@remix-run/react";
import { notifications } from "@mantine/notifications";

export default function AddBookSection() {
  const [isbn, setIsbn] = useState("");
  const fetcher = useFetcher();

  const validateIsbn = (isbn: string) => {
    return isbn.length === 10;
  };
  if (fetcher.data) {
    if (fetcher.data.success) {
      notifications.show({
        title: "Success",
        message: "Book added successfully",
        color: "green",
      });
      setIsbn("");
    } else {
      notifications.show({
        title: "Error",
        message: fetcher.data.error || "Failed to add book",
        color: "red",
      });
    }
  }

  return (
    <fetcher.Form method="post">
      <Input
        name="isbn"
        placeholder="ISBN"
        value={isbn}
        disabled={fetcher.state === "submitting"}
        onChange={(e) => setIsbn(e.target.value)}
      />
      <Button
        type="submit"
        variant="light"
        disabled={!validateIsbn(isbn) || fetcher.state === "submitting"}
      >
        <IconPlus />
      </Button>
    </fetcher.Form>
  );
}
