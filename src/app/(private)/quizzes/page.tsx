import Link from "next/link";
import { cookies } from "next/headers";
import { Metadata } from "next";
import { Button, Container } from "@mantine/core";

import { routes } from "@/shared/config";
import { matchEither } from "@/shared/lib/either";
import { sessionService } from "@/entities/user/server";
import { quizService } from "@/entities/quiz/server";
import { CreateQuizButton } from "@/features";
import { QuizList, QuizListViewType } from "@/widgets";

export const metadata: Metadata = {
  title: "Мои квизы",
  description: "Список ваших квизов",
};

export default async function QuizzesPage() {
  const { session } = await sessionService.verifySession();
  if (!session) return <UserNotFound />;

  const cookieStore = await cookies();
  const view = cookieStore.get("quizView")?.value ?? "cards";

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
      <div className="flex justify-between items-center my-4">
        <h1 className="text-xl font-bold">Мои квизы</h1>
        <CreateQuizButton />
      </div>

      {quizzes.length === 0 ? (
        <p>У вас пока нет квизов</p>
      ) : (
        <QuizList quizzes={quizzes} initialView={view as QuizListViewType} />
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
