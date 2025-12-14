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

export async function getQuizzesByUserWithQuestions(authorId: string) {
  return prisma.quiz.findMany({
    where: { authorId },
    include: {
      questions: {
        include: {
          options: true,
        },
      },
      _count: {
        select: {
          attempts: true,
          questions: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
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

export async function togglePublishQuiz(id: string, isPublished: boolean) {
  return prisma.quiz.update({
    where: { id },
    data: { isPublished },
  }) as unknown as QuizEntity;
}

export async function getQuizQuestionsCount(quizId: string) {
  return prisma.question.count({
    where: { quizId },
  });
}

export async function getPublishedQuizzesWithQuestions() {
  return prisma.quiz.findMany({
    where: { isPublished: true },
    include: {
      questions: {
        include: {
          options: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export const quizRepository = {
  createQuiz,
  getQuiz,
  getQuizzesByUser,
  getQuizzesByUserWithQuestions,
  updateQuiz,
  deleteQuiz,
  getQuizQuestionsCount,
  togglePublishQuiz,
  getPublishedQuizzesWithQuestions,
};
