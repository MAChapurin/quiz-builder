import {
  createQuizService,
  deleteQuizService,
  getQuizService,
  getQuizzesByUserService,
  getQuizzesWithQuestionsByUser,
  updateQuizService,
  togglePublishQuizService,
  getPublishedQuizzesService,
} from "./services/quiz";

export const quizService = {
  createQuizService,
  getQuizService,
  getQuizzesByUserService,
  getQuizzesWithQuestionsByUser,
  updateQuizService,
  deleteQuizService,
  togglePublishQuizService,
  getPublishedQuizzesService,
};
