"use server";

import { questionService } from "@/entities/question/server";

export type DeleteQuestionFormState = {
  errors?: {
    _errors?: string;
  };
  success?: boolean;
};

export const deleteQuestionAction = async (
  _state: DeleteQuestionFormState,
  formData: FormData,
): Promise<DeleteQuestionFormState> => {
  const id = formData.get("id")?.toString();

  if (!id) {
    return {
      errors: { _errors: "ID вопроса не передан" },
    };
  }

  const result = await questionService.deleteQuestion(id);

  if (result.type === "left") {
    const map = {
      "question-not-found": "Вопрос не найден",
      "question-delete-failed": "Не удалось удалить вопрос",
    } as const;

    return {
      errors: { _errors: map[result.error] },
    };
  }

  return {
    success: true,
  };
};
