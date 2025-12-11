import { quizRepository } from "../repositories/quiz";
import { CreateQuizDTO } from "../dto";
import { QuizEntity, QuizWithQuestions } from "../domain";
import { left, right, Either } from "@/shared/lib/either";

export const createQuizService = async (
  data: CreateQuizDTO,
): Promise<Either<"quiz-creation-failed", QuizEntity>> => {
  try {
    const quiz = await quizRepository.createQuiz(data);
    return right(quiz);
  } catch (err) {
    console.log(err);
    return left("quiz-creation-failed");
  }
};

export const getQuizService = async (
  id: string,
): Promise<Either<"quiz-not-found", QuizEntity>> => {
  const quiz = await quizRepository.getQuiz(id);
  if (!quiz) return left("quiz-not-found");
  return right(quiz);
};

export const getQuizzesByUserService = async (
  authorId: string,
): Promise<Either<"no-quizzes", QuizEntity[]>> => {
  const quizzes = await quizRepository.getQuizzesByUser(authorId);
  if (!quizzes || quizzes.length === 0) return left("no-quizzes");
  return right(quizzes);
};

export const getQuizzesWithQuestionsByUser = async (
  userId: string,
): Promise<Either<"quizzes-not-found", QuizWithQuestions[]>> => {
  const quizzes = await quizRepository.getQuizzesByUserWithQuestions(userId);

  if (!quizzes || quizzes.length === 0) {
    return left("quizzes-not-found");
  }

  return right(quizzes);
};

export const updateQuizService = async (
  id: string,
  data: Partial<CreateQuizDTO>,
): Promise<Either<"quiz-update-failed" | "quiz-not-found", QuizEntity>> => {
  const existingQuiz = await quizRepository.getQuiz(id);
  if (!existingQuiz) return left("quiz-not-found");

  try {
    const updatedQuiz = await quizRepository.updateQuiz(id, data);
    return right(updatedQuiz);
  } catch (err) {
    console.log(err);
    return left("quiz-update-failed");
  }
};

export const deleteQuizService = async (
  id: string,
): Promise<Either<"quiz-delete-failed" | "quiz-not-found", true>> => {
  const existingQuiz = await quizRepository.getQuiz(id);
  if (!existingQuiz) return left("quiz-not-found");

  try {
    await quizRepository.deleteQuiz(id);
    return right(true);
  } catch (err) {
    console.log(err);
    return left("quiz-delete-failed");
  }
};
