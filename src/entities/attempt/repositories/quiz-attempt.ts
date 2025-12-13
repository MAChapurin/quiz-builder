import { prisma } from "@/shared/lib/db";
import { Prisma, QuizAttemptMode } from "@prisma/client";
import { QuizAnswers } from "../domain";

type CreateQuizAttemptInput = {
  quizId: string;
  inviteTokenId?: string | null;
  mode: QuizAttemptMode;
  score: number;
  total: number;
  answers: QuizAnswers;
};

export async function createAttempt(data: CreateQuizAttemptInput) {
  return prisma.quizAttempt.create({
    data: {
      quizId: data.quizId,
      inviteTokenId: data.inviteTokenId ?? null,
      mode: data.mode,
      score: data.score,
      total: data.total,
      answers: data.answers as Prisma.InputJsonValue,
    },
  });
}

export const quizAttemptRepository = {
  createAttempt,
};
