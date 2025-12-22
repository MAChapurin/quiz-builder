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
import { getMessages, getLocale } from "next-intl/server";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [messages, locale, cookies] = await Promise.all([
    getMessages(),
    getLocale(),
    getServerCookies(),
  ]);
  const bannerSeen = cookies[COOKIE_KEYS.BANNER] === "true";

  return (
    <html lang={locale} {...mantineHtmlProps}>
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
