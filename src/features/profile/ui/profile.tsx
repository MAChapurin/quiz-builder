import { ActionIcon } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";

export function Profile({ name }: { name: string }) {
  return (
    <ActionIcon variant="default" size="lg">
      {name ? name[0] : <IconUserCircle />}
    </ActionIcon>
  );
}
