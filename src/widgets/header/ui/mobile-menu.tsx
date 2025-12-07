"use client";

import { Drawer, Stack, Anchor, Button } from "@mantine/core";
import { ColorSchemesSwitcher } from "@/features";
import { headerLinks, routes } from "@/shared/config";
import Link from "next/link";

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
  return (
    <Drawer
      position="right"
      opened={opened}
      onClose={onClose}
      title="Меню"
      padding="md"
      size="xs"
      className="lg:hidden"
    >
      <Stack>
        {headerLinks.map((link) => (
          <Anchor
            key={link.href}
            onClick={() => handleLinkClick(link.href)}
            style={{
              cursor: "pointer",
              color: activeSection === link.href ? "blue" : "",
            }}
          >
            {link.label}
          </Anchor>
        ))}

        <ColorSchemesSwitcher />

        <Button
          component={Link}
          href={routes.LOGIN}
          variant="outline"
          fullWidth
        >
          Войти
        </Button>
        <Button component={Link} href={routes.REGISTER} fullWidth>
          Регистрация
        </Button>
      </Stack>
    </Drawer>
  );
}
