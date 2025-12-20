"use client";

import { LINKS_ID } from "@/shared/config";
import {
  Box,
  Container,
  Text,
  Title,
  Timeline,
  ThemeIcon,
  Stack,
  Divider,
  Card,
} from "@mantine/core";
import { IconEdit, IconShare, IconChartBar } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

export function HowItWorksBox() {
  const t = useTranslations("widgets.howItWorksBox");

  return (
    <Box id={LINKS_ID.HOW}>
      <Divider mb={80} />
      <Container size="lg">
        <Stack align="center" mb={60} gap={8}>
          <Title order={2} fw={800} ta="center">
            {t("title")}
          </Title>
          <Text c="dimmed" ta="center" maw={520}>
            {t("description")}
          </Text>
        </Stack>
        <Card withBorder p="xl">
          <Timeline
            bulletSize={48}
            lineWidth={1}
            className="max-w-full mx-auto"
            variant="default"
          >
            <Timeline.Item
              title={t("steps.create.title")}
              bullet={
                <ThemeIcon size={48} radius="xl" variant="light">
                  <IconEdit size={24} />
                </ThemeIcon>
              }
            >
              <Text c="dimmed" size="sm">
                {t("steps.create.description")}
              </Text>
            </Timeline.Item>

            <Timeline.Item
              title={t("steps.share.title")}
              bullet={
                <ThemeIcon size={48} radius="xl" variant="light">
                  <IconShare size={24} />
                </ThemeIcon>
              }
            >
              <Text c="dimmed" size="sm">
                {t("steps.share.description")}
              </Text>
            </Timeline.Item>

            <Timeline.Item
              title={t("steps.results.title")}
              bullet={
                <ThemeIcon size={48} radius="xl" variant="light">
                  <IconChartBar size={24} />
                </ThemeIcon>
              }
            >
              <Text c="dimmed" size="sm">
                {t("steps.results.description")}
              </Text>
            </Timeline.Item>
          </Timeline>
        </Card>
      </Container>
    </Box>
  );
}
