"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Modal, Text, Group, Button, Box } from "@mantine/core";

import { QuestionEntity } from "@/entities/question/domain";
import { useActionState } from "@/shared/hooks";
import { emitter } from "@/shared/lib";

import {
  deleteQuestionAction,
  DeleteQuestionFormState,
} from "../actions/delete-question";

export function DeleteQuestionModal({
  questions,
}: {
  questions: QuestionEntity[];
}) {
  const [opened, setOpened] = useState(false);
  const [questionId, setQuestionId] = useState<string | null>(null);
  const [questionText, setQuestionText] = useState("");

  const router = useRouter();

  const [formState, action, isPending] = useActionState(
    deleteQuestionAction,
    {} as DeleteQuestionFormState,
    undefined,
    {
      success: "Вопрос успешно удалён",
      error: "Не удалось удалить вопрос",
    },
  );

  useEffect(() => {
    return emitter.subscribe("delete-question-click", ({ id }) => {
      const found = questions.find((q) => q.id === id);
      if (!found) return;

      setQuestionId(id);
      setQuestionText(found.text);
      setOpened(true);
    });
  }, [questions]);

  useEffect(() => {
    if (formState.success && !isPending) {
      setOpened(false);
      setQuestionId(null);
      setQuestionText("");
      router.refresh();
    }
  }, [formState.success, isPending, router]);

  if (!questionId) return null;

  const shortText =
    questionText.length > 80 ? questionText.slice(0, 80) + "…" : questionText;

  return (
    <Modal
      centered
      opened={opened}
      onClose={() => {
        setOpened(false);
        setQuestionId(null);
        setQuestionText("");
      }}
      title="Удалить вопрос"
    >
      <Box pos="relative">
        <form action={action}>
          <input type="hidden" name="id" value={questionId} />

          <Text>Вы уверены, что хотите удалить этот вопрос?</Text>

          <Text mt="sm" fw={500} c="red">
            “{shortText}”
          </Text>

          {formState.errors?._errors && (
            <Text c="red" mt="sm">
              {formState.errors._errors}
            </Text>
          )}

          <Group mt="lg" justify="flex-end">
            <Button
              variant="default"
              onClick={() => setOpened(false)}
              disabled={isPending}
            >
              Отмена
            </Button>
            <Button
              color="red"
              type="submit"
              loading={isPending}
              disabled={isPending}
            >
              Удалить
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
}
