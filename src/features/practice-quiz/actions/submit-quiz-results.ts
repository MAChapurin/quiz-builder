"use server";

import { calculateScoreCorrectly } from "@/entities/attempt/domain";
import { questionService } from "@/entities/question/server";

import { submitQuizResultsSchema } from "./submit-quiz-results.schema";
import { SubmitQuizResultsFormState } from "./submit-quiz-results.types";
import { attemptService } from "@/entities/attempt/server";

export async function submitQuizResultsAction(
  _: SubmitQuizResultsFormState,
  formData: FormData,
): Promise<SubmitQuizResultsFormState> {
  try {
    const raw = {
      quizId: formData.get("quizId"),
      inviteTokenId: formData.get("inviteTokenId"),
      answers: formData.get("answers")
        ? JSON.parse(String(formData.get("answers")))
        : undefined,
    };

    const parsed = submitQuizResultsSchema.safeParse(raw);
    if (!parsed.success) {
      console.error(parsed.error.format());
      return { error: true };
    }

    const { quizId, inviteTokenId, answers } = parsed.data;

    const questionsEither = await questionService.getQuestionsByQuiz(quizId);
    if (questionsEither.type === "left") {
      return { error: true };
    }

    const correctOptionIdsByQuestion: Record<string, string[]> = {};
    for (const q of questionsEither.value) {
      correctOptionIdsByQuestion[q.id] = q.options
        .filter((o) => o.isCorrect)
        .map((o) => o.id);
    }

    const score = calculateScoreCorrectly(answers, correctOptionIdsByQuestion);

    const total = Object.keys(correctOptionIdsByQuestion).length;

    const result = await attemptService.submitQuizResults({
      quizId,
      inviteTokenId,
      answers,
      score,
      total,
    });

    return result.type === "right" ? { success: true } : { error: true };
  } catch (e) {
    console.error("submitQuizResultsAction error", e);
    return { error: true };
  }
}
