"use server";

import { z } from "zod";
import { sessionService } from "@/entities/user/server";
import { quizService } from "@/entities/quiz/server";

export type TogglePublishFormState = {
  formData?: FormData;
  errors?: { _errors?: string };
  success?: boolean;
};

const toggleSchema = z.object({
  quizId: z.string().min(1),
  isPublished: z.enum(["true", "false"]),
});

export const togglePublishQuizAction = async (
  _state: TogglePublishFormState,
  formData: FormData,
): Promise<TogglePublishFormState> => {
  const raw = Object.fromEntries(formData.entries());
  const parsed = toggleSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      formData,
      errors: { _errors: "Некорректные данные для публикации" },
    };
  }

  const { quizId, isPublished } = parsed.data;
  const publishValue = isPublished === "true";

  const { session } = await sessionService.verifySession();
  if (!session) {
    return {
      formData,
      errors: { _errors: "Пользователь не авторизован" },
    };
  }

  const result = await quizService.togglePublishQuiz(quizId, publishValue);

  if (result.type === "left") {
    const messages = {
      "quiz-not-found": "Квиз не найден",
      "quiz-has-no-questions": "Нельзя опубликовать квиз без вопросов",
      "quiz-update-failed": "Не удалось обновить квиз",
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
