"use client";

import Link from "next/link";
import { Container, Group, Flex, Button } from "@mantine/core";

import { routes } from "@/shared/config";
import { ColorSchemesSwitcher } from "@/features";
import { Logo } from "@/shared/ui";
import { usePathname } from "next/navigation";

export function HeaderPublic() {
  const pathname = usePathname();
  return (
    <Container size="lg" py={10}>
      <Flex h="100%" align="center" justify="space-between">
        <Logo href={routes.PUBLIC_QUIZ} />
        <Group>
          <Button
            color="dimmed"
            variant="transparent"
            component={Link}
            href={routes.HOME}
          >
            Главная
          </Button>
          <Button
            color={pathname.includes(routes.PUBLIC_QUIZ) ? "blue" : ""}
            variant="transparent"
            component={Link}
            href={routes.PUBLIC_QUIZ}
          >
            Квизы
          </Button>
        </Group>

        <Group>
          <ColorSchemesSwitcher />
          <Button component={Link} href={routes.LOGIN} variant="outline">
            Войти
          </Button>
          <Button component={Link} href={routes.REGISTER}>
            Регистрация
          </Button>
        </Group>
      </Flex>
    </Container>
  );
}
