import { LINKS_ID } from "@/shared/config";
import { Box, Card, Container, SimpleGrid, Text, Title } from "@mantine/core";

export function HowItWorksBox() {
  return (
    <Box py={80} id={LINKS_ID.HOW}>
      <Container size="lg">
        <Title order={2} ta="center" mb={40} fw={700}>
          Как это работает
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={30}>
          <Card withBorder radius="lg" p="xl" ta="center">
            <Title order={3} mb="sm">
              1. Создайте тест
            </Title>
            <Text c="dimmed">
              Добавьте вопросы, выберите типы ответов, настройте дизайн и
              структуру теста.
            </Text>
          </Card>

          <Card withBorder radius="lg" p="xl" ta="center">
            <Title order={3} mb="sm">
              2. Поделитесь ссылкой
            </Title>
            <Text c="dimmed">
              Отправьте ссылку участникам, разместите её в соцсетях или на
              сайте.
            </Text>
          </Card>

          <Card withBorder radius="lg" p="xl" ta="center">
            <Title order={3} mb="sm">
              3. Получите результаты
            </Title>
            <Text c="dimmed">
              Следите за ответами, анализируйте данные и выгружайте их в нужном
              формате.
            </Text>
          </Card>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
