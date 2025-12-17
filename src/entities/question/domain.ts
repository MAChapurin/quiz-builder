import { QuestionType as PrismaQuestionType } from "@prisma/client";

export const QuestionType = PrismaQuestionType;
export type QuestionType = PrismaQuestionType;

export type OptionEntity = {
  id: string;
  questionId: string;
  text: string;
  isCorrect: boolean;
};

export type QuestionEntity = {
  id: string;
  quizId: string;
  text: string;
  type: QuestionType;
  options: OptionEntity[];
  createdAt: Date;
};
