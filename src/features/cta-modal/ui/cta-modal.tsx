"use client";

import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Text, Group, Center, Stack } from "@mantine/core";
import Link from "next/link";
import { routes } from "@/shared/config";

interface CTAModalProps {
  btnText?: string;
  variant?: "default" | "outline" | "filled";
}

export function CTAModal({
  btnText = "Создать тест",
  variant = "default",
}: CTAModalProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        title={"Нужна авторизация"}
        onClose={close}
        centered
        styles={{
          title: { fontWeight: 700 },
        }}
      >
        <Center>
          <Stack align="center" maw={700}>
            <Text fz="lg" c="dimmed" ta="center">
              Чтобы создать свой квиз вам нужно зарегистрироваться, либо войти в
              аккаунт, если он у вас есть
            </Text>
            <Group my={"auto"}>
              <Button component={Link} href={routes.LOGIN} variant="outline">
                Войти
              </Button>
              <Button component={Link} href={routes.REGISTER}>
                Регистрация
              </Button>
            </Group>
          </Stack>
        </Center>
      </Modal>

      <Button variant={variant} onClick={open}>
        {btnText}
      </Button>
    </>
  );
}
