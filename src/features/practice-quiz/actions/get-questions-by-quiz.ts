"use server";

import { questionService } from "@/entities/question/server";
import { QuestionEntity, OptionEntity } from "@/entities/question/domain";

export type FetchQuizQuestionsFormState = {
  questions?: (QuestionEntity & { options: OptionEntity[] })[];
  errors?: {
    _errors?: string;
  };
};

export const fetchQuizQuestionsAction = async (
  _state: FetchQuizQuestionsFormState,
  formData: FormData,
): Promise<FetchQuizQuestionsFormState> => {
  const quizId = formData.get("quizId")?.toString();

  if (!quizId) {
    return { errors: { _errors: "ID квиза не передан" } };
  }

  try {
    const result = await questionService.getQuestionsByQuiz(quizId);

    if (result.type === "left") {
      const map = {
        "questions-not-found": "Вопросы не найдены",
      } as const;

      return { errors: { _errors: map[result.error] } };
    }

    return { questions: result.value };
  } catch (err) {
    console.error(err);
    return { errors: { _errors: "Ошибка при получении вопросов" } };
  }
};
