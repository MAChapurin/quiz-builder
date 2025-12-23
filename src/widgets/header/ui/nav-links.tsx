import { routes } from "@/shared/config";
import { Stack, NavLink } from "@mantine/core";
import { useTranslations } from "next-intl";
import Link from "next/link";

type NavLinksProps = {
  pathname: string;
  onClick?: () => void;
};

export function NavLinks({ pathname, onClick }: NavLinksProps) {
  const t = useTranslations("widgets.header");

  const links = [
    { href: routes.QUIZZES, label: t("navigation.quizzes") },
    { href: routes.RESULTS, label: t("navigation.results") },
  ];

  return (
    <Stack gap="md">
      {links.map((link) => (
        <NavLink
          key={link.href}
          component={Link}
          href={link.href}
          label={link.label}
          active={pathname === link.href}
          onClick={onClick}
          px="md"
          py="sm"
          styles={{
            root: {
              transition: "background-color 150ms ease, color 150ms ease",
            },
          }}
        />
      ))}
    </Stack>
  );
}
