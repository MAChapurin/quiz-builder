import { prisma } from "@/shared/lib/db";
import { QuestionEntity, OptionEntity } from "../domain";
import { CreateQuestionDTO } from "../dto";

export async function createQuestion(data: CreateQuestionDTO) {
  const question = await prisma.question.create({
    data: {
      quizId: data.quizId,
      text: data.text,
      type: data.type,
      options: { create: data.options },
    },
    include: { options: true },
  });

  return question as unknown as QuestionEntity & { options: OptionEntity[] };
}

export async function getQuestionsByQuiz(quizId: string) {
  return prisma.question.findMany({
    where: { quizId },
    include: { options: true },
  }) as Promise<(QuestionEntity & { options: OptionEntity[] })[]>;
}

export async function updateQuestion(
  id: string,
  data: Partial<Omit<CreateQuestionDTO, "quizId">> & {
    options?: { id?: string; text: string; isCorrect: boolean }[];
  },
) {
  const question = await prisma.question.update({
    where: { id },
    data: { text: data.text, type: data.type },
  });

  if (data.options) {
    for (const opt of data.options) {
      if (opt.id) {
        await prisma.option.update({
          where: { id: opt.id },
          data: { text: opt.text, isCorrect: opt.isCorrect },
        });
      } else {
        await prisma.option.create({
          data: { questionId: id, text: opt.text, isCorrect: opt.isCorrect },
        });
      }
    }
  }

  return getQuestionsByQuiz(question.quizId);
}

export async function deleteQuestion(id: string) {
  await prisma.option.deleteMany({ where: { questionId: id } });
  await prisma.question.delete({ where: { id } });
}

export const questionRepository = {
  createQuestion,
  getQuestionsByQuiz,
  updateQuestion,
  deleteQuestion,
};
