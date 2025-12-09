"use client";

import { Container, Group, Flex } from "@mantine/core";
import { ColorSchemesSwitcher, LogOutButton, Profile } from "@/features";
import { Logo } from "@/shared/ui";
import { routes } from "@/shared/config";

export function HeaderPrivate() {
  return (
    <Container size="lg" py={10}>
      <Flex h="100%" align="center" justify="space-between">
        <Logo href={routes.QUIZZES} />
        <Group>
          <ColorSchemesSwitcher />
          <Profile />
          <LogOutButton />
        </Group>
      </Flex>
    </Container>
  );
}
