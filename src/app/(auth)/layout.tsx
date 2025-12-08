import { Layout } from "@/shared/ui";
import { Footer, Header } from "@/widgets";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Авторизация",
  description:
    "Приложение для составления квизов, отправки их людям и просмотра результатов",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout headerSlot={<Header />} footerSlot={<Footer />}>
      {children}
    </Layout>
  );
}
