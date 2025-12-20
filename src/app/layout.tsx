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
import { NextIntlClientProvider } from "next-intl";

import { CookiesBanner } from "@/widgets";
import { getServerCookies } from "@/shared/lib";
import { COOKIE_KEYS } from "@/shared/config";
import { getMessages } from "next-intl/server";

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
  const bannerSeen = cookies[COOKIE_KEYS.BANNER] === "true";
  const messages = await getMessages();
  const locale = messages.locale;

  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className="antialiased">
        <MantineProvider theme={theme}>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <Notifications />
            {children}
            {!bannerSeen && <CookiesBanner />}
          </NextIntlClientProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
