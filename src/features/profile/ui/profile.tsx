import { routes } from "@/shared/config";
import { ActionIcon } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";
import Link from "next/link";

export function Profile({ name }: { name: string }) {
  return (
    <ActionIcon
      variant="default"
      size="lg"
      component={Link}
      href={routes.PROFILE}
    >
      {name ? name[0] : <IconUserCircle />}
    </ActionIcon>
  );
}
