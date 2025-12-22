"use client";

import { useRef, useState } from "react";
import { notifications } from "@mantine/notifications";
import { IconAlertTriangle } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

export type QuestionType = "SINGLE" | "MULTIPLE";

export type OptionInput = {
  text: string;
  isCorrect: boolean;
};

const EMPTY_OPTION: OptionInput = { text: "", isCorrect: false };

export function useCreateQuestion() {
  const [type, setType] = useState<QuestionType>("SINGLE");
  const [text, setText] = useState("");
  const [options, setOptions] = useState<OptionInput[]>([{ ...EMPTY_OPTION }]);

  const t = useTranslations("features.question-crud.ui.edit.toasts");

  const optionInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const onTypeChange = (value: string) => {
    const nextType = value as QuestionType;
    const hadCorrect = options.some((o) => o.isCorrect);

    setType(nextType);
    setOptions((prev) => prev.map((o) => ({ ...o, isCorrect: false })));

    if (hadCorrect) {
      notifications.show({
        color: "yellow",
        icon: <IconAlertTriangle size={16} />,
        title: t("changeTitle"),
        message: t("change"),
      });
    }
  };

  const onAddOption = () => {
    setOptions((prev) => [...prev, { ...EMPTY_OPTION }]);

    setTimeout(() => {
      const lastIndex = optionInputRefs.current.length - 1;
      optionInputRefs.current[lastIndex]?.focus();
    });
  };

  const onRemoveOption = (index: number) => {
    setOptions((prev) => prev.filter((_, i) => i !== index));
    optionInputRefs.current.splice(index, 1);
  };

  const onTextChange = (index: number, value: string) =>
    setOptions((prev) =>
      prev.map((o, i) => (i === index ? { ...o, text: value } : o)),
    );

  const setCorrectSingle = (index: number) =>
    setOptions((prev) =>
      prev.map((o, i) => ({ ...o, isCorrect: i === index })),
    );

  const onToggleCorrectMultiple = (index: number, checked: boolean) =>
    setOptions((prev) =>
      prev.map((o, i) => (i === index ? { ...o, isCorrect: checked } : o)),
    );

  const hasOptionText = options.some((o) => o.text.trim() !== "");
  const hasCorrect = options.some((o) => o.isCorrect);
  const canSubmit = hasOptionText && hasCorrect;

  const reset = () => {
    setText("");
    setType("SINGLE");
    setOptions([{ ...EMPTY_OPTION }]);
    optionInputRefs.current = [];
  };

  return {
    type,
    text,
    options,
    optionInputRefs,

    setText,
    onTypeChange,

    onAddOption,
    onRemoveOption,
    onTextChange,

    setCorrectSingle,
    onToggleCorrectMultiple,

    canSubmit,
    reset,
  };
}
