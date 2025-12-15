"use client";

import { useState, useTransition, useRef } from "react";
import { Button, ActionIcon, Modal, Group, Loader, Text } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { logout } from "../actions/logout";

type Props = {
  withLabel?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "subtle" | "light";
};

export function LogOutButton({
  withLabel = false,
  size = "lg",
  variant = "default",
}: Props) {
  const [modalOpened, setModalOpened] = useState(false);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const onLogout = () => {
    if (!formRef.current) return;

    startTransition(() => {
      formRef.current?.requestSubmit();
    });
  };
  const onOpen = () => setModalOpened(true);
  const onClose = () => setModalOpened(false);

  return (
    <>
      {withLabel ? (
        <Button
          size={size}
          variant={variant}
          leftSection={<IconLogout size={16} />}
          onClick={onOpen}
        >
          Выйти
        </Button>
      ) : (
        <ActionIcon
          size={size}
          variant={variant}
          aria-label="Выйти"
          onClick={onOpen}
        >
          <IconLogout size={18} />
        </ActionIcon>
      )}

      <Modal
        opened={modalOpened}
        onClose={onClose}
        title="Подтвердите выход"
        centered
      >
        <Text>Вы уверены, что хотите выйти?</Text>
        <Group justify={"center"} mt="md">
          <Button variant="default" onClick={onClose}>
            Отмена
          </Button>

          <form ref={formRef} action={logout}>
            <Button
              type="button"
              color="red"
              onClick={onLogout}
              disabled={isPending}
              leftSection={isPending ? <Loader size="xs" /> : null}
            >
              Выйти
            </Button>
          </form>
        </Group>
      </Modal>
    </>
  );
}
