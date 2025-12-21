"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { Modal, Button, Text, Group } from "@mantine/core";

import { QuizEntity } from "@/entities/quiz/domain";
import { useActionState } from "@/shared/hooks";
import { emitter } from "@/shared/lib";

import { deleteQuizAction, DeleteQuizFormState } from "../actions/delete-quiz";

export function DeleteQuizModal({ quizzes }: { quizzes: QuizEntity[] }) {
  const t = useTranslations("features.quiz-crud.ui.delete");

  const [opened, setOpened] = useState(false);
  const [quiz, setQuiz] = useState<QuizEntity | null>(null);

  const router = useRouter();

  const [formState, action, isPending] = useActionState(
    deleteQuizAction,
    {} as DeleteQuizFormState,
    undefined,
    {
      success: t("toasts.success"),
      error: t("toasts.error"),
    },
  );

  useEffect(() => {
    return emitter.subscribe("quiz-deleted-click", ({ id }) => {
      const found = quizzes.find((q) => q.id === id);
      if (!found) return;

      setQuiz(found);
      setOpened(true);
    });
  }, [quizzes]);

  useEffect(() => {
    if (formState.success && !isPending) {
      setOpened(false);
      setQuiz(null);
      router.refresh();
    }
  }, [formState.success, isPending, router]);

  if (!quiz) return null;

  return (
    <Modal
      centered
      opened={opened}
      onClose={() => setOpened(false)}
      title={t("title")}
    >
      <Text mb="md">
        {t("description")} <b>&quot;{quiz.title}&quot;</b>?
      </Text>

      <form action={action}>
        <input type="hidden" name="id" value={quiz.id} />

        {formState.error && (
          <Text c="red" size="sm" mb="sm">
            {formState.error}
          </Text>
        )}

        <Group justify="flex-end">
          <Button variant="default" onClick={() => setOpened(false)}>
            {t("actions.cancel")}
          </Button>
          <Button color="red" type="submit" loading={isPending}>
            {t("actions.confirm")}
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
