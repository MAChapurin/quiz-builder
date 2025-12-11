import type { Metadata } from "next";
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import theme from "./theme";
import "./globals.css";
import "@mantine/notifications/styles.css";

import { CookiesBanner } from "@/widgets";
import { getServerCookies } from "@/shared/lib";

export const metadata: Metadata = {
  title: "Конструктор тестов",
  description:
    "Приложение для составления квизов, отправки их людям и просмотра результатов",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = await getServerCookies();
  const bannerSeen = cookies["quiz_banner_seen"] === "true";

  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className="antialiased">
        <MantineProvider theme={theme}>
          <Notifications />
          {children}
          {!bannerSeen && <CookiesBanner />}
        </MantineProvider>
      </body>
    </html>
  );
}
