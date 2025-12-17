import { prisma } from "@/shared/lib/db";
import { QuestionEntity, OptionEntity } from "../domain";
import { CreateQuestionDTO, UpdateOptionDTO } from "../dto";

export async function createQuestion(data: CreateQuestionDTO) {
  const question = await prisma.question.create({
    data: {
      quizId: data.quizId,
      text: data.text,
      type: data.type,
      options: {
        create: data.options.map((opt, index) => ({
          text: opt.text,
          isCorrect: opt.isCorrect,
          order: index,
        })),
      },
    },
    include: {
      options: {
        orderBy: { order: "asc" },
      },
    },
  });

  return question as unknown as QuestionEntity & { options: OptionEntity[] };
}

export async function getQuestionsByQuiz(quizId: string) {
  return prisma.question.findMany({
    where: { quizId },
    include: {
      options: {
        orderBy: { order: "asc" },
      },
    },
    orderBy: { createdAt: "asc" },
  }) as Promise<(QuestionEntity & { options: OptionEntity[] })[]>;
}

export async function updateQuestion(
  id: string,
  data: Partial<Omit<CreateQuestionDTO, "quizId" | "options">> & {
    options?: UpdateOptionDTO[];
  },
) {
  const question = await prisma.question.update({
    where: { id },
    data: {
      text: data.text,
      type: data.type,
    },
  });

  if (data.options) {
    const existingOptions = await prisma.option.findMany({
      where: { questionId: id },
      select: { id: true },
    });

    const incomingIds = data.options
      .map((o) => o.id)
      .filter((id): id is string => Boolean(id));

    const idsToDelete = existingOptions
      .map((o) => o.id)
      .filter((id) => !incomingIds.includes(id));

    if (idsToDelete.length > 0) {
      await prisma.option.deleteMany({
        where: { id: { in: idsToDelete } },
      });
    }

    for (let index = 0; index < data.options.length; index++) {
      const opt = data.options[index];

      if (opt.id) {
        await prisma.option.update({
          where: { id: opt.id },
          data: {
            text: opt.text,
            isCorrect: opt.isCorrect,
            order: index,
          },
        });
      } else {
        await prisma.option.create({
          data: {
            questionId: id,
            text: opt.text,
            isCorrect: opt.isCorrect,
            order: index,
          },
        });
      }
    }
  }

  return prisma.question.findMany({
    where: { quizId: question.quizId },
    include: {
      options: { orderBy: { order: "asc" } },
    },
    orderBy: { createdAt: "asc" },
  });
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
