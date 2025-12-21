import { routes } from "@/shared/config";
import { Layout } from "@/shared/ui";
import { HeaderAuth } from "@/widgets";
import { Button, Container, Title } from "@mantine/core";
import { IconHome } from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("app.auth.layout.meta");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("app.auth.layout");

  return (
    <Layout headerSlot={<HeaderAuth />} footerSlot={null}>
      <Container size="lg" className="flex flex-col items-center">
        <Title ta="center" my={40}>
          {t("title")}
        </Title>
        <div className="max-w-105 w-full">{children}</div>
        <Button
          leftSection={<IconHome />}
          component={Link}
          href={routes.HOME}
          my={40}
        >
          {t("homeButton")}
        </Button>
      </Container>
    </Layout>
  );
}
