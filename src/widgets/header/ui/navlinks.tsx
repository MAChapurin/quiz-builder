import { routes } from "@/shared/config";
import { Button } from "@mantine/core";
import Link from "next/link";

type NavLinksProps = {
  pathname: string;
  onClick?: () => void;
};

export function NavLinks({ pathname, onClick }: NavLinksProps) {
  return (
    <>
      <Button
        variant="subtle"
        component={Link}
        href={routes.QUIZZES}
        opacity={pathname === routes.QUIZZES ? 1 : 0.6}
        onClick={onClick}
      >
        Квизы
      </Button>

      <Button
        variant="subtle"
        component={Link}
        href={routes.RESULTS}
        opacity={pathname === routes.RESULTS ? 1 : 0.6}
        onClick={onClick}
      >
        Результаты
      </Button>
    </>
  );
}
