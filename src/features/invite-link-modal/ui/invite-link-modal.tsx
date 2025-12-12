"use client";

import { useEffect, useState } from "react";
import { Modal, Stack, TextInput, Button, ActionIcon } from "@mantine/core";
import { IconCopy } from "@tabler/icons-react";
import { useActionState } from "@/shared/lib/react";
import { emitter } from "@/shared/lib";
import { QuizEntity } from "@/entities/quiz/domain";
import { notifications } from "@mantine/notifications";
import {
  createInviteTokenAction,
  CreateInviteTokenFormState,
} from "../actions/create-invite-token";

type GenerateInviteModalProps = {
  quizzes: QuizEntity[];
};

export function GenerateInviteModal({ quizzes }: GenerateInviteModalProps) {
  const [opened, setOpened] = useState(false);
  const [quiz, setQuiz] = useState<QuizEntity | null>(null);
  const [label, setLabel] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  const [formState, action, isPending] = useActionState(
    createInviteTokenAction,
    {} as CreateInviteTokenFormState,
    undefined,
    { success: "Ссылка создана!" },
  );

  useEffect(() => {
    if (opened) {
      setLabel("");
      setGeneratedLink("");
    }
  }, [opened]);

  useEffect(() => {
    return emitter.subscribe("invite-token-click", ({ id }) => {
      const found = quizzes.find((q) => q.id === id);
      if (!found) return;

      setQuiz(found);
      setOpened(true);
    });
  }, [quizzes]);

  useEffect(() => {
    if (formState.token) {
      const link = `${window.location.origin}/quiz/${formState.token}`;
      setGeneratedLink(link);
    }
  }, [formState.token]);

  const onCopy = () => {
    navigator.clipboard.writeText(generatedLink).then(() => {
      notifications.show({
        title: "Готово",
        message: "Скопировано",
        color: "green",
      });
    });
  };

  if (!quiz) return null;

  return (
    <Modal
      centered
      opened={opened}
      onClose={() => setOpened(false)}
      title={`Персональная ссылка для "${quiz.title}"`}
    >
      <form action={action}>
        <Stack>
          {!generatedLink ? (
            <>
              <TextInput
                label="Для кого эта ссылка? (необязательно)"
                placeholder="Например: Для Ивана"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                name="label"
              />

              <input type="hidden" name="quizId" value={quiz.id} />

              <Button type="submit" loading={isPending}>
                Создать ссылку
              </Button>
            </>
          ) : (
            <TextInput
              label={label ? `Ссылка для ${label}` : "Персональная ссылка"}
              value={generatedLink}
              readOnly
              rightSection={
                <ActionIcon variant="default" onClick={onCopy}>
                  <IconCopy size={16} />
                </ActionIcon>
              }
            />
          )}
        </Stack>
      </form>
    </Modal>
  );
}
