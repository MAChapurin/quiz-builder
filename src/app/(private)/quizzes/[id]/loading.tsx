import { Center, Loader, Stack, Text } from "@mantine/core";
import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations("app.quizDetail.loading");
  return (
    <Center mih="70vh" px="md">
      <Stack align="center" gap="sm">
        <Loader type="bars" size="lg" color="var(--mantine-color-gray-4)" />
        <Text size="sm" c="dimmed">
          {t("loader")}
        </Text>
      </Stack>
    </Center>
  );
}
