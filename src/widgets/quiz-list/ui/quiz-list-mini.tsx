import { routes } from "@/shared/config";
import { Button, Card, Group, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import { QuizRow } from "./quiz-row";
import { useTranslations } from "next-intl";
import { QuizWithQuestionsExtended } from "@/entities/quiz/domain";

export function QuizListMini({
  quizzes,
}: {
  quizzes: QuizWithQuestionsExtended[];
}) {
  const t = useTranslations("app.profile.page");
  return (
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
  );
}
