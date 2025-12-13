"use client";

import { Container, Group, Flex, Button } from "@mantine/core";
import { ColorSchemesSwitcher, LogOutButton, Profile } from "@/features";
import { Logo } from "@/shared/ui";
import { routes } from "@/shared/config";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function HeaderPrivate() {
  const pathname = usePathname();
  return (
    <Container size="lg" py={10}>
      <Flex h="100%" align="center" justify="space-between">
        <Logo href={routes.QUIZZES} />
        <Group component={"nav"}>
          <Button
            variant="transparent"
            component={Link}
            href={routes.QUIZZES}
            opacity={pathname === routes.QUIZZES ? 1 : 0.6}
          >
            Квизы
          </Button>
          <Button
            variant="transparent"
            component={Link}
            href={routes.RESULTS}
            opacity={pathname === routes.RESULTS ? 1 : 0.6}
          >
            Результаты
          </Button>
        </Group>
        <Group>
          <ColorSchemesSwitcher />
          <Profile />
          <LogOutButton />
        </Group>
      </Flex>
    </Container>
  );
}
