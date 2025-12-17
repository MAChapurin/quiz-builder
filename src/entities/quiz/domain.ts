import { QuestionEntity, OptionEntity } from "@/entities/question/domain";

export type QuizWithQuestions = QuizEntity & {
  questions: (QuestionEntity & {
    options: OptionEntity[];
  })[];
};

export type QuizWithQuestionsExtended = QuizWithQuestions & {
  attemptsCount: number;
  questionsCount: number;
};

export type QuizEntity = {
  id: string;
  title: string;
  description?: string;
  authorId: string;
  isPublished: boolean;
  createdAt: Date;
  attemptsCount: number;
};

export type QuizWithQuestionsStats = {
  id: string;
  title: string;
  description?: string;
  isPublished: boolean;
  createdAt: Date;
  questionsCount: number;
  attemptsCount: number;
};

export type QuizTitleEntity = {
  id: string;
  title: string;
};
