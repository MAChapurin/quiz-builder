import { routes } from "@/shared/config";
import { Button } from "@mantine/core";
import { useTranslations } from "next-intl";
import Link from "next/link";

type NavLinksProps = {
  pathname: string;
  onClick?: () => void;
};

export function NavLinks({ pathname, onClick }: NavLinksProps) {
  const t = useTranslations("widgets.header");
  return (
    <>
      <Button
        variant="subtle"
        component={Link}
        href={routes.QUIZZES}
        opacity={pathname === routes.QUIZZES ? 1 : 0.6}
        onClick={onClick}
      >
        {t("navigation.quizzes")}
      </Button>

      <Button
        variant="subtle"
        component={Link}
        href={routes.RESULTS}
        opacity={pathname === routes.RESULTS ? 1 : 0.6}
        onClick={onClick}
      >
        {t("navigation.results")}
      </Button>
    </>
  );
}
