import { prisma } from "@/shared/lib/db";
import { QuizEntity } from "../domain";
import { CreateQuizDTO } from "../dto";

export async function createQuiz(data: CreateQuizDTO): Promise<QuizEntity> {
  const quiz = await prisma.quiz.create({ data });
  return quiz as unknown as QuizEntity;
}

export async function getQuiz(id: string): Promise<QuizEntity | null> {
  return prisma.quiz.findUnique({
    where: { id },
  }) as unknown as QuizEntity | null;
}

export async function getQuizzesByUser(
  authorId: string,
): Promise<QuizEntity[]> {
  return prisma.quiz.findMany({
    where: { authorId },
  }) as unknown as QuizEntity[];
}

export async function updateQuiz(
  id: string,
  data: Partial<CreateQuizDTO>,
): Promise<QuizEntity> {
  const quiz = await prisma.quiz.update({ where: { id }, data });
  return quiz as unknown as QuizEntity;
}

export async function deleteQuiz(id: string): Promise<void> {
  await prisma.quiz.delete({ where: { id } });
}

export const quizRepository = {
  createQuiz,
  getQuiz,
  getQuizzesByUser,
  updateQuiz,
  deleteQuiz,
};
