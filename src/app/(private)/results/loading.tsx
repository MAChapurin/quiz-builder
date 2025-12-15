import { Center, Loader, Stack, Text } from "@mantine/core";

export default function Loading() {
  return (
    <Center mih="70vh" px="md">
      <Stack align="center" gap="sm">
        <Loader type="bars" size="lg" color="var(--mantine-color-gray-4)" />
        <Text size="sm" c="dimmed">
          Загружаем результаты прохождений…
        </Text>
      </Stack>
    </Center>
  );
}
