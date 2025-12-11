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

export function HowItWorksBox() {
  return (
    <Box id={LINKS_ID.HOW}>
      <Divider mb={80} />
      <Container size="lg">
        <Stack align="center" mb={60} gap={8}>
          <Title order={2} fw={800} ta="center">
            Как это работает ?
          </Title>
          <Text c="dimmed" ta="center" maw={520}>
            Всего три простых шага — и ваш квиз готов к запуску
          </Text>
        </Stack>
        <Card withBorder radius="xl" p="xl">
          <Timeline
            bulletSize={48}
            lineWidth={1}
            className="max-w-full mx-auto"
            variant="default"
          >
            <Timeline.Item
              title="Создайте тест"
              bullet={
                <ThemeIcon size={48} radius="xl" variant="light">
                  <IconEdit size={24} />
                </ThemeIcon>
              }
            >
              <Text c="dimmed" size="sm">
                Добавьте вопросы, настройте варианты ответов и структуру квиза.
              </Text>
            </Timeline.Item>

            <Timeline.Item
              title="Поделитесь ссылкой"
              bullet={
                <ThemeIcon size={48} radius="xl" variant="light">
                  <IconShare size={24} />
                </ThemeIcon>
              }
            >
              <Text c="dimmed" size="sm">
                Отправьте ссылку участникам или разместите её в любом удобном
                месте.
              </Text>
            </Timeline.Item>

            <Timeline.Item
              title="Получайте результаты"
              bullet={
                <ThemeIcon size={48} radius="xl" variant="light">
                  <IconChartBar size={24} />
                </ThemeIcon>
              }
            >
              <Text c="dimmed" size="sm">
                Следите за ответами и аналитикой в режиме реального времени.
              </Text>
            </Timeline.Item>
          </Timeline>
        </Card>
      </Container>
    </Box>
  );
}
