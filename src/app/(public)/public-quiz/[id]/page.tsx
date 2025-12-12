import { questionService } from "@/entities/question/server";
import { quizService } from "@/entities/quiz/server";
import { PracticePublicQuiz } from "@/features/practice-quiz/ui/practice-quiz-public";
import { routes } from "@/shared/config";

import {
  Card,
  Title,
  Text,
  Button,
  Center,
  Stack,
  Box,
  Badge,
  Flex,
  Divider,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import Link from "next/link";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const result = await quizService.getQuizService(id);

  if (result.type === "left") {
    return <NotFoundQuiz />;
  }

  const quiz = result.value;
  const questionsResult = await questionService.getQuestionsByQuiz(id);
  const questions =
    questionsResult.type === "right" ? questionsResult.value : [];

  return (
    <Center className="min-h-[70vh] px-4">
      <Card
        withBorder
        radius="lg"
        padding="xl"
        shadow="md"
        className="max-w-3xl w-full"
      >
        <Flex justify={"space-between"}>
          <Stack>
            <Title>{quiz.title}</Title>
            <Text>{quiz.description}</Text>
          </Stack>
          <Badge>{questions.length}</Badge>
        </Flex>
        <Divider my={16} />
        <PracticePublicQuiz questions={questions} />
      </Card>
    </Center>
  );
}

const NotFoundQuiz = () => (
  <Center className="min-h-[70vh] px-4">
    <Card
      radius="lg"
      padding="xl"
      shadow="md"
      className="max-w-md w-full border border-gray-200"
    >
      <Stack align="center" gap="md">
        <Box className="text-red-500">
          <IconAlertCircle size={48} />
        </Box>
        <Title order={2} className="text-center">
          Квиз не найден
        </Title>
        <Text c="dimmed" ta="center">
          Похоже, такого квиза не существует или он был удалён
        </Text>
        <Button
          component={Link}
          href={routes.PUBLIC_QUIZ}
          variant="light"
          size="md"
          className="mt-4"
        >
          Вернуться к списку
        </Button>
      </Stack>
    </Card>
  </Center>
);
