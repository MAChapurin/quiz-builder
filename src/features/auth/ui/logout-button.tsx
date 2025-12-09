import { ActionIcon } from "@mantine/core";
import { logout } from "../actions/logout";
import { IconLogout } from "@tabler/icons-react";

export const LogOutButton = () => {
  return (
    <form action={logout}>
      <ActionIcon variant="outline" size="lg" type="submit" aria-label="Выйти">
        <IconLogout />
      </ActionIcon>
    </form>
  );
};
