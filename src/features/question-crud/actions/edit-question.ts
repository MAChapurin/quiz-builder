"use server";

import { z } from "zod";
import { questionService } from "@/entities/question/server";
import { QuestionType } from "@/entities/question/domain";
import { matchEither } from "@/shared/lib/either";
import { getTranslations } from "next-intl/server";

export type EditQuestionFormState = {
  formData?: FormData;
  errors?: {
    text?: string;
    type?: string;
    options?: string;
    _errors?: string;
  };
};

export const editQuestionAction = async (
  _state: EditQuestionFormState,
  formData: FormData,
): Promise<EditQuestionFormState & { success?: boolean }> => {
  const t = await getTranslations("features.question-crud.actions.edit");

  const data = Object.fromEntries(formData.entries());
  const options = data.options ? JSON.parse(data.options as string) : [];

  const editQuestionSchema = z.object({
    id: z.string().min(1),
    text: z.string().min(3, t("errors.shortText")),
    type: z.nativeEnum(QuestionType),
    options: z
      .array(
        z.object({
          id: z.string().optional(),
          text: z.string().min(1, t("errors.emptyOption")),
          isCorrect: z.boolean(),
        }),
      )
      .min(1, t("errors.noOptions")),
  });

  const parsed = editQuestionSchema.safeParse({ ...data, options });

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

  const result = await questionService.updateQuestion(parsed.data.id, {
    text: parsed.data.text,
    type: parsed.data.type,
    options: parsed.data.options,
  });

  const question = matchEither(result, {
    left: () => undefined,
    right: (q) => q[0],
  });

  if (!question) {
    return { formData, errors: { _errors: t("errors.updateFailed") } };
  }

  return { formData, errors: undefined, success: true };
};
