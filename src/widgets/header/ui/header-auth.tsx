"use client";

import { Container, Group, Flex, Button, ActionIcon } from "@mantine/core";
import { ColorSchemesSwitcher } from "@/features";
import { Logo } from "@/shared/ui";
import Link from "next/link";
import { routes } from "@/shared/config";
import { IconLogin, IconUserPlus } from "@tabler/icons-react";
import { LanguageSwitcher } from "@/features/language-swither";

export function HeaderAuth() {
  return (
    <Container size="lg" py={10}>
      <Flex h="100%" align="center" justify="space-between">
        <Logo />
        <Group className="flex">
          <LanguageSwitcher />
          <ColorSchemesSwitcher />
          <Button
            component={Link}
            href={routes.LOGIN}
            variant="outline"
            className="hidden xs:block"
          >
            Войти
          </Button>
          <Button
            component={Link}
            href={routes.REGISTER}
            className="hidden xs:block"
          >
            Регистрация
          </Button>
          <ActionIcon
            className="xs:hidden"
            component={Link}
            href={routes.LOGIN}
            variant="outline"
            size="lg"
            aria-label="Войти"
          >
            <IconLogin />
          </ActionIcon>
          <ActionIcon
            className="xs:hidden"
            component={Link}
            href={routes.REGISTER}
            size="lg"
            aria-label="Регистрация"
          >
            <IconUserPlus />
          </ActionIcon>
        </Group>
      </Flex>
    </Container>
  );
}
