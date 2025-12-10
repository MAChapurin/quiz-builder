import { DemoQuizContainer } from "@/features";
import { CTAModal } from "@/features/cta-modal";

import { LINKS_ID } from "@/shared/config";
import {
  Box,
  Center,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";

export function Hero() {
  return (
    <Box py={80} id={LINKS_ID.HOME}>
      <Container size="lg">
        <Center>
          <Stack align="center" maw={700}>
            <Title order={1} fw={800} ta="center">
              Создавайте тесты быстро и удобно
            </Title>
            <Text fz="lg" c="dimmed" ta="center">
              Современный конструктор тестов с удобным интерфейсом, гибкими
              настройками и мгновенным сбором ответов.
            </Text>
            <Group mt="md">
              <CTAModal />
              <DemoQuizContainer />
            </Group>
          </Stack>
        </Center>
      </Container>
    </Box>
  );
}
