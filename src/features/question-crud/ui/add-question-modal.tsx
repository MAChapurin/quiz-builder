"use client";

import { useState, useEffect, startTransition } from "react";
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
import { useActionState } from "@/shared/lib/react";
import {
  createQuestionAction,
  CreateQuestionFormState,
} from "../actions/create-question";
import { useRouter } from "next/navigation";
import { IconPlus } from "@tabler/icons-react";
import { emitter } from "@/shared/lib";

type OptionInput = { text: string; isCorrect: boolean };

export function AddQuestionModal({
  scrollToRef,
}: {
  scrollToRef?: React.RefObject<HTMLDivElement>;
}) {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [quizId, setQuizId] = useState<string | null>(null);
  const [type, setType] = useState<"SINGLE" | "MULTIPLE">("SINGLE");
  const [options, setOptions] = useState<OptionInput[]>([
    { text: "", isCorrect: false },
  ]);
  const [text, setText] = useState("");

  const [formState, action, isPending] = useActionState(
    createQuestionAction,
    {} as CreateQuestionFormState,
    undefined,
    { success: "Вопрос успешно создан!" },
  );

  useEffect(() => {
    const unsubscribe = emitter.subscribe("add-question-click", ({ id }) => {
      setQuizId(id);
      setOpened(true);
    });
    return unsubscribe;
  }, []);

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
      setQuizId(null);
      setOptions([{ text: "", isCorrect: false }]);
      setText("");
      setType("SINGLE");
      startTransition(() => {
        router.refresh();
      });
      setTimeout(
        () => scrollToRef?.current?.scrollIntoView({ behavior: "smooth" }),
        100,
      );
    }
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
            onChange={(val) => setType(val as "SINGLE" | "MULTIPLE")}
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
                {type === "SINGLE" ? (
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
            Создать вопрос
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
