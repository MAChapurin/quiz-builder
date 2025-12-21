"use client";

import { useEffect, useState } from "react";
import {
  Modal,
  Stack,
  Textarea,
  TextInput,
  Button,
  Checkbox,
  Radio,
  CloseButton,
  Group,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { IconPlus } from "@tabler/icons-react";

import { QuestionEntity, QuestionType } from "@/entities/question/domain";
import { useActionState } from "@/shared/hooks";
import { emitter } from "@/shared/lib";

import {
  editQuestionAction,
  EditQuestionFormState,
} from "../actions/edit-question";
import { useEditQuestion } from "../model/use-edit-question";

export function EditQuestionModal({
  questions,
}: {
  questions: QuestionEntity[];
}) {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [questionId, setQuestionId] = useState<string | null>(null);

  const form = useEditQuestion();

  const [formState, action, isPending] = useActionState(
    editQuestionAction,
    {} as EditQuestionFormState,
    undefined,
    { success: "Вопрос успешно изменен!" },
  );

  useEffect(() => {
    return emitter.subscribe("edit-question-click", ({ id }) => {
      const q = questions.find((q) => q.id === id);
      if (!q) return;

      setQuestionId(q.id);
      form.initFromQuestion(q);
      setOpened(true);
    });
  }, [questions]);

  useEffect(() => {
    if (formState.success && !isPending) {
      setOpened(false);
      setQuestionId(null);
      form.reset();
      router.refresh();
    }
  }, [formState.success, isPending]);

  if (!questionId) return null;

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Редактирование вопроса"
    >
      <form action={action}>
        <input type="hidden" name="id" value={questionId} />
        <input
          type="hidden"
          name="options"
          value={JSON.stringify(form.options)}
        />

        <Stack>
          <Textarea
            label="Текст вопроса"
            name="text"
            value={form.text}
            onChange={(e) => form.setText(e.target.value)}
            disabled={isPending}
          />

          <Radio.Group
            value={form.type}
            onChange={form.onTypeChange}
            name="type"
            label="Тип вопроса"
          >
            <Group mt="xs">
              <Radio value={QuestionType.SINGLE} label="Один вариант" />
              <Radio
                value={QuestionType.MULTIPLE}
                label="Несколько вариантов"
              />
            </Group>
          </Radio.Group>

          <Stack gap="xs">
            {form.options.map((opt) => (
              <Group key={opt._key} gap="xs">
                <TextInput
                  value={opt.text}
                  onChange={(e) => form.onTextChange(opt._key, e.target.value)}
                  style={{ flex: 1 }}
                />

                {form.type === QuestionType.SINGLE ? (
                  <Radio
                    checked={opt.isCorrect}
                    onChange={() => form.setCorrectSingle(opt._key)}
                    label="Верный"
                  />
                ) : (
                  <Checkbox
                    checked={opt.isCorrect}
                    onChange={(e) =>
                      form.onToggleCorrectMultiple(
                        opt._key,
                        e.currentTarget.checked,
                      )
                    }
                    label="Верный"
                  />
                )}

                <CloseButton onClick={() => form.onRemoveOption(opt._key)} />
              </Group>
            ))}

            <Button
              leftSection={<IconPlus />}
              variant="subtle"
              type="button"
              onClick={form.onAddOption}
            >
              Добавить вариант
            </Button>
          </Stack>

          <Button type="submit" disabled={!form.canSubmit} loading={isPending}>
            Сохранить
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
