"use client";

import { Drawer, Stack, Anchor, Button } from "@mantine/core";
import { ColorSchemesSwitcher } from "@/features";
import { headerLinks, LINKS_ID, routes } from "@/shared/config";
import Link from "next/link";
import { useTranslations } from "next-intl";

const navKeyByHref: Record<string, string> = {
  [`#${LINKS_ID.HOME}`]: "home",
  [`#${LINKS_ID.FEATURES}`]: "features",
  [`#${LINKS_ID.HOW}`]: "how",
  [`#${LINKS_ID.FAQ}`]: "faq",
};

export function MobileMenu({
  opened,
  onClose,
  activeSection,
  handleLinkClick,
}: {
  opened: boolean;
  onClose: () => void;
  activeSection: string;
  handleLinkClick: (href: string) => void;
}) {
  const t = useTranslations("widgets.headerMarketing");

  return (
    <Drawer
      position="right"
      opened={opened}
      onClose={onClose}
      title={t("mobile.title")}
      padding="md"
      size="xs"
      className="lg:hidden"
    >
      <Stack>
        {headerLinks.map((link) => {
          const key = navKeyByHref[link.href];

          return (
            <Anchor
              key={link.href}
              onClick={() => handleLinkClick(link.href)}
              style={{
                cursor: "pointer",
                color: activeSection === link.href ? "blue" : undefined,
              }}
            >
              {key ? t(`navigation.${key}`) : link.label}
            </Anchor>
          );
        })}

        <ColorSchemesSwitcher />

        <Button
          component={Link}
          href={routes.LOGIN}
          variant="outline"
          fullWidth
        >
          {t("actions.login")}
        </Button>

        <Button component={Link} href={routes.REGISTER} fullWidth>
          {t("actions.register")}
        </Button>
      </Stack>
    </Drawer>
  );
}
