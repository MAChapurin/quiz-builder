import { cookies } from "next/headers";
import {
  Container,
  Divider,
  Flex,
  Group,
  Skeleton,
  Card,
  SimpleGrid,
  Stack,
  Loader,
  Center,
} from "@mantine/core";
import { COOKIE_KEYS } from "@/shared/config";

export default async function Loading() {
  const cookieStore = await cookies();
  const view = cookieStore.get(COOKIE_KEYS.QUIZ_LIST_VIEW)?.value ?? "cards";

  return (
    <Container size="lg" opacity={1} className="pointer-events-none">
      <Group justify="space-between" my="md">
        <Skeleton height={28} width={110} radius="sm" />
        <Skeleton height={36} width={160} radius="sm" />
      </Group>
      <Divider my={16} />
      <Flex justify="space-between" align="center">
        <Skeleton height={38} width={96} radius="sm" />
        <Skeleton height={32} width={35} />
      </Flex>
      <Divider my={16} />
      {view === "table" ? (
        <Center h="60dvh">
          <Loader type="bars" size={"xl"} color="var(--mantine-color-gray-4)" />
        </Center>
      ) : (
        <CardsSkeleton />
      )}

      <div className="h-10" />
    </Container>
  );
}

function CardsSkeleton() {
  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, lg: 3 }}
      spacing={{ base: 10, sm: 16 }}
      verticalSpacing={{ base: 10, sm: 16 }}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <Card key={i} withBorder p="lg" className="shadow-sm">
          <Flex justify="space-between" align="center" mb={22}>
            <Skeleton height={22} width={100} />
            <Skeleton height={14} width={105} />
          </Flex>
          <Stack mb={14}>
            <Skeleton height={12} />
          </Stack>
          <Flex gap={8}>
            <Skeleton height={18} width={85} radius="xl" />
            <Skeleton height={18} width={105} radius="xl" />
          </Flex>

          <Divider my={16} />
          <Flex align="center" gap="lg">
            <Skeleton height={14} width={80} />
            <Skeleton height={18} width={90} radius="xl" />
            <Skeleton height={24} width={44} radius="xl" className="ml-auto" />
          </Flex>
          <Divider my={16} />
          <Flex justify="space-between" mt={15}>
            <Flex gap={10}>
              {Array.from({ length: 3 }).map((_, j) => (
                <Skeleton key={j} height={35} width={34} radius="sm" />
              ))}
            </Flex>
            <Flex gap={10}>
              {Array.from({ length: 2 }).map((_, j) => (
                <Skeleton key={j} height={35} width={34} radius="sm" />
              ))}
            </Flex>
          </Flex>
        </Card>
      ))}
    </SimpleGrid>
  );
}
