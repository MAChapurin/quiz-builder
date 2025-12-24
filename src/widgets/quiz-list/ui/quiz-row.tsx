import { QuizWithQuestionsExtended } from "@/entities/quiz/domain";
import { formatDate, pluralize } from "@/shared/lib";
import { Badge, Group, Stack, Text } from "@mantine/core";
import { useLocale, useTranslations } from "next-intl";

export function QuizRow({ quiz }: { quiz: QuizWithQuestionsExtended }) {
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
