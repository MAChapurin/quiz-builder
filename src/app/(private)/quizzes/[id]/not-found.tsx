import Link from "next/link";
import { Card, Title, Text, Button, Center, Stack } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { routes } from "@/shared/config";
import { useTranslations } from "next-intl";

export default function NotFoundQuiz() {
  const t = useTranslations("app.quizDetail.notFound");
  return (
    <Center mih="70vh" px="md">
      <Card radius="lg" p="xl" shadow="md" maw={420} w="100%">
        <Stack align="center" gap="md">
          <IconAlertCircle size={48} color="var(--mantine-color-red-6)" />

          <Title order={3} ta="center">
            {t("title")}
          </Title>

          <Text c="dimmed" ta="center">
            {t("description")}
          </Text>

          <Button
            component={Link}
            href={routes.QUIZZES}
            variant="light"
            mt="sm"
          >
            {t("goBackButton")}
          </Button>
        </Stack>
      </Card>
    </Center>
  );
}
