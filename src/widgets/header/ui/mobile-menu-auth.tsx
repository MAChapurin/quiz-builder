"use client";

import { Drawer, Stack, Button, Burger, Divider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { routes } from "@/shared/config";

export function AuthMobileMenu() {
  const t = useTranslations("widgets.header");
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <>
      <Burger
        opened={opened}
        onClick={toggle}
        size="sm"
        className="flex lg:hidden pt-4"
      />
      <Drawer
        position="right"
        opened={opened}
        onClose={close}
        title={t("mobile.title")}
        size="xs"
        padding="md"
        className="lg:hidden"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <Stack gap="sm">
          <Divider />
          <Button
            size="md"
            component={Link}
            href={routes.HOME}
            variant="default"
            fullWidth
            onClick={close}
          >
            {t("navigation.home")}
          </Button>
          <Divider />
          <Button
            size="md"
            component={Link}
            href={routes.LOGIN}
            variant="outline"
            fullWidth
            onClick={close}
          >
            {t("actions.login")}
          </Button>

          <Button
            size="md"
            component={Link}
            href={routes.REGISTER}
            fullWidth
            onClick={close}
          >
            {t("actions.register")}
          </Button>
        </Stack>
      </Drawer>
    </>
  );
}
