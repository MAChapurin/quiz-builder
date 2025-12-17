"use client";

import { useEffect, useState, startTransition } from "react";
import {
  Modal,
  Stack,
  Textarea,
  Button,
  Checkbox,
  Group,
  Radio,
  CloseButton,
  TextInput,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import { useActionState } from "@/shared/lib/react";
import {
  createQuestionAction,
  CreateQuestionFormState,
} from "../actions/create-question";
import { emitter } from "@/shared/lib";
import { useCreateQuestion } from "../model/use-create-question";

export function AddQuestionModal({
  scrollToRef,
}: {
  scrollToRef?: React.RefObject<HTMLDivElement>;
}) {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [quizId, setQuizId] = useState<string | null>(null);

  const form = useCreateQuestion();

  const [formState, action, isPending] = useActionState(
    createQuestionAction,
    {} as CreateQuestionFormState,
    undefined,
    { success: "Вопрос успешно создан!" },
  );

  useEffect(() => {
    return emitter.subscribe("add-question-click", ({ id }) => {
      setQuizId(id);
      setOpened(true);
    });
  }, []);

  useEffect(() => {
    if (!formState.success || isPending) return;

    setOpened(false);
    setQuizId(null);
    form.reset();

    startTransition(() => router.refresh());

    setTimeout(
      () => scrollToRef?.current?.scrollIntoView({ behavior: "smooth" }),
      100,
    );
  }, [formState.success, isPending]);

  if (!quizId) return null;

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Добавить новый вопрос"
    >
      <form action={action}>
        <input type="hidden" name="quizId" value={quizId} />
        <input
          type="hidden"
          name="options"
          value={JSON.stringify(form.options)}
        />

        <Stack>
          <Textarea
            label="Текст вопроса"
            name="text"
            required
            value={form.text}
            onChange={(e) => form.setText(e.target.value)}
            error={formState.errors?.text}
            disabled={isPending}
          />

          <Radio.Group
            value={form.type}
            onChange={form.onTypeChange}
            label="Тип вопроса"
            name="type"
          >
            <Group mt="xs">
              <Radio value="SINGLE" label="Один вариант" disabled={isPending} />
              <Radio
                value="MULTIPLE"
                label="Несколько вариантов"
                disabled={isPending}
              />
            </Group>
          </Radio.Group>

          <Stack gap="xs">
            {form.options.map((opt, idx) => (
              <Group key={idx} gap="xs">
                <TextInput
                  ref={(el) => void (form.optionInputRefs.current[idx] = el)}
                  value={opt.text}
                  onChange={(e) => form.onTextChange(idx, e.target.value)}
                  disabled={isPending}
                  style={{ flex: 1 }}
                />

                {form.type === "SINGLE" ? (
                  <Radio
                    checked={opt.isCorrect}
                    onChange={() => form.setCorrectSingle(idx)}
                  />
                ) : (
                  <Checkbox
                    checked={opt.isCorrect}
                    onChange={(e) =>
                      form.onToggleCorrectMultiple(idx, e.currentTarget.checked)
                    }
                  />
                )}

                <CloseButton
                  onClick={() => form.onRemoveOption(idx)}
                  disabled={isPending || form.options.length <= 2}
                />
              </Group>
            ))}

            <Button
              type="button"
              variant="subtle"
              leftSection={<IconPlus />}
              onClick={form.onAddOption}
              disabled={isPending}
            >
              Добавить вариант
            </Button>
          </Stack>

          <Button type="submit" loading={isPending} disabled={!form.canSubmit}>
            Создать вопрос
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
