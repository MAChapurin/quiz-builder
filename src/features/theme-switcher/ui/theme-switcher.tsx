"use client";

import { SegmentedControl } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useMantineColorScheme } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { setCookie } from "@/shared/lib";
import { COOKIE_KEYS } from "@/shared/config";

type Scheme = "light" | "dark";

const ANIMATION_MS = 150;

export function ColorSchemesSwitcher() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const [value, setValue] = useState<Scheme>(
    colorScheme === "dark" ? "dark" : "light",
  );

  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleChange = (next: string) => {
    const scheme = next as Scheme;
    setValue(scheme);
    setCookie(COOKIE_KEYS.THEME, scheme, 365);
    timeoutRef.current = window.setTimeout(() => {
      setColorScheme(scheme);
    }, ANIMATION_MS);
  };

  return (
    <SegmentedControl
      value={value}
      onChange={handleChange}
      transitionDuration={ANIMATION_MS}
      p={0}
      size="md"
      className="border-[var(--mantine-color-default-border)] border-1"
      styles={{
        label: {
          background: "bg-[var(--mantine-color-default)]",
        },
      }}
      data={[
        { value: "light", label: <IconSun size={24} /> },
        { value: "dark", label: <IconMoon size={24} /> },
      ]}
    />
  );
}
