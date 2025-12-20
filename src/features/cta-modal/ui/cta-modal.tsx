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
import { useTranslations } from "next-intl";

interface CTAModalProps {
  buttonText: string;
  variant?: "default" | "outline" | "filled";
  modalKey?: string;
}

export function CTAModal({
  buttonText,
  variant = "default",
  modalKey = "main",
}: CTAModalProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const t = useTranslations(`features.ctaModal.modals.${modalKey}`);

  return (
    <>
      <Modal opened={opened} title={null} onClose={close} centered radius="md">
        <Center>
          <Stack align="center" maw={420} gap="md">
            <ThemeIcon size="xl" radius="xl" variant="light">
              <IconLock size={22} />
            </ThemeIcon>

            <Title order={3} ta="center">
              {t("modal.title")}
            </Title>

            <Text fz="sm" c="dimmed" ta="center">
              {t("modal.description")}
            </Text>

            <Group grow w="100%">
              <Button
                component={Link}
                href={routes.LOGIN}
                variant="outline"
                leftSection={<IconLogin size={16} />}
              >
                {t("modal.actions.login")}
              </Button>

              <Button
                component={Link}
                href={routes.REGISTER}
                leftSection={<IconUserPlus size={16} />}
              >
                {t("modal.actions.register")}
              </Button>
            </Group>

            <Text fz="xs" c="dimmed" ta="center">
              {t("modal.footerNote")}
            </Text>
          </Stack>
        </Center>
      </Modal>

      <Button variant={variant} onClick={open}>
        {buttonText}
      </Button>
    </>
  );
}
