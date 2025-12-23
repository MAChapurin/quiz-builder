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
        <Flex align="center" justify="space-between" wrap="nowrap">
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
            <Burger hiddenFrom="md" opened={opened} onClick={open} size="sm" />
          </Group>
        </Flex>
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        hiddenFrom="md"
        position="right"
        size="xs"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        styles={{
          body: {
            height: "calc(100dvh - 5rem)",
            display: "flex",
            flexDirection: "column",
            paddingBottom: "env(safe-area-inset-bottom)",
          },
        }}
      >
        <Flex direction="column" justify="space-between" className="h-full">
          <Stack gap="md">
            <NavLinks pathname={pathname} onClick={close} />
          </Stack>
          <Divider my="md" opacity={0.6} />
          <Center>
            <LogOutButton withLabel size="xs" />
          </Center>
        </Flex>
      </Drawer>
    </>
  );
}
