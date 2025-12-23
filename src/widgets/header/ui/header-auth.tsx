import Link from "next/link";
import { Container, Group, Flex, Button } from "@mantine/core";
import { useTranslations } from "next-intl";

import { ColorSchemesSwitcher, LanguageSwitcher } from "@/features";
import { Logo } from "@/shared/ui";
import { routes } from "@/shared/config";
import { AuthMobileMenu } from "./mobile-menu-auth";

export function HeaderAuth() {
  const t = useTranslations("widgets.header");
  return (
    <Container size="lg" py={10}>
      <Flex h="100%" align="center" justify="space-between" wrap="nowrap">
        <Logo />
        <Group className="flex">
          <LanguageSwitcher />
          <ColorSchemesSwitcher />
          <Button
            miw={81}
            component={Link}
            href={routes.LOGIN}
            variant="outline"
            className="hidden lg:block"
          >
            {t("actions.login")}
          </Button>
          <Button
            miw={130}
            component={Link}
            href={routes.REGISTER}
            className="hidden lg:block"
          >
            {t("actions.register")}
          </Button>
          <AuthMobileMenu />
        </Group>
      </Flex>
    </Container>
  );
}
