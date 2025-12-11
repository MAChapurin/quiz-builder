"use client";

import { useState, useEffect, startTransition } from "react";
import { Modal, Stack, TextInput, Button, Textarea } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useActionState } from "@/shared/lib/react";
import { createQuizAction, CreateQuizFormState } from "../actions/create-quiz";
import { useRouter } from "next/navigation";

export function CreateQuizButton() {
  const [opened, setOpened] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [formState, action, isPending] = useActionState(
    createQuizAction,
    {} as CreateQuizFormState,
    undefined,
    { success: "Квиз успешно создан!" },
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
        Создать квиз
      </Button>

      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="Создать новый квиз"
      >
        <form action={action}>
          <Stack>
            <TextInput
              label="Название квиза"
              name="title"
              placeholder="Введите название"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={formState.errors?.title}
              required
            />

            <Textarea
              rows={4}
              label="Описание"
              name="description"
              placeholder="Введите описание"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              error={formState.errors?.description}
              required
            />

            <Button variant="default" type="submit" loading={isPending}>
              Создать
            </Button>
          </Stack>
        </form>
      </Modal>
    </>
  );
}
