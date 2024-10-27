import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Booky" },
    { name: "description", content: "Booky: Your personal librarian" },
  ];
};

export default function Index() {
  return <div>Home</div>;
}
