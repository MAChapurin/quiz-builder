"use client";

import { Drawer, Stack, Button, Divider, NavLink } from "@mantine/core";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { headerLinks, LINKS_ID, routes } from "@/shared/config";

const navKeyByHref: Record<string, string> = {
  [`#${LINKS_ID.HOME}`]: "home",
  [`#${LINKS_ID.FEATURES}`]: "features",
  [`#${LINKS_ID.HOW}`]: "how",
  [`#${LINKS_ID.FAQ}`]: "faq",
};

type MobileMenuProps = {
  opened: boolean;
  onClose: () => void;
  activeSection: string;
  handleLinkClick: (href: string) => void;
};

export function MobileMenu({
  opened,
  onClose,
  activeSection,
  handleLinkClick,
}: MobileMenuProps) {
  const t = useTranslations("widgets.header");

  return (
    <Drawer
      position="right"
      opened={opened}
      onClose={onClose}
      title={t("mobile.title")}
      size="xs"
      padding="md"
      className="lg:hidden"
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
    >
      <Stack gap={4}>
        {headerLinks.map((link) => {
          const key = navKeyByHref[link.href];

          return (
            <NavLink
              key={link.href}
              label={key ? t(`navigation.${key}`) : link.label}
              active={activeSection === link.href}
              onClick={() => {
                handleLinkClick(link.href);
                onClose();
              }}
              href={`#${key}`}
              component={Link}
              px="md"
              py="sm"
              styles={{
                root: {
                  transition: "background-color 150ms ease, color 150ms ease",
                },
              }}
            />
          );
        })}
      </Stack>

      <Divider my="md" opacity={0.6} />

      <Stack gap="sm" mt="auto">
        <Button
          size="md"
          component={Link}
          href={routes.LOGIN}
          variant="outline"
          fullWidth
          onClick={onClose}
        >
          {t("actions.login")}
        </Button>

        <Button
          size="md"
          component={Link}
          href={routes.REGISTER}
          fullWidth
          onClick={onClose}
        >
          {t("actions.register")}
        </Button>
      </Stack>
    </Drawer>
  );
}
