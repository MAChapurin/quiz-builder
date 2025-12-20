"use client";

import { useEffect, useState, startTransition } from "react";
import { ActionIcon } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { setCookie } from "@/shared/lib";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const nextLocale = locale === "ru" ? "en" : "ru";
    setCookie("locale", nextLocale, 365);
    startTransition(() => {
      router.refresh();
    });
  };

  const icon =
    locale === "ru" ? (
      <span style={{ fontSize: 18 }}>🇷🇺</span>
    ) : (
      <span style={{ fontSize: 18 }}>🇬🇧</span>
    );

  return (
    <ActionIcon
      variant="default"
      size="lg"
      onClick={mounted ? toggleLanguage : undefined}
      aria-label="Toggle language"
    >
      {mounted ? icon : <div style={{ width: 20, height: 20 }} />}
    </ActionIcon>
  );
}
