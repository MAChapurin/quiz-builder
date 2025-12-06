import {
  Button,
  Container,
  Title,
  Text,
  Stack,
  Box,
  Center,
} from "@mantine/core";

export function CtaBox() {
  return (
    <Box py={80}>
      <Container size="lg">
        <Center>
          <Stack align="center">
            <Title order={2} fw={800} ta="center">
              Готовы создать свой первый тест?
            </Title>
            <Text fz="lg" c="dimmed" ta="center">
              Начните прямо сейчас — это бесплатно и занимает всего пару минут.
            </Text>
            <Button size="lg" radius="md">
              Начать сейчас
            </Button>
          </Stack>
        </Center>
      </Container>
    </Box>
  );
}
