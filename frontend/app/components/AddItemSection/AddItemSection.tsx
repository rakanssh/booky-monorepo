import { ActionIcon, Input, Group, Paper } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useFetcher } from "@remix-run/react";
import { notifications } from "@mantine/notifications";

interface AddItemSectionProps {
  name: string;
  placeholder: string;
  successMessage: string;
  errorMessage?: string;
  validateFunction?: (value: string) => boolean;
}

export default function AddItemSection({
  name,
  placeholder,
  successMessage,
  validateFunction,
  errorMessage = "Failed to add item",
}: AddItemSectionProps) {
  const [value, setValue] = useState("");
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data) {
      const data = fetcher.data as { success: boolean; error: string };
      if (data.success) {
        notifications.show({
          title: "Success",
          message: successMessage,
          color: "green",
        });
        setValue("");
      } else {
        notifications.show({
          title: "Error",
          message: data.error || errorMessage,
          color: "red",
        });
      }
    }
  }, [fetcher.data, successMessage, errorMessage]);

  return (
    <fetcher.Form method="post">
      <Paper pt="md">
        <Group>
          <Input
            name={name}
            placeholder={placeholder}
            value={value}
            disabled={fetcher.state === "submitting"}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => validateFunction?.(value)}
          />
          <ActionIcon
            type="submit"
            variant="light"
            disabled={!validateFunction?.(value)}
          >
            <IconPlus />
          </ActionIcon>
        </Group>
      </Paper>
    </fetcher.Form>
  );
}
