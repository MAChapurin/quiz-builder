import { Metadata } from "next";
import { sessionService } from "@/entities/user/server";
import { quizService } from "@/entities/quiz/server";
import { matchEither } from "@/shared/lib/either";

import { CreateQuizButton } from "@/features/quiz-crud/ui/create-quiz-modal";
import { QuizTable } from "@/widgets/quiz-table/quiz-table";
import { Button, Container } from "@mantine/core";
import Link from "next/link";
import { routes } from "@/shared/config";

export const metadata: Metadata = {
  title: "Мои квизы",
  description: "Список ваших квизов",
};

export default async function QuizzesPage() {
  const { session } = await sessionService.verifySession();
  if (!session) return <UserNotFound />;

  const quizzesResult = await quizService.getQuizzesWithQuestionsByUser(
    session.id,
  );
  const quizzes = matchEither(quizzesResult, {
    left: () => [],
    right: (q) =>
      q.map((quiz) => ({
        ...quiz,
        createdAtFormatted: new Date(quiz.createdAt).toISOString().slice(0, 10),
      })),
  });

  return (
    <Container size={"lg"}>
      <div className="flex justify-between items-center my-10">
        <h1 className="text-xl font-bold">Мои квизы</h1>
        <CreateQuizButton />
      </div>

      {quizzes.length === 0 ? (
        <p>У вас пока нет квизов</p>
      ) : (
        <QuizTable quizzes={quizzes} />
      )}
    </Container>
  );
}

function UserNotFound() {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-2xl font-bold">Ошибка: пользователь не найден</h1>
      <p className="text-gray-500 mt-2">
        Пожалуйста, войдите в систему заново.
      </p>
      <Button component={Link} href={routes.LOGIN}>
        Войти
      </Button>
    </div>
  );
}
