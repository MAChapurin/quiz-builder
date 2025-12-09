"use client";

import { useState, useEffect } from "react";
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
import { useActionState } from "@/shared/lib/react";
import { emitter } from "@/shared/lib";
import {
  editQuestionAction,
  EditQuestionFormState,
} from "../actions/edit-question";
import { QuestionEntity, QuestionType } from "@/entities/question/domain";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

type OptionInput = { id?: string; text: string; isCorrect: boolean };

export function EditQuestionModal({
  questions,
}: {
  questions: QuestionEntity[];
}) {
  const router = useRouter();

  const [opened, setOpened] = useState(false);
  const [questionId, setQuestionId] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [type, setType] = useState<QuestionType>(QuestionType.SINGLE);
  const [options, setOptions] = useState<OptionInput[]>([]);

  const [formState, action, isPending] = useActionState(
    editQuestionAction,
    {} as EditQuestionFormState,
    undefined,
    {
      success: "Вопрос успешно изменен",
      error: "Не удалось отредактировать вопрос",
    },
  );

  useEffect(() => {
    return emitter.subscribe("edit-question-click", ({ id }) => {
      const found = questions.find((q) => q.id === id);
      if (!found) return;
      setQuestionId(found.id);
      setText(found.text);
      setType(found.type);
      setOptions(found.options.map((o) => ({ ...o })));
      setOpened(true);
    });
  }, [questions]);

  const addOption = () =>
    setOptions([...options, { text: "", isCorrect: false }]);
  const removeOption = (index: number) =>
    setOptions(options.filter((_, i) => i !== index));
  const handleTextChange = (index: number, value: string) =>
    setOptions((prev) =>
      prev.map((opt, i) => (i === index ? { ...opt, text: value } : opt)),
    );
  const setCorrectSingle = (index: number) =>
    setOptions((prev) =>
      prev.map((opt, i) => ({ ...opt, isCorrect: i === index })),
    );
  const toggleCorrectMultiple = (index: number, checked: boolean) =>
    setOptions((prev) =>
      prev.map((opt, i) =>
        i === index ? { ...opt, isCorrect: checked } : opt,
      ),
    );

  const hasAtLeastOneOption = options.some((opt) => opt.text.trim() !== "");
  const hasAtLeastOneCorrect = options.some((opt) => opt.isCorrect);
  const canSubmit = hasAtLeastOneOption && hasAtLeastOneCorrect;

  useEffect(() => {
    if (formState.success && !isPending) {
      setOpened(false);
      setQuestionId(null);
      setText("");
      setType(QuestionType.SINGLE);
      setOptions([]);
      router.refresh();
    }
  }, [formState.success, isPending, router]);

  if (!questionId) return null;

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Редактирование вопроса"
    >
      <form action={action}>
        <input type="hidden" name="id" value={questionId} />
        <input type="hidden" name="options" value={JSON.stringify(options)} />

        <Stack>
          <Textarea
            label="Текст вопроса"
            name="text"
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
            error={formState.errors?.text}
            disabled={isPending}
          />

          <Radio.Group
            value={type}
            onChange={(val) => setType(val as QuestionType)}
            label="Тип вопроса"
            name="type"
          >
            <Group mt="xs">
              <Radio
                value={QuestionType.SINGLE}
                label="Один вариант"
                disabled={isPending}
              />
              <Radio
                value={QuestionType.MULTIPLE}
                label="Несколько вариантов"
                disabled={isPending}
              />
            </Group>
          </Radio.Group>

          <Stack gap="xs">
            {options.map((opt, idx) => (
              <Group key={idx} align="center" gap="xs">
                <TextInput
                  placeholder={`Вариант ${idx + 1}`}
                  value={opt.text}
                  onChange={(e) => handleTextChange(idx, e.target.value)}
                  required
                  style={{ flex: 1 }}
                  disabled={isPending}
                />
                {type === QuestionType.SINGLE ? (
                  <Radio
                    checked={opt.isCorrect}
                    onChange={() => setCorrectSingle(idx)}
                    disabled={isPending}
                    label="Верный"
                  />
                ) : (
                  <Checkbox
                    checked={opt.isCorrect}
                    onChange={(e) =>
                      toggleCorrectMultiple(idx, e.currentTarget.checked)
                    }
                    disabled={isPending}
                    label="Верный"
                  />
                )}
                <CloseButton
                  mt={4}
                  onClick={() => removeOption(idx)}
                  disabled={isPending}
                />
              </Group>
            ))}

            <Button
              leftSection={<IconPlus />}
              type="button"
              variant="subtle"
              onClick={addOption}
              disabled={isPending}
            >
              Добавить вариант
            </Button>
          </Stack>

          <Button
            type="submit"
            loading={isPending}
            disabled={isPending || !canSubmit}
          >
            Сохранить
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
