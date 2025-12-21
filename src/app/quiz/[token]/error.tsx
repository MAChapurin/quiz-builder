"use client";

import { Center, Stack, Text, Button } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations("app.quizPublic.error");
  return (
    <Center mih="70vh">
      <Stack align="center">
        <Text fw={600} size="lg">
          {t("title")}
        </Text>
        <Text c="dimmed">{t("description")}</Text>
        <Button leftSection={<IconRefresh size={16} />} onClick={() => reset()}>
          {t("resetButton")}
        </Button>
      </Stack>
    </Center>
  );
}
