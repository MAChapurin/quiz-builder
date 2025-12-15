"use client";
import { Button } from "@mantine/core";
import { emitter } from "@/shared/lib";

export function AttemptsQuizFilterResetButton() {
  const onClick = () => emitter.emit("attempt-filter-reset");
  return (
    <Button variant="light" size="sm" onClick={onClick}>
      Сбросить фильтры
    </Button>
  );
}
