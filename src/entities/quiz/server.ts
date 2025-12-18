import {
  createQuiz,
  deleteQuiz,
  getQuiz,
  getQuizzesByUser,
  getQuizzesWithQuestionsByUser,
  updateQuiz,
  togglePublishQuiz,
  getQuizTitlesByUser,
} from "./services/quiz";

export const quizService = {
  createQuiz,
  getQuiz,
  getQuizzesByUser,
  getQuizzesWithQuestionsByUser,
  updateQuiz,
  deleteQuiz,
  togglePublishQuiz,
  getQuizTitlesByUser,
};
