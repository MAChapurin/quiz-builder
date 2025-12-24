import { getCurrentUser, sessionService } from "@/entities/user/server";
import { attemptService } from "@/entities/attempt/server";
import { quizService } from "@/entities/quiz/server";
import { QuizWithQuestionsExtended } from "@/entities/quiz/domain";
import { LogOutButton } from "@/features";

import {
  matchEither,
  formatDate,
  pluralize,
  getServerCookies,
} from "@/shared/lib";
import { COOKIE_KEYS, routes } from "@/shared/config";

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
import { getTranslations } from "next-intl/server";
import { useLocale, useTranslations } from "next-intl";
import { AttemptHeatmap } from "@/widgets";

export default async function ProfilePage() {
  const t = await getTranslations("app.profile.page");
  const cookies = await getServerCookies();
  const locale = cookies[COOKIE_KEYS.LOCALE] || "ru";

  const [{ session }, user] = await Promise.all([
    sessionService.verifySession(),
    getCurrentUser(),
  ]);

  if (!user) {
    return (
      <Container size="sm" py="xl">
        <Text c="red">{t("userNotFound")}</Text>
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

  const quizStats = quizzes.reduce(
    (acc, q) => {
      acc.totalQuizzes++;

      if (q.isPublished) {
        acc.published++;
      } else {
        acc.drafts++;
      }

      acc.totalQuestions += q.questions.length;

      const createdAt = new Date(q.createdAt);
      acc.lastQuizDate =
        !acc.lastQuizDate || createdAt > acc.lastQuizDate
          ? createdAt
          : acc.lastQuizDate;

      return acc;
    },
    {
      totalQuizzes: 0,
      published: 0,
      drafts: 0,
      totalQuestions: 0,
      lastQuizDate: null as Date | null,
    },
  );

  let averageScore = 0;
  if (attempts.length) {
    let sum = 0;
    for (const a of attempts) {
      sum += a.score / a.total;
    }
    averageScore = Math.round((sum / attempts.length) * 100);
  }

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

        <AttemptHeatmap data={attempts} />

        <SimpleGrid cols={{ base: 2, xs: 3, lg: 6 }} spacing="md">
          <StatCard
            value={quizStats.totalQuizzes}
            label={pluralize(quizStats.totalQuizzes, [
              t("quizList.badges.questions.one"),
              t("quizList.badges.questions.few"),
              t("quizList.badges.questions.many"),
            ])}
          />
          <StatCard
            value={quizStats.published}
            label={t("quizList.publication.published")}
          />
          <StatCard
            value={quizStats.drafts}
            label={t("quizList.publication.unpublished")}
          />
          <StatCard
            value={quizStats.totalQuestions}
            label={pluralize(quizStats.totalQuestions, [
              t("quizList.badges.questions.one"),
              t("quizList.badges.questions.few"),
              t("quizList.badges.questions.many"),
            ])}
          />
          <StatCard
            value={attempts.length}
            label={pluralize(attempts.length, [
              t("quizList.badges.attempts.one"),
              t("quizList.badges.attempts.few"),
              t("quizList.badges.attempts.many"),
            ])}
          />
          <StatCard value={averageScore} label={t("stats.averageScore")} />
        </SimpleGrid>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          <Card withBorder>
            <Stack gap="sm">
              <Group justify="space-between">
                <Title order={5}>{t("quizList.title")}</Title>
                <Button
                  component={Link}
                  href={routes.QUIZZES}
                  variant="subtle"
                  size="xs"
                >
                  {t("quizList.all")}
                </Button>
              </Group>

              {quizzes.length ? (
                quizzes
                  .slice(0, 5)
                  .map((quiz) => <QuizRow key={quiz.id} quiz={quiz} />)
              ) : (
                <Text size="sm" c="dimmed">
                  {t("quizList.noQuizzes")}
                </Text>
              )}
            </Stack>
          </Card>

          <Card withBorder>
            <Stack gap="sm">
              <Title order={5}>{t("activity.title")}</Title>

              <Group justify="space-between">
                <Text size="sm" c="dimmed">
                  {t("activity.registrationDate")}
                </Text>
                <Text size="sm">{formatDate(user.createdAt, locale)}</Text>
              </Group>

              <Group justify="space-between">
                <Text size="sm" c="dimmed">
                  {t("activity.lastQuiz")}
                </Text>
                <Text size="sm">
                  {quizStats.lastQuizDate
                    ? formatDate(quizStats.lastQuizDate, locale)
                    : "—"}
                </Text>
              </Group>

              <Divider />

              <Button
                component={Link}
                href={routes.RESULTS}
                variant="light"
                fullWidth
              >
                {t("activity.resultsButton")}
              </Button>
            </Stack>
          </Card>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Card withBorder style={{ textAlign: "center", padding: "md" }}>
      <Stack gap={2} align="center">
        <Title order={4}>{value}</Title>
        <Text size="xs" c="dimmed" className="uppercase">
          {label}
        </Text>
      </Stack>
    </Card>
  );
}

function QuizRow({ quiz }: { quiz: QuizWithQuestionsExtended }) {
  const t = useTranslations("app.profile.page");
  const locale = useLocale();

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
          {quiz.isPublished
            ? t("quizList.publication.published")
            : t("quizList.publication.unpublished")}
        </Badge>
      </Group>
      <Text size="xs" c="dimmed">
        {quiz.questions.length}{" "}
        {pluralize(quiz.questions.length, [
          t("quizList.badges.questions.one"),
          t("quizList.badges.questions.few"),
          t("quizList.badges.questions.many"),
        ])}{" "}
        · {formatDate(quiz.createdAt, locale)}
      </Text>
    </Stack>
  );
}
