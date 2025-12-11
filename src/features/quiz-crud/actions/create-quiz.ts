"use server";

import { sessionService } from "@/entities/user/server";
import { quizService } from "@/entities/quiz/server";
import { CreateQuizDTO } from "@/entities/quiz/dto";
import { QuizEntity } from "@/entities/quiz/domain";
import { matchEither } from "@/shared/lib/either";
import { z } from "zod";

export type CreateQuizFormState = {
  formData?: FormData;
  errors?: {
    title?: string;
    description?: string;
    _errors?: string;
  };
};

const createQuizSchema = z.object({
  title: z.string().min(3, "Название должно быть не менее 3 символов"),
  description: z.string().min(3, "Описание должно быть не менее 3 символов"),
});

export const createQuizAction = async (
  _state: CreateQuizFormState,
  formData: FormData,
): Promise<CreateQuizFormState & { success?: boolean; quiz?: QuizEntity }> => {
  const data = Object.fromEntries(formData.entries());

  const parsed = createQuizSchema.safeParse(data);

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

  const dto: CreateQuizDTO = {
    title: parsed.data.title,
    description: parsed.data.description,
    authorId: session.id,
    isPublished: false,
  };

  try {
    const quizEither = await quizService.createQuizService(dto);

    const quiz = matchEither(quizEither, {
      left: () => undefined,
      right: (q) => q,
    });

    if (!quiz) {
      return {
        formData,
        errors: { _errors: "Не удалось создать квиз" },
      };
    }

    return {
      formData,
      errors: undefined,
      success: true,
      quiz,
    };
  } catch (error) {
    console.error(error);
    return {
      formData,
      errors: { _errors: "Не удалось создать квиз" },
    };
  }
};
