"use server";

import { sessionService } from "@/entities/user/server";
import { quizService } from "@/entities/quiz/server";
import { CreateQuizDTO } from "@/entities/quiz/dto";
import { QuizEntity } from "@/entities/quiz/domain";
import { matchEither } from "@/shared/lib/either";
import { z } from "zod";
import { getTranslations } from "next-intl/server";

export type CreateQuizFormState = {
  formData?: FormData;
  errors?: {
    title?: string;
    description?: string;
    _errors?: string;
  };
};

export const createQuizAction = async (
  _state: CreateQuizFormState,
  formData: FormData,
): Promise<CreateQuizFormState & { success?: boolean; quiz?: QuizEntity }> => {
  const t = await getTranslations("features.quiz-crud.actions.create");

  const data = Object.fromEntries(formData.entries());

  const createQuizSchema = z.object({
    title: z.string().min(3, t("errors.shortTitle")),
    description: z.string().min(3, t("errors.shortDescription")),
  });

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
      errors: { _errors: t("errors.unauthorized") },
    };
  }

  const dto: CreateQuizDTO = {
    title: parsed.data.title,
    description: parsed.data.description,
    authorId: session.id,
    isPublished: false,
  };

  try {
    const quizEither = await quizService.createQuiz(dto);

    const quiz = matchEither(quizEither, {
      left: () => undefined,
      right: (q) => q,
    });

    if (!quiz) {
      return {
        formData,
        errors: { _errors: t("errors.createFailed") },
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
      errors: { _errors: t("errors.createFailed") },
    };
  }
};
