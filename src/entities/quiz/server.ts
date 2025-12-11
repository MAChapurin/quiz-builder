import {
  createQuizService,
  deleteQuizService,
  getQuizService,
  getQuizzesByUserService,
  getQuizzesWithQuestionsByUser,
  updateQuizService,
} from "./services/quiz";

export const quizService = {
  createQuizService,
  getQuizService,
  getQuizzesByUserService,
  getQuizzesWithQuestionsByUser,
  updateQuizService,
  deleteQuizService,
};
