import { IconSun, IconMoon } from "@tabler/icons-react";
import {
  Title,
  Group,
  ActionIcon,
  useMantineColorScheme,
  Burger,
} from "@mantine/core";

export interface HeaderProps {
  navbarOpen: boolean;
  setNavbarOpen: (value: boolean) => void;
}

export default function Header({ navbarOpen, setNavbarOpen }: HeaderProps) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Group justify="space-between" align="center" pt="xs" px="lg" w="100%">
      <Burger
        opened={!navbarOpen}
        onClick={() => setNavbarOpen(!navbarOpen)}
        hiddenFrom="sm"
      />
      <Title order={1} fw={700} fz="xl" style={{ lineHeight: 1, margin: 0 }}>
        Booky
      </Title>
      <ActionIcon
        variant="outline"
        color={isDark ? "yellow" : "blue"}
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
      >
        {isDark ? <IconSun size="1.1rem" /> : <IconMoon size="1.1rem" />}
      </ActionIcon>
    </Group>
  );
}
