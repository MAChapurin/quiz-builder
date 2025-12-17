"use client";

import { useState } from "react";
import cuid from "cuid";
import { notifications } from "@mantine/notifications";
import { IconAlertTriangle } from "@tabler/icons-react";
import { QuestionType } from "@/entities/question/domain";
import { UpdateOptionDTO } from "@/entities/question/dto";

type EditOption = UpdateOptionDTO & {
  _key: string;
};

export function useEditQuestion() {
  const [text, setText] = useState("");
  const [type, setType] = useState<QuestionType>(QuestionType.SINGLE);
  const [options, setOptions] = useState<EditOption[]>([]);

  const initFromQuestion = (q: {
    text: string;
    type: QuestionType;
    options: UpdateOptionDTO[];
  }) => {
    setText(q.text);
    setType(q.type);
    setOptions(
      q.options.map((o) => ({
        ...o,
        _key: cuid(),
      })),
    );
  };

  const onTypeChange = (value: string) => {
    const nextType = value as QuestionType;
    const hadCorrect = options.some((o) => o.isCorrect);

    setType(nextType);
    setOptions((prev) => prev.map((o) => ({ ...o, isCorrect: false })));

    if (hadCorrect) {
      notifications.show({
        color: "yellow",
        icon: <IconAlertTriangle size={16} />,
        title: "Тип вопроса изменён",
        message: "Выбор правильных ответов был сброшен",
      });
    }
  };

  const onAddOption = () =>
    setOptions((prev) => [
      ...prev,
      {
        _key: crypto.randomUUID(),
        text: "",
        isCorrect: false,
      },
    ]);

  const onRemoveOption = (_key: string) =>
    setOptions((prev) => prev.filter((o) => o._key !== _key));

  const onTextChange = (_key: string, value: string) =>
    setOptions((prev) =>
      prev.map((o) => (o._key === _key ? { ...o, text: value } : o)),
    );

  const setCorrectSingle = (_key: string) =>
    setOptions((prev) =>
      prev.map((o) => ({ ...o, isCorrect: o._key === _key })),
    );

  const onToggleCorrectMultiple = (_key: string, checked: boolean) =>
    setOptions((prev) =>
      prev.map((o) => (o._key === _key ? { ...o, isCorrect: checked } : o)),
    );

  const canSubmit =
    options.some((o) => o.text.trim()) && options.some((o) => o.isCorrect);

  const reset = () => {
    setText("");
    setType(QuestionType.SINGLE);
    setOptions([]);
  };

  return {
    text,
    type,
    options,

    setText,
    onTypeChange,
    onAddOption,
    onRemoveOption,
    onTextChange,
    setCorrectSingle,
    onToggleCorrectMultiple,

    initFromQuestion,
    canSubmit,
    reset,
  };
}
