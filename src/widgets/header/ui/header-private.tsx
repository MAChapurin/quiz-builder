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
import { useTranslations } from "next-intl";

export function HeaderPrivate({ name }: { name: string }) {
  const t = useTranslations("widgets.header");
  const pathname = usePathname();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Container size="lg" py={10}>
        <Flex align="center" justify="space-between" wrap="nowrap">
          <Logo href={routes.PROFILE} />
          <Flex visibleFrom="md" gap={"lg"}>
            <NavLinks pathname={pathname} />
          </Flex>
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
        title={t("mobile.title")}
        opened={opened}
        onClose={close}
        hiddenFrom="md"
        position="right"
        size="xs"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <Flex direction="column" justify="space-between" className="h-full">
          <Stack gap={0}>
            <NavLinks pathname={pathname} onClick={close} />
            <Divider my="md" opacity={0.6} />
            <LogOutButton withLabel size="md" />
          </Stack>
          <Center></Center>
        </Flex>
      </Drawer>
    </>
  );
}
