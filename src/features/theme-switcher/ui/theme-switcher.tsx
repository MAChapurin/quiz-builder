"use client";

import { SegmentedControl } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useMantineColorScheme } from "@mantine/core";
import { useEffect, useState, useRef } from "react";

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
    timeoutRef.current = window.setTimeout(() => {
      setColorScheme(scheme);
    }, ANIMATION_MS);
  };

  return (
    <SegmentedControl
      withItemsBorders
      value={value}
      onChange={handleChange}
      transitionDuration={ANIMATION_MS}
      data={[
        {
          value: "light",
          label: <IconSun size={20} />,
        },
        {
          value: "dark",
          label: <IconMoon size={20} />,
        },
      ]}
    />
  );
}
