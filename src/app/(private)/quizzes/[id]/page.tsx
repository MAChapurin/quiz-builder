import { questionService } from "@/entities/question/server";
import { quizService } from "@/entities/quiz/server";
import { QuizDetail } from "@/widgets";
import { Card, Title, Text, Button, Center, Stack, Box } from "@mantine/core";
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

  return <QuizDetail quiz={quiz} questions={questions} />;
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
          href="/quizzes"
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
