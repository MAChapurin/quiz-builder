"use client";

import {
  Container,
  Group,
  Flex,
  Burger,
  Drawer,
  Stack,
  Center,
  Divider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { usePathname } from "next/navigation";

import {
  ColorSchemesSwitcher,
  LanguageSwitcher,
  LogOutButton,
  Profile,
} from "@/features";
import { Logo } from "@/shared/ui";
import { routes } from "@/shared/config";
import { NavLinks } from "./nav-links";

export function HeaderPrivate({ name }: { name: string }) {
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
            <LanguageSwitcher />
            <ColorSchemesSwitcher />
            <Profile name={name} />
            <Group visibleFrom="md">
              <LogOutButton />
            </Group>
            <Burger hiddenFrom="md" opened={opened} onClick={open} />
          </Group>
        </Flex>
      </Container>
      <Drawer
        opened={opened}
        onClose={close}
        title="Меню"
        hiddenFrom="md"
        position="right"
        size={"xs"}
      >
        <Stack gap="md">
          <NavLinks pathname={pathname} onClick={close} />
          <Divider />
          <Center>
            <LogOutButton withLabel size="xs" />
          </Center>
        </Stack>
      </Drawer>
    </>
  );
}
