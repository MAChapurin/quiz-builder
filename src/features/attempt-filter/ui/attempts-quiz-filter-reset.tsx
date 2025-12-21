"use client";
import { Button } from "@mantine/core";
import { emitter } from "@/shared/lib";
import { useTranslations } from "next-intl";

export function AttemptsQuizFilterResetButton() {
  const t = useTranslations("features.attemptFilter");
  const onClick = () => emitter.emit("attempt-filter-reset");
  return (
    <Button variant="light" size="sm" onClick={onClick}>
      {t("resetFilterButton")}
    </Button>
  );
}
