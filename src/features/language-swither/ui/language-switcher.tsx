"use client";

import { startTransition } from "react";
import { SegmentedControl, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

import { setCookie } from "@/shared/lib";
import { COOKIE_KEYS } from "@/shared/config";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  const onChange = (value: string) => {
    if (value === locale) return;
    setCookie(COOKIE_KEYS.LOCALE, value, 365);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <SegmentedControl
      styles={{
        label: {
          background: "bg-[var(--mantine-color-default)]",
        },
      }}
      p={0}
      size="md"
      className="border-[var(--mantine-color-default-border)] border-1"
      value={locale}
      onChange={onChange}
      data={[
        {
          value: "ru",
          label: <Text size="md">RU</Text>,
        },
        {
          value: "en",
          label: <Text size="md">EN</Text>,
        },
      ]}
    />
  );
}
