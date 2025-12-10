import { LINKS_ID } from "@/shared/config";
import {
  Container,
  Title,
  Text,
  Card,
  Group,
  SimpleGrid,
  Box,
  ThemeIcon,
  Stack,
} from "@mantine/core";
import { IconCheck, IconLink, IconPuzzle } from "@tabler/icons-react";

export function FeaturesBox() {
  return (
    <Box py={100} id={LINKS_ID.FEATURES} className="">
      <Container size="lg">
        <Stack align="center" mb={60} gap={8}>
          <Title order={2} fw={800} ta="center">
            Возможности платформы
          </Title>
          <Text c="dimmed" ta="center" maw={520}>
            Всё необходимое для создания, проведения и анализа онлайн-квизов
          </Text>
        </Stack>

        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl">
          <Card
            withBorder
            radius="xl"
            p="xl"
            className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <Stack gap="sm">
              <ThemeIcon size={48} radius="md" variant="light">
                <IconPuzzle size={26} />
              </ThemeIcon>

              <Title order={4}>Разные типы вопросов</Title>

              <Text c="dimmed" size="sm">
                Одиночный и множественный выбор, шкалы, списки и другие форматы
                для любых сценариев.
              </Text>
            </Stack>
          </Card>
          <Card
            withBorder
            radius="xl"
            p="xl"
            className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <Stack gap="sm">
              <ThemeIcon size={48} radius="md" variant="light">
                <IconLink size={26} />
              </ThemeIcon>

              <Title order={4}>Простое распространение</Title>

              <Text c="dimmed" size="sm">
                Делитесь тестом по ссылке — доступ к прохождению без
                обязательной регистрации.
              </Text>
            </Stack>
          </Card>
          <Card
            withBorder
            radius="xl"
            p="xl"
            className="transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <Stack gap="sm">
              <ThemeIcon size={48} radius="md" variant="light">
                <IconCheck size={26} />
              </ThemeIcon>

              <Title order={4}>Ответы и аналитика</Title>

              <Text c="dimmed" size="sm">
                Результаты в реальном времени, статистика и экспорт данных для
                дальнейшего анализа.
              </Text>
            </Stack>
          </Card>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
