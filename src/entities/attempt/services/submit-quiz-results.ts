import { inviteTokenRepository } from "@/entities/invite-token/repositories/invite-token";
import { SubmitQuizResultsDTO } from "../dto";
import { left, right, Either } from "@/shared/lib/either";
import { quizAttemptRepository } from "../repositories/quiz-attempt";

export async function submitQuizResultsService(
  input: SubmitQuizResultsDTO,
): Promise<Either<"attempt-create-failed", true>> {
  try {
    let label: string;
    console.log("before Invite token ID provided:", input.inviteTokenId);
    if (input.inviteTokenId) {
      console.log("Invite token ID provided:", input.inviteTokenId);
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

// export async function submitQuizResultsService(
//   input: SubmitQuizResultsDTO,
// ): Promise<Either<"attempt-create-failed", true>> {
//   try {
//     let label: string;

//     if (input.inviteTokenId) {
//       console.log("Invite token ID provided:", input.inviteTokenId);
//       const invite = await inviteTokenRepository.getInviteById(
//         input.inviteTokenId,
//       );

//       if (!invite) {
//         return left("attempt-create-failed");
//       }

//       label = invite.label;
//     } else {
//       label = "public";
//     }

//     await quizAttemptRepository.createAttempt({
//       ...input,
//       label,
//     });

//     return right(true);
//   } catch (e) {
//     console.error("submitQuizResultsService error", e);
//     return left("attempt-create-failed");
//   }
// }

// import { left, right, Either } from "@/shared/lib/either";
// import { quizAttemptRepository } from "../repositories/quiz-attempt";
// import { CreateQuizAttemptDTO } from "../dto";

// export type SubmitQuizResultsError = "attempt-create-failed";

// export async function submitQuizResultsService(
//   input: CreateQuizAttemptDTO,
// ): Promise<Either<SubmitQuizResultsError, true>> {
//   try {
//     await quizAttemptRepository.createAttempt(input);
//     return right(true);
//   } catch (e) {
//     console.error("submitQuizResultsService error", e);
//     return left("attempt-create-failed");
//   }
// }
