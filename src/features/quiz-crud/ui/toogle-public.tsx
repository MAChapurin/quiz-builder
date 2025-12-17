"use client";

import { useState, useEffect, startTransition } from "react";
import { Switch, Button } from "@mantine/core";
import { IconCheck, IconX, IconWorld, IconEyeOff } from "@tabler/icons-react";
import { useActionState } from "@/shared/lib/react";
import { useRouter } from "next/navigation";
import { togglePublishQuizAction } from "../actions/public-quiz";

interface SwitchPublicQuizProps {
  quizId: string;
  initialValue: boolean;
  disabled?: boolean;
  variant?: "switch" | "button";
}

export function SwitchPublicQuiz({
  quizId,
  initialValue,
  disabled,
  variant = "switch",
}: SwitchPublicQuizProps) {
  const [checked, setChecked] = useState(initialValue);
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    togglePublishQuizAction,
    {},
    undefined,
    { success: "Статус публикации обновлен" },
  );

  useEffect(() => {
    if (state.errors?._errors) {
      setChecked(initialValue);
    } else if (state.success) {
      startTransition(() => router.refresh());
    }
  }, [state, initialValue, router]);

  const submit = (value: boolean) => {
    setChecked(value);

    const fd = new FormData();
    fd.append("quizId", quizId);
    fd.append("isPublished", String(value));

    startTransition(() => {
      action(fd);
    });
  };

  if (variant === "switch") {
    return (
      <Switch
        disabled={disabled || isPending}
        checked={checked}
        onChange={(e) => submit(e.currentTarget.checked)}
        variant="default"
        size="md"
        color="gray"
        thumbIcon={
          checked ? (
            <IconCheck size={12} stroke={3} />
          ) : (
            <IconX size={12} stroke={3} />
          )
        }
      />
    );
  }

  return (
    <Button
      justify="space-between"
      disabled={disabled || isPending}
      loading={isPending}
      color={checked ? "red" : "green"}
      variant="light"
      onClick={() => submit(!checked)}
      leftSection={checked ? <IconEyeOff size={16} /> : <IconWorld size={16} />}
    >
      {checked ? "Снять с публикации" : "Опубликовать"}
    </Button>
  );
}
