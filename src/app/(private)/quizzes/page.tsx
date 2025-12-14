import { cookies } from "next/headers";
import { Metadata } from "next";
import { Center, Container, Stack, Text } from "@mantine/core";

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
  const [{ session }, cookieStore] = await Promise.all([
    sessionService.verifySession(),
    cookies(),
  ]);

  const view = cookieStore.get("quizView")?.value ?? "cards";

  const quizzesResult = await quizService.getQuizzesWithQuestionsByUser(
    session.id,
  );

  const quizzes = matchEither(quizzesResult, {
    left: () => [],
    right: (q) => q,
  });

  return (
    <Container size="lg">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-xl font-bold">Мои квизы</h1>
        <CreateQuizButton />
      </div>

      {quizzes.length === 0 ? (
        <Stack>
          <Center className="h-[50dvh]">
            <Text>У вас пока нет квизов</Text>
          </Center>
        </Stack>
      ) : (
        <QuizList quizzes={quizzes} initialView={view as QuizListViewType} />
      )}
    </Container>
  );
}
