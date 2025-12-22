"use server";

import { questionService } from "@/entities/question/server";
import { getTranslations } from "next-intl/server";

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
  const t = await getTranslations("features.question-crud.actions.delete");

  const id = formData.get("id")?.toString();

  if (!id) {
    return {
      errors: { _errors: t("errors.noId") },
    };
  }

  const result = await questionService.deleteQuestion(id);

  if (result.type === "left") {
    const map = {
      "question-not-found": t("errors.notFound"),
      "question-delete-failed": t("errors.deleteFailed"),
    } as const;

    return {
      errors: { _errors: map[result.error] },
    };
  }

  return {
    success: true,
  };
};
