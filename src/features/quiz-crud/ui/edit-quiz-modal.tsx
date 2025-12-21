"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { Modal, Stack, TextInput, Textarea, Button } from "@mantine/core";

import { QuizEntity } from "@/entities/quiz/domain";
import { useActionState } from "@/shared/hooks";
import { emitter } from "@/shared/lib";

import { editQuizAction, EditQuizFormState } from "../actions/edit-quiz";

export function EditQuizModal({ quizzes }: { quizzes: QuizEntity[] }) {
  const t = useTranslations("features.quiz-crud.ui.edit");

  const [opened, setOpened] = useState(false);
  const [quiz, setQuiz] = useState<QuizEntity | null>(null);

  const router = useRouter();

  const [formState, action, isPending] = useActionState(
    editQuizAction,
    {} as EditQuizFormState,
    undefined,
    {
      success: t("toasts.success"),
      error: t("toasts.error"),
    },
  );

  useEffect(() => {
    return emitter.subscribe("quiz-edit-click", ({ id }) => {
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
      key={quiz.id}
      opened={opened}
      onClose={() => {
        setOpened(false);
        setQuiz(null);
      }}
      title={t("title")}
    >
      <form action={action}>
        <input type="hidden" name="id" value={quiz.id} />

        <Stack>
          <TextInput
            label={t("fields.title.label")}
            name="title"
            required
            defaultValue={quiz.title}
            error={formState.errors?.title}
          />

          <Textarea
            rows={4}
            label={t("fields.description.label")}
            name="description"
            required
            defaultValue={quiz.description}
            error={formState.errors?.description}
          />

          <Button type="submit" loading={isPending}>
            {t("actions.submit")}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
