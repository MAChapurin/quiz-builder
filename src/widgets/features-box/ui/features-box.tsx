import { LINKS_ID } from "@/shared/config";
import {
  Container,
  Title,
  Text,
  Card,
  Group,
  SimpleGrid,
  Box,
} from "@mantine/core";
import { IconCheck, IconLink, IconPuzzle } from "@tabler/icons-react";

export function FeaturesBox() {
  return (
    <Box py={80} id={LINKS_ID.FEATURES}>
      <Container size="lg">
        <Title order={2} ta="center" mb={40} fw={700}>
          Возможности платформы
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={30}>
          <Card withBorder radius="lg" p="xl">
            <Group mb="sm">
              <IconPuzzle size={32} />
              <Title order={3}>Разные типы вопросов</Title>
            </Group>
            <Text c="dimmed">
              Одиночный выбор, множественный выбор, длинные ответы, шкалы,
              списки и многое другое.
            </Text>
          </Card>

          <Card withBorder radius="lg" p="xl">
            <Group mb="sm">
              <IconLink size={32} />
              <Title order={3}>Простое распространение</Title>
            </Group>
            <Text c="dimmed">
              Отправляйте ссылку — любой человек сможет открыть тест без
              регистрации.
            </Text>
          </Card>

          <Card withBorder radius="lg" p="xl">
            <Group mb="sm">
              <IconCheck size={32} />
              <Title order={3}>Ответы и аналитика</Title>
            </Group>
            <Text c="dimmed">
              Просматривайте статистику и результаты в реальном времени,
              выгружайте данные при необходимости.
            </Text>
          </Card>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
