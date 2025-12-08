import { questionRepository } from "../repositories/question";
import { CreateQuestionDTO } from "../dto";
import { QuestionEntity, OptionEntity } from "../domain";
import { left, right, Either } from "@/shared/lib/either";

export const createQuestion = async (
  data: CreateQuestionDTO,
): Promise<
  Either<
    "question-creation-failed",
    QuestionEntity & { options: OptionEntity[] }
  >
> => {
  try {
    const question = await questionRepository.createQuestion(data);
    return right(question);
  } catch (err) {
    console.log(err);
    return left("question-creation-failed");
  }
};

export const getQuestionsByQuiz = async (
  quizId: string,
): Promise<
  Either<
    "questions-not-found",
    (QuestionEntity & { options: OptionEntity[] })[]
  >
> => {
  const questions = await questionRepository.getQuestionsByQuiz(quizId);
  if (!questions || questions.length === 0) return left("questions-not-found");
  return right(questions);
};

export const updateQuestion = async (
  id: string,
  data: Partial<Omit<CreateQuestionDTO, "quizId">> & {
    options?: { id?: string; text: string; isCorrect: boolean }[];
  },
): Promise<
  Either<
    "question-update-failed" | "question-not-found",
    (QuestionEntity & { options: OptionEntity[] })[]
  >
> => {
  try {
    const questions = await questionRepository.updateQuestion(id, data);
    return right(questions);
  } catch (err) {
    console.log(err);
    return left("question-update-failed");
  }
};

export const deleteQuestion = async (
  id: string,
): Promise<Either<"question-delete-failed" | "question-not-found", true>> => {
  try {
    await questionRepository.deleteQuestion(id);
    return right(true);
  } catch (err) {
    console.log(err);
    return left("question-delete-failed");
  }
};
