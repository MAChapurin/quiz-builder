import { Layout } from "@/shared/ui";
import { Footer, HeaderQuizInvite } from "@/widgets";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Квизы",
  description:
    "Приложение для составления квизов, отправки их людям и просмотра результатов",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout headerSlot={<HeaderQuizInvite />} footerSlot={<Footer />}>
      {children}
    </Layout>
  );
}
