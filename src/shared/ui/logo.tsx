import Link from "next/link";
import { routes } from "../config";
import { Group, Title } from "@mantine/core";
import { IconPuzzle } from "@tabler/icons-react";

export const Logo = ({ href = routes.HOME }: { href?: string }) => {
  return (
    <Link href={href}>
      <Group>
        <IconPuzzle size={28} />
        <Title order={4}>QuizBuilder</Title>
      </Group>
    </Link>
  );
};
