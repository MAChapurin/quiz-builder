"use server";

import { submitQuizResultsService } from "@/entities/answer/services/submit-quiz-results";

export type SubmitQuizResultsFormState = {
  success?: boolean;
  error?: string;
};

export async function submitQuizResultsAction(
  prevState: SubmitQuizResultsFormState,
  formData: FormData,
): Promise<SubmitQuizResultsFormState> {
  const quizId = formData.get("quizId") as string;
  const rawAnswers = formData.get("answers") as string;

  if (!quizId || !rawAnswers) {
    return { error: "invalid-data" };
  }

  const answers = JSON.parse(rawAnswers) as Record<string, string[]>;

  const result = await submitQuizResultsService({
    quizId,
    answers,
  });

  if (result.type === "left") {
    return { error: "submit-failed" };
  }

  return { success: true };
}
