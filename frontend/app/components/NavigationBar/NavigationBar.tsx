import { ActionIcon, Stack, Tooltip } from "@mantine/core";
import { Link } from "@remix-run/react";
import { IconBook2, IconBooks } from "@tabler/icons-react";

interface NavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: "Home", to: "/", icon: <IconBook2 /> },
  { label: "Reading lists", to: "/lists", icon: <IconBooks /> },
];

export default function NavigationBar() {
  return (
    <Stack style={{ width: "100%" }}>
      {navItems.map((item) => (
        <Tooltip key={item.to} label={item.label}>
          <ActionIcon component={Link} to={item.to} variant="subtle">
            {item.icon}
          </ActionIcon>
        </Tooltip>
      ))}
    </Stack>
  );
}
