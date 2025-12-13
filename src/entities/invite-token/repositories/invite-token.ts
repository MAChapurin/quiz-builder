import { prisma } from "@/shared/lib/db";
import { InviteTokenEntity } from "../domain";

export async function createInviteToken(data: {
  quizId: string;
  token: string;
  label: string;
  expiresAt: Date;
}): Promise<InviteTokenEntity> {
  return prisma.inviteToken.create({ data }) as unknown as InviteTokenEntity;
}

export async function getInviteByToken(
  token: string,
): Promise<InviteTokenEntity | null> {
  const invite = await prisma.inviteToken.findUnique({
    where: { token },
  });
  return invite as InviteTokenEntity | null;
}

export async function getInviteById(
  id: string,
): Promise<InviteTokenEntity | null> {
  const invite = await prisma.inviteToken.findUnique({
    where: { id },
  });

  return invite as InviteTokenEntity | null;
}

export async function markInviteUsed(id: string) {
  return prisma.inviteToken.update({
    where: { id },
    data: { used: true },
  }) as unknown as InviteTokenEntity;
}

export async function deleteInvite(id: string) {
  await prisma.inviteToken.delete({ where: { id } });
}

export const inviteTokenRepository = {
  createInviteToken,
  getInviteByToken,
  getInviteById,
  markInviteUsed,
  deleteInvite,
};
