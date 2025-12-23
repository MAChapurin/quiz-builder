"use client";

import { Drawer, Stack, Button, NavLink, Burger } from "@mantine/core";
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
        styles={{
          body: {
            height: "calc(100vh - 5rem)",
            display: "flex",
            flexDirection: "column",
            paddingBottom: "max(env(safe-area-inset-bottom), 1rem)",
          },
        }}
      >
        <Stack gap={4}>
          <NavLink
            component={Link}
            href={routes.HOME}
            label={t("navigation.home")}
            px="md"
            py="sm"
            onClick={close}
          />
        </Stack>

        <Stack gap="sm" mt="auto">
          <Button
            size="md"
            component={Link}
            href={routes.LOGIN}
            variant="subtle"
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
