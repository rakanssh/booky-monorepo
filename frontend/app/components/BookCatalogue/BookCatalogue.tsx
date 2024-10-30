import { Image, Text, SimpleGrid, Card, Paper } from "@mantine/core";
import { Book } from "../../types";

export type BookCatalogueProps = {
  books: Book[];
};

export default function BookCatalogue({ books }: BookCatalogueProps) {
  return (
    <Paper pt="md">
      <SimpleGrid
        cols={{ base: 2, sm: 3, md: 4, lg: 4 }}
        spacing={{ base: "md", sm: "lg" }}
      >
        {books.map((book) => (
          <Card key={book.id} padding="md" radius="md" withBorder>
            <Card.Section>
              <Image
                src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}
                height={280}
                fit="contain"
                alt={book.title}
              />
            </Card.Section>

            <Text fw={500} size="lg" mt="md">
              {book.title}
            </Text>

            <Text size="sm" c="dimmed">
              {book.authors.map((author) => author.name).join(", ")}
            </Text>

            <Text size="xs" c="dimmed" mt="xs">
              ISBN: {book.isbn}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </Paper>
  );
}
