"use client";

import { useEffect, useState } from "react";
import { Modal, Stack, TextInput, Textarea, Button } from "@mantine/core";
import { useActionState } from "@/shared/lib/react";
import { editQuizAction, EditQuizFormState } from "../actions/edit-quiz";
import { emitter } from "@/shared/lib";
import { QuizEntity } from "@/entities/quiz/domain";
import { useRouter } from "next/navigation";

export function EditQuizModal({ quizzes }: { quizzes: QuizEntity[] }) {
  const [opened, setOpened] = useState(false);
  const [quiz, setQuiz] = useState<QuizEntity | null>(null);

  const router = useRouter();

  const [formState, action, isPending] = useActionState(
    editQuizAction,
    {} as EditQuizFormState,
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
      key={quiz.id}
      opened={opened}
      onClose={() => {
        setOpened(false);
        setQuiz(null);
      }}
      title="Редактирование квиза"
    >
      <form action={action}>
        <input type="hidden" name="id" value={quiz.id} />
        <Stack>
          <TextInput
            label="Название квиза"
            name="title"
            required
            defaultValue={quiz.title}
            error={formState.errors?.title}
          />
          <Textarea
            rows={4}
            label="Описание"
            name="description"
            required
            defaultValue={quiz.description}
            error={formState.errors?.description}
          />
          <Button type="submit" loading={isPending}>
            Сохранить
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
