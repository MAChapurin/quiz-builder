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
import { useTranslations } from "next-intl";

export function DeleteQuestionModal({
  questions,
}: {
  questions: QuestionEntity[];
}) {
  const t = useTranslations("features.question-crud.ui.delete");
  const [opened, setOpened] = useState(false);
  const [questionId, setQuestionId] = useState<string | null>(null);
  const [questionText, setQuestionText] = useState("");

  const router = useRouter();

  const [formState, action, isPending] = useActionState(
    deleteQuestionAction,
    {} as DeleteQuestionFormState,
    undefined,
    {
      success: t("toasts.success"),
      error: t("toasts.error"),
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
      title={t("title")}
    >
      <Box pos="relative">
        <form action={action}>
          <input type="hidden" name="id" value={questionId} />

          <Text>{t("description")}</Text>

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
              {t("actions.cancel")}
            </Button>
            <Button
              color="red"
              type="submit"
              loading={isPending}
              disabled={isPending}
            >
              {t("actions.confirm")}
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
}
