"use server";

import { quizService } from "@/entities/quiz/server";
import { matchEither } from "@/shared/lib/either";
import { getTranslations } from "next-intl/server";

export type DeleteQuizFormState = {
  error?: string;
  success?: boolean;
};

export async function deleteQuizAction(
  _state: DeleteQuizFormState,
  formData: FormData,
): Promise<DeleteQuizFormState> {
  const t = await getTranslations("features.quiz-crud.actions.delete");

  const id = formData.get("id") as string | null;

  if (!id) {
    return { error: t("errors.noId") };
  }

  const result = await quizService.deleteQuiz(id);

  const error = matchEither(result, {
    left: (e) => {
      const map = {
        "quiz-delete-failed": t("errors.deleteFailed"),
        "quiz-not-found": t("errors.notFound"),
      } as const;

      return map[e] ?? t("errors.deleteFailed");
    },
    right: () => null,
  });

  if (error) {
    return { error };
  }

  return { success: true };
}
