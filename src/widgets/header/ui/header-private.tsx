"use client";

import { Container, Group, Flex, Burger, Drawer, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { usePathname } from "next/navigation";

import { ColorSchemesSwitcher, LogOutButton, Profile } from "@/features";
import { Logo } from "@/shared/ui";
import { routes } from "@/shared/config";
import { NavLinks } from "./navlinks";

export function HeaderPrivate() {
  const pathname = usePathname();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Container size="lg" py={10}>
        <Flex align="center" justify="space-between">
          <Logo href={routes.QUIZZES} />
          <Group visibleFrom="md">
            <NavLinks pathname={pathname} />
          </Group>
          <Group>
            <ColorSchemesSwitcher />
            <Group visibleFrom="md">
              <Profile />
              <LogOutButton />
            </Group>
            <Burger hiddenFrom="md" opened={opened} onClick={open} />
          </Group>
        </Flex>
      </Container>
      <Drawer
        opened={opened}
        onClose={close}
        size="75%"
        title="Меню"
        hiddenFrom="md"
        position="right"
      >
        <Stack gap="md">
          <NavLinks pathname={pathname} onClick={close} />
          <Profile />
          <LogOutButton />
        </Stack>
      </Drawer>
    </>
  );
}
