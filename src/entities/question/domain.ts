export enum QuestionType {
  SINGLE = "SINGLE",
  MULTIPLE = "MULTIPLE",
}

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
