"use server";

import { z } from "zod";
import { sessionService } from "@/entities/user/server";
import { quizService } from "@/entities/quiz/server";

export type EditQuizFormState = {
  formData?: FormData;
  errors?: {
    title?: string;
    description?: string;
    _errors?: string;
  };
};

const editQuizSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(3, "Название должно быть не менее 3 символов"),
  description: z.string().min(3, "Описание должно быть не менее 3 символов"),
});

export const editQuizAction = async (
  _state: EditQuizFormState,
  formData: FormData,
): Promise<EditQuizFormState & { success?: boolean }> => {
  const data = Object.fromEntries(formData.entries());

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
      errors: { _errors: "Пользователь не авторизован" },
    };
  }

  const result = await quizService.updateQuizService(parsed.data.id, {
    title: parsed.data.title,
    description: parsed.data.description,
  });

  if (result.type === "left") {
    const errorsMap = {
      "quiz-not-found": "Квиз не найден",
      "quiz-update-failed": "Не удалось сохранить изменения",
    } as const;

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
