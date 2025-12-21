import { ReactNode } from "react";
import { Footer, HeaderQuizInvite } from "@/widgets";
import { Layout } from "@/shared/ui";

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <Layout headerSlot={<HeaderQuizInvite />} footerSlot={<Footer />}>
      {children}
    </Layout>
  );
}
