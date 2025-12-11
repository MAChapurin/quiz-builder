import { QuestionEntity, OptionEntity } from "@/entities/question/domain";

export type QuizWithQuestions = QuizEntity & {
  questions: (QuestionEntity & {
    options: OptionEntity[];
  })[];
};

export type QuizEntity = {
  id: string;
  title: string;
  description?: string;
  authorId: string;
  isPublished: boolean;
  createdAt: Date;
};
