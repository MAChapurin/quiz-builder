import { quizRepository } from "../repositories/quiz";
import { CreateQuizDTO } from "../dto";
import {
  QuizEntity,
  QuizTitleEntity,
  QuizWithQuestionsExtended,
} from "../domain";
import { left, right, Either } from "@/shared/lib/either";

export const createQuiz = async (
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

export const getQuiz = async (
  id: string,
): Promise<Either<"quiz-not-found", QuizEntity>> => {
  const quiz = await quizRepository.getQuiz(id);
  if (!quiz) return left("quiz-not-found");
  return right(quiz);
};

export const getQuizzesByUser = async (
  authorId: string,
): Promise<Either<"no-quizzes", QuizEntity[]>> => {
  const quizzes = await quizRepository.getQuizzesByUser(authorId);
  if (!quizzes || quizzes.length === 0) return left("no-quizzes");
  return right(quizzes);
};

export const getQuizTitlesByUser = async (
  authorId: string,
): Promise<Either<"no-quizzes", QuizTitleEntity[]>> => {
  const quizzes = await quizRepository.getQuizTitlesByUser(authorId);

  if (!quizzes || quizzes.length === 0) {
    return left("no-quizzes");
  }

  return right(quizzes);
};

export const getQuizzesWithQuestionsByUser = async (
  userId: string,
): Promise<Either<"quizzes-not-found", QuizWithQuestionsExtended[]>> => {
  const quizzes = await quizRepository.getQuizzesByUserWithQuestions(userId);

  if (!quizzes || quizzes.length === 0) {
    return left("quizzes-not-found");
  }

  return right(
    quizzes.map((quiz) => ({
      ...quiz,
      attemptsCount: quiz._count.attempts,
      questionsCount: quiz._count.questions,
    })),
  );
};

export const updateQuiz = async (
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

export const deleteQuiz = async (
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

export const togglePublishQuiz = async (
  id: string,
  isPublished: boolean,
): Promise<
  Either<
    "quiz-not-found" | "quiz-update-failed" | "quiz-has-no-questions",
    QuizEntity
  >
> => {
  const quiz = await quizRepository.getQuiz(id);
  if (!quiz) return left("quiz-not-found");

  if (isPublished) {
    const count = await quizRepository.getQuizQuestionsCount(id);

    if (count === 0) {
      return left("quiz-has-no-questions");
    }
  }

  try {
    const updated = await quizRepository.togglePublishQuiz(id, isPublished);
    return right(updated);
  } catch (err) {
    console.log(err);
    return left("quiz-update-failed");
  }
};
