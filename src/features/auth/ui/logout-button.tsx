"use client";

import { useState, useTransition, useRef } from "react";
import { Button, ActionIcon, Modal, Group, Loader, Text } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("features.auth.ui.logout");

  const [modalOpened, setModalOpened] = useState(false);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const onLogout = () => {
    if (!formRef.current) return;

    startTransition(() => {
      formRef.current?.requestSubmit();
    });
  };

  return (
    <>
      {withLabel ? (
        <Button
          size={size}
          variant={variant}
          onClick={() => setModalOpened(true)}
        >
          {t("button.label")}
        </Button>
      ) : (
        <ActionIcon
          size={size}
          variant={variant}
          aria-label={t("button.aria")}
          onClick={() => setModalOpened(true)}
        >
          <IconLogout size={18} />
        </ActionIcon>
      )}

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={t("modal.title")}
        centered
      >
        <Text>{t("modal.description")}</Text>

        <Group justify="center" mt="md">
          <Button variant="default" onClick={() => setModalOpened(false)}>
            {t("modal.actions.cancel")}
          </Button>

          <form ref={formRef} action={logout}>
            <Button
              type="button"
              color="red"
              onClick={onLogout}
              disabled={isPending}
              leftSection={isPending ? <Loader size="xs" /> : null}
            >
              {t("modal.actions.confirm")}
            </Button>
          </form>
        </Group>
      </Modal>
    </>
  );
}
