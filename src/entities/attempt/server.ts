import { getAttemptsForAuthor } from "./services/get-attempts-for-author";
import { submitQuizResults } from "./services/submit-quiz-results";

export const attemptService = {
  getAttemptsForAuthor,
  submitQuizResults,
};
