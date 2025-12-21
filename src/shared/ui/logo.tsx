import Link from "next/link";
import { routes } from "../config";
import { Button, Group, Title } from "@mantine/core";

export const Logo = ({ href = routes.HOME }: { href?: string }) => {
  return (
    <Button component={Link} href={href} variant="transparent" px={0}>
      <Group>
        <Title order={4}>QuizBuilder</Title>
      </Group>
    </Button>
  );
};
