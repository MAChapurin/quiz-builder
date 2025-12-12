import Link from "next/link";
import { routes } from "../config";
import { Button, Group, Title } from "@mantine/core";
import { IconPuzzle } from "@tabler/icons-react";

export const Logo = ({ href = routes.HOME }: { href?: string }) => {
  return (
    <Button component={Link} href={href} variant="transparent" px={0}>
      <Group>
        <IconPuzzle size={28} />
        <Title order={4}>QuizBuilder</Title>
      </Group>
    </Button>
  );
};
