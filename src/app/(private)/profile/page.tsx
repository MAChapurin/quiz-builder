import { getCurrentUser, sessionService } from "@/entities/user/server";
import { quizService } from "@/entities/quiz/server";
import { attemptService } from "@/entities/attempt/server";
import { matchEither, formatDateRu } from "@/shared/lib";

import {
  Container,
  Title,
  Text,
  Group,
  Avatar,
  Stack,
  Card,
  SimpleGrid,
  Divider,
  Badge,
  Button,
} from "@mantine/core";

import Link from "next/link";
import { routes } from "@/shared/config";
import { LogOutButton } from "@/features";
import { QuestionEntity } from "@/entities/question/domain";

export default async function ProfilePage() {
  const { session } = await sessionService.verifySession();
  const user = await getCurrentUser();

  if (!user) {
    return (
      <Container size="sm" py="xl">
        <Text c="red">Пользователь не найден</Text>
      </Container>
    );
  }

  const [quizzesEither, attemptsEither] = await Promise.all([
    quizService.getQuizzesWithQuestionsByUser(session.id),
    attemptService.getAttemptsForAuthor(session.id, []),
  ]);

  const quizzes = matchEither(quizzesEither, {
    left: () => [],
    right: (q) => q,
  });

  const attempts = matchEither(attemptsEither, {
    left: () => [],
    right: (a) => a,
  });

  const stats = {
    totalQuizzes: quizzes.length,
    published: quizzes.filter((q) => q.isPublished).length,
    drafts: quizzes.filter((q) => !q.isPublished).length,
    totalQuestions: quizzes.reduce((acc, q) => acc + q.questions.length, 0),
    totalAttempts: attempts.length,
    averageScore: calculateAverageScore(attempts),
  };

  const lastQuizDate = quizzes.reduce<Date | null>((latest, quiz) => {
    const quizDate = new Date(quiz.createdAt);
    return !latest || quizDate > latest ? quizDate : latest;
  }, null);

  return (
    <Container size="lg" py="xl">
      <Stack gap="md">
        <Group justify="space-between" wrap="wrap">
          <Group>
            <Avatar radius="xl" size="lg">
              {user.name?.[0]?.toUpperCase()}
            </Avatar>
            <Stack gap={2}>
              <Title order={3}>{user.name}</Title>
              <Text size="sm" c="dimmed">
                {user.email}
              </Text>
            </Stack>
          </Group>

          <LogOutButton withLabel />
        </Group>

        <SimpleGrid cols={{ base: 2, xs: 3, lg: 6 }} spacing="md">
          <StatCard label="Квизов" value={stats.totalQuizzes} />
          <StatCard label="Опубликовано" value={stats.published} />
          <StatCard label="Черновики" value={stats.drafts} />
          <StatCard label="Вопросов" value={stats.totalQuestions} />
          <StatCard label="Попыток" value={stats.totalAttempts} />
          <StatCard label="Средний балл" value={stats.averageScore} />
        </SimpleGrid>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          <Card withBorder>
            <Stack gap="sm">
              <Group justify="space-between">
                <Title order={5}>Мои квизы</Title>
                <Button
                  component={Link}
                  href={routes.QUIZZES}
                  variant="subtle"
                  size="xs"
                >
                  Все
                </Button>
              </Group>

              {quizzes.length ? (
                quizzes
                  .slice(0, 5)
                  .map((quiz) => <QuizRow key={quiz.id} quiz={quiz} />)
              ) : (
                <Text size="sm" c="dimmed">
                  У вас пока нет квизов
                </Text>
              )}
            </Stack>
          </Card>

          <Card withBorder>
            <Stack gap="sm">
              <Title order={5}>Активность</Title>

              <Group justify="space-between">
                <Text size="sm" c="dimmed">
                  Дата регистрации
                </Text>
                <Text size="sm">{formatDateRu(new Date(user.createdAt))}</Text>
              </Group>

              <Group justify="space-between">
                <Text size="sm" c="dimmed">
                  Последний квиз
                </Text>
                <Text size="sm">
                  {lastQuizDate ? formatDateRu(lastQuizDate) : "—"}
                </Text>
              </Group>

              <Divider />

              <Button
                component={Link}
                href={routes.RESULTS}
                variant="light"
                fullWidth
              >
                Перейти к результатам
              </Button>
            </Stack>
          </Card>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}

function calculateAverageScore(
  attempts: Array<{ score: number; total: number }>,
) {
  if (!attempts.length) return 0;
  const sum = attempts.reduce((acc, a) => acc + a.score / a.total, 0);
  return Math.round((sum / attempts.length) * 100);
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Card withBorder style={{ textAlign: "center", padding: "md" }}>
      <Stack gap={2} align="center">
        <Title order={4}>{value}</Title>
        <Text size="xs" c="dimmed">
          {label}
        </Text>
      </Stack>
    </Card>
  );
}

function QuizRow({
  quiz,
}: {
  quiz: {
    id: string;
    title: string;
    isPublished: boolean;
    questions: QuestionEntity[];
    createdAt: Date;
  };
}) {
  return (
    <Stack gap={4}>
      <Group justify="space-between">
        <Text size="sm" fw={500}>
          {quiz.title}
        </Text>
        <Badge
          size="sm"
          color={quiz.isPublished ? "green" : "gray"}
          variant="light"
        >
          {quiz.isPublished ? "Опубликован" : "Черновик"}
        </Badge>
      </Group>
      <Text size="xs" c="dimmed">
        {quiz.questions.length} вопросов · {formatDateRu(quiz.createdAt)}
      </Text>
    </Stack>
  );
}
