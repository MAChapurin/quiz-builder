import { notFound } from "next/navigation";
import { questionService } from "@/entities/question/server";
import { quizService } from "@/entities/quiz/server";
import { QuizDetail } from "@/widgets";
import { matchEither } from "@/shared/lib";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [quizResult, questionsResult] = await Promise.all([
    quizService.getQuiz(id),
    questionService.getQuestionsByQuiz(id),
  ]);

  const quiz = matchEither(quizResult, {
    left: () => notFound(),
    right: (q) => q,
  });

  const questions = matchEither(questionsResult, {
    left: () => [],
    right: (q) => q,
  });

  return <QuizDetail quiz={quiz} questions={questions} />;
}
