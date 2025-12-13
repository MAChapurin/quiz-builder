import { QuizAnswers } from "./domain";

export type CreateQuizAttemptDTO = {
  quizId: string;
  inviteTokenId?: string | null;
  label: string;
  score: number;
  total: number;
  answers: QuizAnswers;
};

export type AttemptListItemDTO = {
  id: string;
  quizTitle: string;
  score: number;
  total: number;
  label: string;
  createdAt: Date;
};

export type SubmitQuizResultsDTO = {
  quizId: string;
  inviteTokenId?: string | null;
  score: number;
  total: number;
  answers: QuizAnswers;
};
