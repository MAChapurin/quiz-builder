import { Layout } from "@/shared/ui";
import { Footer, HeaderPrivate } from "@/widgets";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Квизы",
  description:
    "Приложение для составления квизов, отправки их людям и просмотра результатов",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout headerSlot={<HeaderPrivate />} footerSlot={<Footer />}>
      {children}
    </Layout>
  );
}
