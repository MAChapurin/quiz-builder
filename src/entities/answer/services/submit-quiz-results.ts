import { left, right, Either } from "@/shared/lib/either";
import { answerRepository } from "../repositories/answer";

type SubmitQuizResultsDTO = {
  quizId: string;
  answers: Record<string, string[]>;
};

export async function submitQuizResultsService(
  data: SubmitQuizResultsDTO,
): Promise<Either<"submit-failed", true>> {
  try {
    const records = Object.entries(data.answers).flatMap(
      ([questionId, optionIds]) =>
        optionIds.map((value) => ({
          quizId: data.quizId,
          questionId,
          value,
        })),
    );

    if (records.length === 0) {
      return left("submit-failed");
    }

    await answerRepository.createManyAnswers(records);

    return right(true);
  } catch (e) {
    console.error("submitQuizResultsService error", e);
    return left("submit-failed");
  }
}
