import "./globals.css";

import type { Metadata } from "next";
import { QueryProvider } from "../providers/QueryProvider";
import { MuiThemeProvider } from "@repo/ui";

export const metadata: Metadata = {
  title: "Hangman",
  description: "Testing webSocket connection",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <MuiThemeProvider>
          <QueryProvider>{children}</QueryProvider>
        </MuiThemeProvider>
      </body>
    </html>
  );
}
