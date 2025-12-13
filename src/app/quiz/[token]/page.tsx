import { inviteTokenService } from "@/entities/invite-token/server";
import { quizService } from "@/entities/quiz/server";
import { questionService } from "@/entities/question/server";
import { matchEither } from "@/shared/lib/either";
import { pluralize } from "@/shared/lib";
import { notFound } from "next/navigation";

import {
  Badge,
  Card,
  Center,
  Divider,
  Flex,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { PracticePublicQuiz } from "@/features/practice-quiz/ui/practice-quiz-public";

export default async function QuizPlayPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const inviteEither = await inviteTokenService.consumeInviteToken(token);

  if (inviteEither.type === "left") {
    notFound();
  }

  const { quizId, inviteTokenId } = inviteEither.value;

  const quizEither = await quizService.getQuizService(quizId);
  const quiz = matchEither(quizEither, {
    left: () => null,
    right: (q) => q,
  });

  if (!quiz) {
    notFound();
  }

  const questionsEither = await questionService.getQuestionsByQuiz(quizId);
  const questions = matchEither(questionsEither, {
    left: () => null,
    right: (q) => q,
  });

  if (!questions || questions.length === 0) {
    notFound();
  }

  return (
    <Center mih="70vh" px="md">
      <Card withBorder radius="lg" padding="xl" shadow="sm" maw={760} w="100%">
        <Flex justify="space-between" align="flex-start">
          <Stack gap={4}>
            <Title order={2}>{quiz.title}</Title>
            {quiz.description && <Text c="dimmed">{quiz.description}</Text>}
          </Stack>

          <Badge size="lg" variant="light">
            {questions.length}{" "}
            {pluralize(questions.length, ["вопрос", "вопроса", "вопросов"])}
          </Badge>
        </Flex>
        <Divider my="lg" />
        <PracticePublicQuiz
          questions={questions}
          quizId={quizId}
          inviteTokenId={inviteTokenId}
        />
      </Card>
    </Center>
  );
}
