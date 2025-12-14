import { notFound } from "next/navigation";

import { Badge, Card, Center, Divider, Flex, Text, Title } from "@mantine/core";

import { inviteTokenService } from "@/entities/invite-token/server";
import { quizService } from "@/entities/quiz/server";
import { questionService } from "@/entities/question/server";
import { PracticePublicQuiz } from "@/features";
import { matchEither, pluralize } from "@/shared/lib";

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

  const [quizEither, questionsEither] = await Promise.all([
    quizService.getQuizService(quizId),
    questionService.getQuestionsByQuiz(quizId),
  ]);

  const quiz = matchEither(quizEither, {
    left: () => null,
    right: (q) => q,
  });

  const questions = matchEither(questionsEither, {
    left: () => null,
    right: (q) => q,
  });

  if (!quiz || !questions || questions.length === 0) {
    notFound();
  }

  return (
    <Center mih="70vh" px="md">
      <Card withBorder radius="lg" padding="xl" shadow="sm" maw={760} w="100%">
        <Flex justify="space-between" align="flex-start">
          <Title order={2}>{quiz.title}</Title>
          <Badge size="lg" variant="light" ml="auto">
            {questions.length}{" "}
            {pluralize(questions.length, ["вопрос", "вопроса", "вопросов"])}
          </Badge>
        </Flex>

        {quiz.description && <Text c="dimmed">{quiz.description}</Text>}

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
