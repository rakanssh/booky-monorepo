import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import "./mantine.css";

import { AppShell, ColorSchemeScript, MantineProvider } from "@mantine/core";
import { NavigationBar, Header } from "./components";
import { Notifications } from "@mantine/notifications";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Notifications position="top-left" autoClose={5000} limit={5} />
          <AppShell
            padding="md"
            navbar={{
              width: 60,
              breakpoint: "sm",
              collapsed: { mobile: false },
            }}
            header={{ height: 48 }}
          >
            <AppShell.Header>
              <Header />
            </AppShell.Header>
            <AppShell.Navbar p="md" display="block">
              <NavigationBar />
            </AppShell.Navbar>

            <AppShell.Main>{children}</AppShell.Main>
          </AppShell>
        </MantineProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
