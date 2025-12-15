import { inviteTokenRepository } from "@/entities/invite-token/repositories/invite-token";
import { SubmitQuizResultsDTO } from "../dto";
import { left, right, Either } from "@/shared/lib/either";
import { quizAttemptRepository } from "../repositories/quiz-attempt";

export async function submitQuizResults(
  input: SubmitQuizResultsDTO,
): Promise<Either<"attempt-create-failed", true>> {
  try {
    let label: string;
    if (input.inviteTokenId) {
      const invite = await inviteTokenRepository.getInviteById(
        input.inviteTokenId,
      );

      if (!invite) {
        return left("attempt-create-failed");
      }

      label = invite.label;
    } else {
      label = "Public attempt";
    }

    await quizAttemptRepository.createAttempt({
      ...input,
      label,
    });

    return right(true);
  } catch (e) {
    console.error("submitQuizResultsService error", e);
    return left("attempt-create-failed");
  }
}
