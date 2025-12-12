import { prisma } from "@/shared/lib/db";
import { CreateAnswerDTO } from "../dto";

export async function createManyAnswers(data: CreateAnswerDTO[]) {
  await prisma.answer.createMany({
    data,
  });
}

export const answerRepository = {
  createManyAnswers,
};
