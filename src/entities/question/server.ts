import {
  createQuestion,
  deleteQuestion,
  updateQuestion,
  getQuestionsByQuiz,
} from "./services/question";

export const questionService = {
  createQuestion,
  getQuestionsByQuiz,
  updateQuestion,
  deleteQuestion,
};
