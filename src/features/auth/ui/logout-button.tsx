import { Button } from "@mantine/core";
import { logout } from "../actions/logout";
import { IconLogout } from "@tabler/icons-react";

export const LogOutButton = () => {
  return (
    <form action={logout}>
      <Button rightSection={<IconLogout />} type="submit">
        Выйти
      </Button>
    </form>
  );
};
