"use client";

import { useState, useEffect, startTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { Modal, Stack, TextInput, Button, Textarea } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

import { useActionState } from "@/shared/hooks";
import { createQuizAction, CreateQuizFormState } from "../actions/create-quiz";

export function CreateQuizButton() {
  const t = useTranslations("features.quiz-crud.ui.create");
  const router = useRouter();

  const [opened, setOpened] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [formState, action, isPending] = useActionState(
    createQuizAction,
    {} as CreateQuizFormState,
    undefined,
    {
      success: t("toasts.success"),
    },
  );

  useEffect(() => {
    if (formState.success && !isPending) {
      setTitle("");
      setDescription("");
      setOpened(false);

      startTransition(() => {
        router.refresh();
      });
    }
  }, [formState.success, isPending, router]);

  return (
    <>
      <Button
        variant="default"
        rightSection={<IconPlus />}
        onClick={() => setOpened(true)}
      >
        {t("button")}
      </Button>

      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title={t("title")}
      >
        <form action={action}>
          <Stack>
            <TextInput
              label={t("fields.title.label")}
              placeholder={t("fields.title.placeholder")}
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={formState.errors?.title}
              required
            />

            <Textarea
              rows={4}
              label={t("fields.description.label")}
              placeholder={t("fields.description.placeholder")}
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              error={formState.errors?.description}
              required
            />

            <Button variant="default" type="submit" loading={isPending}>
              {t("actions.submit")}
            </Button>
          </Stack>
        </form>
      </Modal>
    </>
  );
}
