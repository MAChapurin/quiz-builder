import { routes } from "@/shared/config";
import { Layout } from "@/shared/ui";
import { HeaderAuth } from "@/widgets";
import { Button, Container, Title } from "@mantine/core";
import { IconHome } from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";

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
    <Layout headerSlot={<HeaderAuth />} footerSlot={null}>
      <Container size={"lg"} className="flex flex-col items-center">
        <Title ta="center" my={40}>
          Добро пожаловать в QuizBuilder!
        </Title>
        {children}
        <Button
          leftSection={<IconHome />}
          component={Link}
          href={routes.HOME}
          my={40}
        >
          На главную
        </Button>
      </Container>
    </Layout>
  );
}
