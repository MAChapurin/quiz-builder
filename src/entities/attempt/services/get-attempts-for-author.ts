import { Either, left, right } from "@/shared/lib/either";
import { quizAttemptRepository } from "../repositories/quiz-attempt";
import { QuizAttemptEntity } from "../domain";

export type GetAttemptsForAuthorError = "no-attempts";

export async function getAttemptsForAuthorService(
  authorId: string,
): Promise<Either<GetAttemptsForAuthorError, QuizAttemptEntity[]>> {
  const attempts = await quizAttemptRepository.getAttemptsForAuthor(authorId);

  if (attempts.length === 0) {
    return left("no-attempts");
  }

  return right(attempts);
}
