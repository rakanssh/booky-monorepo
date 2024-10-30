import { Title, Group, Burger } from "@mantine/core";

export interface HeaderProps {
  navbarOpen: boolean;
  setNavbarOpen: (value: boolean) => void;
}

export default function Header({ navbarOpen, setNavbarOpen }: HeaderProps) {
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
    </Group>
  );
}
