"use server";

import { submitQuizResultsService } from "@/entities/attempt/services/submit-quiz-results";
import { QuizAttemptMode } from "@prisma/client";
import { QuizAnswers } from "@/entities/attempt/domain";

export type SubmitQuizResultsFormState = {
  success?: boolean;
  error?: boolean;
};

export async function submitQuizResultsAction(
  _: SubmitQuizResultsFormState,
  formData: FormData,
): Promise<SubmitQuizResultsFormState> {
  try {
    const quizId = formData.get("quizId");
    const answersRaw = formData.get("answers");

    if (typeof quizId !== "string" || typeof answersRaw !== "string") {
      return { error: true };
    }

    const answers = JSON.parse(answersRaw) as QuizAnswers;

    const result = await submitQuizResultsService({
      quizId,
      answers,
      score: Object.values(answers).filter((v) => v.length > 0).length,
      total: Object.keys(answers).length,
      mode: QuizAttemptMode.PUBLIC,
    });

    if (result.type === "left") {
      return { error: true };
    }

    return { success: true };
  } catch (e) {
    console.error("submitQuizResultsAction error:", e);
    return { error: true };
  }
}
