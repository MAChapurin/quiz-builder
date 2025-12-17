import { QuestionType } from "./domain";

export type CreateOptionDTO = {
  text: string;
  isCorrect: boolean;
};

export type CreateQuestionDTO = {
  quizId: string;
  text: string;
  type: QuestionType;
  options: CreateOptionDTO[];
};

export type UpdateOptionDTO = {
  id?: string;
  text: string;
  isCorrect: boolean;
};
