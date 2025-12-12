import { Metadata } from "next";
import { Container, Title, Text } from "@mantine/core";

import { quizService } from "@/entities/quiz/server";
import { matchEither } from "@/shared/lib/either";
import { PublicQuizList } from "@/widgets/public-quiz-list/ui/public-quiz-list";

export const metadata: Metadata = {
  title: "Публичные квизы",
  description: "Квизы, доступные для прохождения всем пользователям",
};

export default async function PublicQuizPage() {
  const quizzesResult = await quizService.getPublishedQuizzesService();

  const quizzes = matchEither(quizzesResult, {
    left: () => [],
    right: (q) => q,
  });

  return (
    <Container size="lg">
      <Title order={1} className="my-6">
        Публичные квизы
      </Title>

      {quizzes.length === 0 ? (
        <Text color="dimmed">Пока нет опубликованных квизов.</Text>
      ) : (
        <PublicQuizList quizzes={quizzes} />
      )}
    </Container>
  );
}
