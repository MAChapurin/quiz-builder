import { Card, Skeleton, Stack, Center } from "@mantine/core";

export function QuizPlaySkeleton() {
  return (
    <Center mih="70vh" px="md">
      <Card withBorder radius="lg" padding="xl" shadow="sm" maw={760} w="100%">
        <Stack gap="md">
          <Skeleton height={28} width="70%" />
          <Skeleton height={16} width="50%" />
          <Skeleton height={1} />
          <Skeleton height={120} />
        </Stack>
      </Card>
    </Center>
  );
}
