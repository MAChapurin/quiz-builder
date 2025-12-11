"use client";

import { useState, useEffect, startTransition } from "react";
import { Switch } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useActionState } from "@/shared/lib/react";
import { useRouter } from "next/navigation";
import { togglePublishQuizAction } from "../actions/public-quiz";

interface SwitchPublicQuizProps {
  quizId: string;
  initialValue: boolean;
  disabled?: boolean;
}

export function SwitchPublicQuiz({
  quizId,
  initialValue,
  disabled,
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

  const handleChange = (value: boolean) => {
    setChecked(value);

    const fd = new FormData();
    fd.append("quizId", quizId);
    fd.append("isPublished", String(value));

    startTransition(() => {
      action(fd);
    });
  };

  return (
    <Switch
      disabled={disabled || isPending}
      checked={checked}
      onChange={(e) => handleChange(e.currentTarget.checked)}
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
