"use client";

import { Center, Stack, Text, Button } from "@mantine/core";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <Center mih="70vh">
      <Stack align="center">
        <Text fw={600} size="lg">
          Ошибка загрузки квиза
        </Text>

        <Text c="dimmed">Что-то пошло не так. Попробуйте снова.</Text>

        <Button onClick={() => reset()}>Повторить</Button>
      </Stack>
    </Center>
  );
}
