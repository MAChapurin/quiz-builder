"use client";

import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Button,
  Text,
  Group,
  Center,
  Stack,
  Title,
  ThemeIcon,
} from "@mantine/core";
import Link from "next/link";
import { routes } from "@/shared/config";
import { IconLock, IconUserPlus, IconLogin } from "@tabler/icons-react";

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
      <Modal opened={opened} title={null} onClose={close} centered radius="md">
        <Center>
          <Stack align="center" maw={420} gap="md">
            <ThemeIcon size="xl" radius="xl" variant="light">
              <IconLock size={22} />
            </ThemeIcon>

            <Title order={3} ta="center">
              Создание тестов доступно после входа
            </Title>

            <Text fz="sm" c="dimmed" ta="center">
              Зарегистрируйтесь или войдите в аккаунт, чтобы создавать квизы,
              делиться ими по ссылке и отслеживать результаты.
            </Text>

            <Group grow w="100%">
              <Button
                component={Link}
                href={routes.LOGIN}
                variant="outline"
                leftSection={<IconLogin size={16} />}
              >
                Войти
              </Button>

              <Button
                component={Link}
                href={routes.REGISTER}
                leftSection={<IconUserPlus size={16} />}
              >
                Регистрация
              </Button>
            </Group>

            <Text fz="xs" c="dimmed" ta="center">
              Это бесплатно и займёт меньше минуты
            </Text>
          </Stack>
        </Center>
      </Modal>

      <Button variant={variant} onClick={open}>
        {btnText}
      </Button>
    </>
  );
}
