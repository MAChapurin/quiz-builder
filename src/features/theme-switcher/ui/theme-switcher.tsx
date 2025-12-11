"use client";

import { useEffect, useState } from "react";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";

export function ColorSchemesSwitcher() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = () =>
    setColorScheme(colorScheme === "light" ? "dark" : "light");

  const icon =
    colorScheme === "light" ? <IconMoon size={20} /> : <IconSun size={20} />;
  const placeholder = <div style={{ width: 20, height: 20 }} />;

  return (
    <ActionIcon
      variant="default"
      size="lg"
      onClick={mounted ? toggle : undefined}
      aria-label="Toggle theme"
    >
      {mounted ? icon : placeholder}
    </ActionIcon>
  );
}
