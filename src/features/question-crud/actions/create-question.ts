"use server";

import { z } from "zod";
import { questionService } from "@/entities/question/server";
import { QuestionEntity, QuestionType } from "@/entities/question/domain";
import { matchEither } from "@/shared/lib/either";
import { getTranslations } from "next-intl/server";

export type CreateQuestionFormState = {
  formData?: FormData;
  errors?: {
    text?: string;
    type?: string;
    options?: string;
    _errors?: string;
  };
};

export const createQuestionAction = async (
  _state: CreateQuestionFormState,
  formData: FormData,
): Promise<
  CreateQuestionFormState & { success?: boolean; question?: QuestionEntity }
> => {
  const t = await getTranslations("features.question-crud.actions.create");

  const data = Object.fromEntries(formData.entries());
  const options = data.options ? JSON.parse(data.options as string) : [];

  const createQuestionSchema = z.object({
    quizId: z.string(),
    text: z.string().min(3, t("errors.shortText")),
    type: z.nativeEnum(QuestionType),
    options: z
      .array(
        z.object({
          text: z.string().min(1, t("errors.optionText")),
          isCorrect: z.boolean(),
        }),
      )
      .min(1, t("errors.optionsRequired")),
  });

  const parsed = createQuestionSchema.safeParse({ ...data, options });

  if (!parsed.success) {
    const f = parsed.error.format();
    return {
      formData,
      errors: {
        text: f.text?._errors?.join(", "),
        type: f.type?._errors?.join(", "),
        options: f.options?._errors?.join(", "),
        _errors: f._errors?.join(", "),
      },
    };
  }

  const result = await questionService.createQuestion({
    quizId: parsed.data.quizId,
    text: parsed.data.text,
    type: parsed.data.type,
    options: parsed.data.options,
  });

  const question = matchEither(result, {
    left: () => undefined,
    right: (q) => q,
  });

  if (!question) {
    return { formData, errors: { _errors: t("errors.createFailed") } };
  }

  return { formData, errors: undefined, success: true, question };
};

// "use server";

// import { z } from "zod";
// import { questionService } from "@/entities/question/server";
// import { QuestionEntity, QuestionType } from "@/entities/question/domain";
// import { matchEither } from "@/shared/lib/either";

// export type CreateQuestionFormState = {
//   formData?: FormData;
//   errors?: {
//     text?: string;
//     type?: string;
//     options?: string;
//     _errors?: string;
//   };
// };

// const createQuestionSchema = z.object({
//   quizId: z.string(),
//   text: z.string().min(3, "Текст вопроса должен быть не менее 3 символов"),
//   type: z.nativeEnum(QuestionType),
//   options: z
//     .array(
//       z.object({
//         text: z.string().min(1, "Текст варианта обязателен"),
//         isCorrect: z.boolean(),
//       }),
//     )
//     .min(1, "Должен быть хотя бы один вариант"),
// });

// export const createQuestionAction = async (
//   _state: CreateQuestionFormState,
//   formData: FormData,
// ): Promise<
//   CreateQuestionFormState & { success?: boolean; question?: QuestionEntity }
// > => {
//   const data = Object.fromEntries(formData.entries());
//   const options = data.options ? JSON.parse(data.options as string) : [];

//   const parsed = createQuestionSchema.safeParse({ ...data, options });

//   if (!parsed.success) {
//     const f = parsed.error.format();
//     return {
//       formData,
//       errors: {
//         text: f.text?._errors?.join(", "),
//         type: f.type?._errors?.join(", "),
//         options: f.options?._errors?.join(", "),
//         _errors: f._errors?.join(", "),
//       },
//     };
//   }

//   const result = await questionService.createQuestion({
//     quizId: parsed.data.quizId,
//     text: parsed.data.text,
//     type: parsed.data.type,
//     options: parsed.data.options,
//   });

//   const question = matchEither(result, {
//     left: () => undefined,
//     right: (q) => q,
//   });

//   if (!question) {
//     return { formData, errors: { _errors: "Не удалось создать вопрос" } };
//   }

//   return { formData, errors: undefined, success: true, question };
// };
