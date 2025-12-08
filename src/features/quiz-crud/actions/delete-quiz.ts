"use server";

import { quizService } from "@/entities/quiz/server";
import { matchEither } from "@/shared/lib/either";

export type DeleteQuizFormState = {
  error?: string;
  success?: boolean;
};

export async function deleteQuizAction(
  _state: DeleteQuizFormState,
  formData: FormData,
): Promise<DeleteQuizFormState> {
  const id = formData.get("id") as string | null;

  if (!id) {
    return { error: "Не передан id квиза" };
  }

  const result = await quizService.deleteQuizService(id);

  const error = matchEither(result, {
    left: (e) => {
      const map = {
        "quiz-delete-failed": "Не удалось удалить квиз",
        "quiz-not-found": "Квиз не найден",
      } as const;

      return map[e] ?? "Неизвестная ошибка";
    },
    right: () => null,
  });

  if (error) {
    return { error };
  }

  return { success: true };
}
