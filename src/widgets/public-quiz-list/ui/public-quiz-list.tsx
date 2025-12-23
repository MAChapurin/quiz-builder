"use client";

import Link from "next/link";
import { Card, Stack, Text, Badge, Flex, Divider } from "@mantine/core";
import { QuizWithQuestions } from "@/entities/quiz/domain";
import { formatDate, pluralize } from "@/shared/lib";
import { useLocale } from "next-intl";

interface PublicQuizListProps {
  quizzes: QuizWithQuestions[];
}

export function PublicQuizList({ quizzes }: PublicQuizListProps) {
  const locale = useLocale();
  if (quizzes.length === 0) {
    return <Text color="dimmed">Пока нет опубликованных квизов.</Text>;
  }

  return (
    <Stack>
      {quizzes.map((quiz) => (
        <Card
          key={quiz.id}
          withBorder
          radius="md"
          p="lg"
          component={Link}
          href={`/public-quiz/${quiz.id}`}
          className="hover:shadow-lg transition-shadow"
        >
          <Stack>
            <Flex justify="space-between" align="center">
              <Text fw={600} size="lg" lineClamp={2}>
                {quiz.title}
              </Text>
              <Text size="xs" color="gray">
                {formatDate(quiz.createdAt.toISOString().slice(0, 10), locale)}
              </Text>
            </Flex>

            {quiz.description && (
              <Text size="sm" color="dimmed" lineClamp={2}>
                {quiz.description}
              </Text>
            )}

            <Divider my="sm" />

            <Flex gap="xs" wrap="wrap">
              <Badge size="xs" variant="outline" color="blue">
                {quiz.questions.length}{" "}
                {pluralize(quiz.questions.length, [
                  "вопрос",
                  "вопроса",
                  "вопросов",
                ])}
              </Badge>
              <Badge size="xs" variant="outline" color="blue">
                {quiz.questions.length}{" "}
                {pluralize(quiz.questions.length, [
                  "прохождение",
                  "прохождения",
                  "прохождений",
                ])}
              </Badge>
            </Flex>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
}
