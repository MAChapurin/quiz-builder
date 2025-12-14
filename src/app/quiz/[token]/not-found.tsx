import { Card, Center, Stack, Text, Button, Divider } from "@mantine/core";
import Link from "next/link";
import { routes } from "@/shared/config";

export default function NotFound() {
  return (
    <Center mih="70vh" px="md">
      <Card withBorder radius="lg" padding="xl" shadow="sm" maw={760} w="100%">
        <Stack gap="md">
          <Text fw={600} size="lg">
            Квиз не найден
          </Text>
          <Text c="dimmed">
            Ссылка недействительна или квиз больше не доступен.
          </Text>
          <Divider mb={16} />
          <Button component={Link} href={routes.HOME} mt="md">
            На главную
          </Button>
        </Stack>
      </Card>
    </Center>
  );
}
