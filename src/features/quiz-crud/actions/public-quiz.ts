"use server";

import { z } from "zod";
import { sessionService } from "@/entities/user/server";
import { quizService } from "@/entities/quiz/server";
import { getTranslations } from "next-intl/server";

export type TogglePublishFormState = {
  formData?: FormData;
  errors?: { _errors?: string };
  success?: boolean;
};

export const togglePublishQuizAction = async (
  _state: TogglePublishFormState,
  formData: FormData,
): Promise<TogglePublishFormState> => {
  const t = await getTranslations("features.quiz-crud.actions.togglePublish");

  const raw = Object.fromEntries(formData.entries());

  const toggleSchema = z.object({
    quizId: z.string().min(1),
    isPublished: z.enum(["true", "false"]),
  });

  const parsed = toggleSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      formData,
      errors: { _errors: t("errors.invalidData") },
    };
  }

  const { quizId, isPublished } = parsed.data;
  const publishValue = isPublished === "true";

  const { session } = await sessionService.verifySession();
  if (!session) {
    return {
      formData,
      errors: { _errors: t("errors.unauthorized") },
    };
  }

  const result = await quizService.togglePublishQuiz(quizId, publishValue);

  if (result.type === "left") {
    const messages = {
      "quiz-not-found": t("errors.notFound"),
      "quiz-has-no-questions": t("errors.noQuestions"),
      "quiz-update-failed": t("errors.updateFailed"),
    } as const;

    return {
      formData,
      errors: { _errors: messages[result.error] },
    };
  }

  return {
    formData,
    success: true,
  };
};
