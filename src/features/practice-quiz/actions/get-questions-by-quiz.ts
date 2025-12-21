"use server";

import { getTranslations } from "next-intl/server";
import { questionService } from "@/entities/question/server";
import { QuestionEntity, OptionEntity } from "@/entities/question/domain";

export type FetchQuizQuestionsFormState = {
  questions?: (QuestionEntity & { options: OptionEntity[] })[];
  errors?: { _errors?: string };
};

export const fetchQuizQuestionsAction = async (
  _state: FetchQuizQuestionsFormState,
  formData: FormData,
): Promise<FetchQuizQuestionsFormState> => {
  const t = await getTranslations(
    "features.practiceQuiz.actions.fetchQuestions",
  );

  const quizId = formData.get("quizId")?.toString();

  if (!quizId) {
    return { errors: { _errors: t("errors.missingQuizId") } };
  }

  try {
    const result = await questionService.getQuestionsByQuiz(quizId);

    if (result.type === "left") {
      return { errors: { _errors: t("errors.notFound") } };
    }

    return { questions: result.value };
  } catch (err) {
    console.error(err);
    return { errors: { _errors: t("errors.generic") } };
  }
};
