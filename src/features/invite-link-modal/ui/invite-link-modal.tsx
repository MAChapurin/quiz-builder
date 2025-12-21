"use client";

import { useEffect, useState } from "react";
import { Modal, Stack, TextInput, Button, ActionIcon } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCopy } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

import { QuizEntity } from "@/entities/quiz/domain";
import { useActionState } from "@/shared/hooks";
import { emitter } from "@/shared/lib";

import {
  createInviteTokenAction,
  CreateInviteTokenFormState,
} from "../actions/create-invite-token";

type GenerateInviteModalProps = {
  quizzes: QuizEntity[];
};

export function GenerateInviteModal({ quizzes }: GenerateInviteModalProps) {
  const tUi = useTranslations("features.invite.ui.create");
  const tActions = useTranslations("features.invite.actions.create");

  const [opened, setOpened] = useState(false);
  const [quiz, setQuiz] = useState<QuizEntity | null>(null);
  const [label, setLabel] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  const [formState, action, isPending] = useActionState(
    createInviteTokenAction,
    {} as CreateInviteTokenFormState,
    undefined,
    { success: tActions("toasts.success") },
  );

  useEffect(() => {
    return emitter.subscribe("invite-token-click", ({ id }) => {
      const found = quizzes.find((q) => q.id === id);
      if (!found) return;

      setQuiz(found);
      setOpened(true);
      setLabel("");
      setGeneratedLink("");
    });
  }, [quizzes]);

  useEffect(() => {
    if (formState.token) {
      setGeneratedLink(`${window.location.origin}/quiz/${formState.token}`);
    }
  }, [formState.token]);

  const onCopy = async () => {
    await navigator.clipboard.writeText(generatedLink);
    notifications.show({
      title: tActions("toasts.copyTitle"),
      message: tActions("toasts.copyMessage"),
      color: "green",
    });
  };

  if (!quiz) return null;

  return (
    <Modal
      centered
      opened={opened}
      onClose={() => setOpened(false)}
      title={tUi("modal.title", { title: quiz.title })}
    >
      <form action={action}>
        <Stack>
          {!generatedLink ? (
            <>
              <TextInput
                required
                name="label"
                label={tUi("fields.label.label")}
                placeholder={tUi("fields.label.placeholder")}
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />

              <input type="hidden" name="quizId" value={quiz.id} />

              <Button type="submit" loading={isPending} disabled={!label}>
                {tUi("buttons.submit")}
              </Button>
            </>
          ) : (
            <TextInput
              readOnly
              value={generatedLink}
              label={
                label
                  ? tUi("fields.result.labelWithName", { label })
                  : tUi("fields.result.label")
              }
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
