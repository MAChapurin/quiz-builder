import { getCurrentUser, sessionService } from "@/entities/user/server";
import { Layout } from "@/shared/ui";
import { Footer, HeaderPrivate } from "@/widgets";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await sessionService.verifySession();
  const user = await getCurrentUser();
  return (
    <Layout
      headerSlot={<HeaderPrivate name={user?.name || ""} />}
      footerSlot={<Footer />}
    >
      {children}
    </Layout>
  );
}
