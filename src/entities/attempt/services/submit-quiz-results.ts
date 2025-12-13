import { left, right, Either } from "@/shared/lib/either";
import { quizAttemptRepository } from "../repositories/quiz-attempt";
import { QuizAttemptMode } from "@prisma/client";
import { QuizAnswers } from "../domain";

type SubmitQuizResultsInput = {
  quizId: string;
  answers: QuizAnswers;
  score: number;
  total: number;
  mode: QuizAttemptMode;
  inviteTokenId?: string | null;
};

export async function submitQuizResultsService(
  input: SubmitQuizResultsInput,
): Promise<Either<"submit-failed", true>> {
  try {
    await quizAttemptRepository.createAttempt({
      quizId: input.quizId,
      answers: input.answers,
      score: input.score,
      total: input.total,
      mode: input.mode,
      inviteTokenId: input.inviteTokenId ?? null,
    });

    return right(true);
  } catch (e) {
    console.error("submitQuizResultsService error:", e);
    return left("submit-failed");
  }
}
