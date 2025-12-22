import Link from "next/link";
import { Container, Group, Flex, Button, ActionIcon } from "@mantine/core";
import { IconLogin, IconUserPlus } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

import { ColorSchemesSwitcher, LanguageSwitcher } from "@/features";
import { Logo } from "@/shared/ui";
import { routes } from "@/shared/config";

export function HeaderAuth() {
  const t = useTranslations("widgets.header");
  return (
    <Container size="lg" py={10}>
      <Flex h="100%" align="center" justify="space-between">
        <Logo />
        <Group className="flex">
          <LanguageSwitcher />
          <ColorSchemesSwitcher />
          <Button
            miw={81}
            component={Link}
            href={routes.LOGIN}
            variant="outline"
            className="hidden xs:block"
          >
            {t("actions.login")}
          </Button>
          <Button
            miw={130}
            component={Link}
            href={routes.REGISTER}
            className="hidden xs:block"
          >
            {t("actions.register")}
          </Button>
          <ActionIcon
            className="xs:hidden"
            component={Link}
            href={routes.LOGIN}
            variant="outline"
            size="lg"
            aria-label={t("actions.login")}
          >
            <IconLogin />
          </ActionIcon>
          <ActionIcon
            className="xs:hidden"
            component={Link}
            href={routes.REGISTER}
            size="lg"
            aria-label={t("actions.register")}
          >
            <IconUserPlus />
          </ActionIcon>
        </Group>
      </Flex>
    </Container>
  );
}
