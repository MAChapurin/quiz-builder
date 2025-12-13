import { left, right, Either } from "@/shared/lib/either";
import { inviteTokenRepository } from "../repositories/invite-token";
import { randomBytes } from "crypto";

export const generateInviteToken = async (
  quizId: string,
  label: string,
): Promise<Either<"invite-creation-failed", string>> => {
  try {
    const token = randomBytes(24).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

    await inviteTokenRepository.createInviteToken({
      quizId,
      token,
      label,
      expiresAt,
    });

    return right(token);
  } catch (err) {
    console.error("generateInviteToken error:", err);
    return left("invite-creation-failed");
  }
};

export const validateInviteToken = async (
  token: string,
): Promise<
  Either<
    "invalid-token" | "expired-token" | "used-token",
    { quizId: string; tokenId: string }
  >
> => {
  const invite = await inviteTokenRepository.getInviteByToken(token);

  if (!invite) return left("invalid-token");
  if (invite.used) return left("used-token");

  const expiresAt = new Date(invite.expiresAt).getTime();
  if (expiresAt <= Date.now()) return left("expired-token");

  return right({ quizId: invite.quizId, tokenId: invite.id });
};

export const markUsedInviteToken = async (
  tokenId: string,
): Promise<Either<"invite-update-failed", true>> => {
  try {
    await inviteTokenRepository.markInviteUsed(tokenId);
    return right(true);
  } catch (err) {
    console.error("markUsedInviteToken error:", err);
    return left("invite-update-failed");
  }
};

export const consumeInviteToken = async (
  token: string,
): Promise<
  Either<
    "invalid-token" | "expired-token" | "used-token" | "invite-update-failed",
    { quizId: string; inviteTokenId: string }
  >
> => {
  const inviteEither = await validateInviteToken(token);
  if (inviteEither.type === "left") return inviteEither;

  const { quizId, tokenId } = inviteEither.value;

  const markEither = await markUsedInviteToken(tokenId);
  if (markEither.type === "left") {
    return left("invite-update-failed");
  }

  return right({ quizId, inviteTokenId: tokenId });
};

export const inviteTokenService = {
  consumeInviteToken,
  generateInviteToken,
  validateInviteToken,
  markUsedInviteToken,
};
