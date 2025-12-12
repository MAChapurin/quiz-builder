export type CreateAnswerDTO = {
  quizId: string;
  questionId: string;
  value: string;
  userId?: string;
};
