"use client";

import { useState, useEffect } from "react";
import {
  Paper,
  Group,
  Text,
  Button,
  CloseButton,
  Stack,
  Title,
  Transition,
} from "@mantine/core";
import { useCookies } from "@/shared/hooks/use-cookies";
import { COOKIE_KEYS } from "@/shared/config";

export function CookiesBanner() {
  const { get, set } = useCookies();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = get(COOKIE_KEYS.BANNER) === "true";
    if (!seen) {
      setTimeout(() => setVisible(true), 40);
    }
  }, [get]);

  function onAcceptAll() {
    set(COOKIE_KEYS.OPTIONAL, "true", 365);
    set(COOKIE_KEYS.BANNER, "true", 365);
    setVisible(false);
  }

  function onOnlyRequired() {
    set(COOKIE_KEYS.OPTIONAL, "false", 365);
    set(COOKIE_KEYS.BANNER, "true", 365);
    setVisible(false);
  }

  function onCloseTransient() {
    setVisible(false);
  }

  return (
    <Transition
      mounted={visible}
      transition="slide-up"
      duration={350}
      timingFunction="ease"
    >
      {(styles) => (
        <Paper
          aria-live="polite"
          withBorder
          shadow="md"
          radius="lg"
          p="lg"
          style={{
            ...styles,
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            width: "95%",
            maxWidth: 520,
            zIndex: 500,
            background: "var(--mantine-color-body)",
          }}
        >
          <Group align="flex-start" wrap="nowrap">
            <Stack gap={4} style={{ flex: 1 }}>
              <Title order={5}>Мы используем cookies</Title>

              <Text c="dimmed" size="sm">
                Мы&nbsp;применяем обязательные cookies для работы аккаунта и
                безопасности. Опциональные cookies улучшают интерфейс и
                сохраняют настройки. Выберите подходящий вам вариант.
              </Text>

              <Group mt="md">
                <Button variant="default" size="xs" onClick={onOnlyRequired}>
                  Только обязательные
                </Button>
                <Button variant="filled" size="xs" onClick={onAcceptAll}>
                  Разрешить всё
                </Button>
              </Group>
            </Stack>

            <CloseButton
              aria-label="Закрыть"
              onClick={onCloseTransient}
              size="sm"
            />
          </Group>
        </Paper>
      )}
    </Transition>
  );
}
