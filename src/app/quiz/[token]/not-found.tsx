import { Card, Center, Stack, Text, Button, Divider } from "@mantine/core";
import Link from "next/link";
import { routes } from "@/shared/config";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("app.quizPublic.notFound");
  return (
    <Center mih="70vh" px="md">
      <Card withBorder radius="lg" padding="xl" shadow="sm" maw={760} w="100%">
        <Stack gap="md">
          <Text fw={600} size="lg">
            {t("title")}
          </Text>
          <Text c="dimmed">{t("description")}</Text>
          <Divider mb={16} />
          <Button component={Link} href={routes.HOME} mt="md">
            {t("goHomeButton")}
          </Button>
        </Stack>
      </Card>
    </Center>
  );
}
