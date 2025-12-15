import { Either, left, right } from "@/shared/lib/either";
import { quizAttemptRepository } from "../repositories/quiz-attempt";
import { QuizAttemptEntity } from "../domain";

export async function getAttemptsForAuthor(
  authorId: string,
  quizIds?: string[],
): Promise<Either<"no-attempts", QuizAttemptEntity[]>> {
  const attempts = await quizAttemptRepository.getAttemptsForAuthor(
    authorId,
    quizIds,
  );

  if (attempts.length === 0) {
    return left("no-attempts");
  }

  return right(attempts);
}
