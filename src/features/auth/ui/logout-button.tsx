import { Button } from "@mantine/core";
import { logout } from "../actions/logout";
import { IconLogout } from "@tabler/icons-react";

export const LogOutButton = () => {
  return (
    <form action={logout}>
      <Button variant={"outline"} type="submit">
        <IconLogout />
      </Button>
    </form>
  );
};
