import { prisma } from "@/shared/lib/db";
import { Prisma } from "@prisma/client";
import { CreateQuizAttemptDTO } from "../dto";
import { QuizAttemptEntity } from "../domain";

async function createAttempt(data: CreateQuizAttemptDTO) {
  return prisma.quizAttempt.create({
    data: {
      quizId: data.quizId,
      inviteTokenId: data.inviteTokenId ?? null,
      label: data.label,
      score: data.score,
      total: data.total,
      answers: data.answers as Prisma.InputJsonValue,
    },
  });
}

async function getAttemptsForAuthor(
  authorId: string,
  quizIds?: string[],
): Promise<QuizAttemptEntity[]> {
  const rows = await prisma.quizAttempt.findMany({
    where: {
      quiz: {
        authorId,
        id: quizIds && quizIds.length > 0 ? { in: quizIds } : undefined,
      },
    },
    select: {
      id: true,
      score: true,
      total: true,
      label: true,
      createdAt: true,
      quiz: {
        select: { title: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return rows.map((r) => ({
    id: r.id,
    quizTitle: r.quiz.title,
    score: r.score,
    total: r.total,
    label: r.label,
    createdAt: r.createdAt,
  }));
}

export const quizAttemptRepository = {
  createAttempt,
  getAttemptsForAuthor,
};
