"use server";

import { z } from "zod";
import { sessionService } from "@/entities/user/server";
import { quizService } from "@/entities/quiz/server";
import { getTranslations } from "next-intl/server";

export type EditQuizFormState = {
  formData?: FormData;
  errors?: {
    title?: string;
    description?: string;
    _errors?: string;
  };
};

export const editQuizAction = async (
  _state: EditQuizFormState,
  formData: FormData,
): Promise<EditQuizFormState & { success?: boolean }> => {
  const t = await getTranslations("features.quiz-crud.actions.edit");

  const data = Object.fromEntries(formData.entries());

  const editQuizSchema = z.object({
    id: z.string().min(1),
    title: z.string().min(3, t("errors.shortTitle")),
    description: z.string().min(3, t("errors.shortDescription")),
  });

  const parsed = editQuizSchema.safeParse(data);

  if (!parsed.success) {
    const f = parsed.error.format();
    return {
      formData,
      errors: {
        title: f.title?._errors?.join(", "),
        description: f.description?._errors?.join(", "),
        _errors: f._errors?.join(", "),
      },
    };
  }

  const { session } = await sessionService.verifySession();
  if (!session) {
    return {
      formData,
      errors: { _errors: t("errors.unauthorized") },
    };
  }

  const result = await quizService.updateQuiz(parsed.data.id, {
    title: parsed.data.title,
    description: parsed.data.description,
  });

  if (result.type === "left") {
    const errorsMap: Record<string, string> = {
      "quiz-not-found": t("errors.notFound"),
      "quiz-update-failed": t("errors.updateFailed"),
    };

    return {
      formData,
      errors: { _errors: errorsMap[result.error] },
    };
  }

  return {
    formData,
    errors: undefined,
    success: true,
  };
};
