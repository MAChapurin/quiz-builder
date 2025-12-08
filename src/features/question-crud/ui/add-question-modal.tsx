"use client";

import { useState, useEffect } from "react";
import {
  Modal,
  Stack,
  TextInput,
  Button,
  Select,
  Checkbox,
  Group,
} from "@mantine/core";
import { useActionState } from "@/shared/lib/react";
import {
  createQuestionAction,
  CreateQuestionFormState,
} from "../actions/create-question";

type OptionInput = { text: string; isCorrect: boolean };

export function AddQuestionModal({ quizId }: { quizId: string }) {
  const [opened, setOpened] = useState(false);
  const [options, setOptions] = useState<OptionInput[]>([
    { text: "", isCorrect: false },
  ]);

  const [formState, action, isPending] = useActionState(
    createQuestionAction,
    {} as CreateQuestionFormState,
  );

  const handleOptionChange = (
    index: number,
    key: keyof OptionInput,
    value: string | boolean,
  ) => {
    setOptions((prev) =>
      prev.map((opt, i) => {
        if (i !== index) return opt;
        return { ...opt, [key]: value };
      }),
    );
  };

  const addOption = () =>
    setOptions([...options, { text: "", isCorrect: false }]);
  const removeOption = (index: number) =>
    setOptions(options.filter((_, i) => i !== index));

  useEffect(() => {
    if (formState.success && !isPending) {
      setOpened(false);
      setOptions([{ text: "", isCorrect: false }]);
    }
  }, [formState.success, isPending]);

  return (
    <>
      <Button onClick={() => setOpened(true)}>Добавить вопрос</Button>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Добавить новый вопрос"
      >
        <form action={action}>
          <input type="hidden" name="quizId" value={quizId} />

          <Stack>
            <TextInput
              label="Текст вопроса"
              name="text"
              required
              defaultValue={formState.formData?.get("text") as string}
              error={formState.errors?.text}
            />

            <Select
              label="Тип вопроса"
              name="type"
              data={[
                { value: "SINGLE", label: "Один вариант" },
                { value: "MULTIPLE", label: "Несколько вариантов" },
              ]}
              defaultValue={formState.formData?.get("type") as string}
              error={formState.errors?.type}
              required
            />

            <Stack gap="xs">
              {options.map((opt, idx) => (
                <Group key={idx} gap="xs">
                  <TextInput
                    placeholder="Вариант ответа"
                    value={opt.text}
                    onChange={(e) =>
                      handleOptionChange(idx, "text", e.target.value)
                    }
                    required
                    style={{ flex: 1 }}
                  />
                  <Checkbox
                    label="Верный"
                    checked={opt.isCorrect}
                    onChange={(e) =>
                      handleOptionChange(
                        idx,
                        "isCorrect",
                        e.currentTarget.checked,
                      )
                    }
                  />
                  <Button
                    type="button"
                    variant="outline"
                    color="red"
                    onClick={() => removeOption(idx)}
                  >
                    ×
                  </Button>
                </Group>
              ))}
              <Button type="button" variant="outline" onClick={addOption}>
                Добавить вариант
              </Button>
            </Stack>

            <Button type="submit" loading={isPending}>
              Создать вопрос
            </Button>
          </Stack>

          <input type="hidden" name="options" value={JSON.stringify(options)} />
        </form>
      </Modal>
    </>
  );
}
