"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";

import {
  Container,
  Title,
  Text,
  Stack,
  Card,
  Group,
  Badge,
  Button,
  Divider,
} from "@mantine/core";
import {
  IconCirclePlus,
  IconLinkPlus,
  IconPencil,
  IconPlayerPlay,
  IconTrash,
} from "@tabler/icons-react";

import { QuizEntity } from "@/entities/quiz/domain";
import { QuestionEntity } from "@/entities/question/domain";
import {
  EditQuizModal,
  AddQuestionModal,
  DeleteQuestionModal,
  EditQuestionModal,
  GenerateInviteModal,
  PracticeQuizModal,
  SwitchPublicQuiz,
} from "@/features";
import { emitter, pluralize } from "@/shared/lib";

type QuizDetailProps = {
  quiz: QuizEntity;
  questions: QuestionEntity[];
};

export function QuizDetail({ quiz, questions }: QuizDetailProps) {
  const t = useTranslations("widgets.quizDetail");
  const lastQuestionRef = useRef<HTMLDivElement>(null);

  console.log({ quiz, questions });

  return (
    <Container size="lg" py="lg">
      <Card withBorder p="lg" mb="md">
        <Group align="stretch">
          <Stack style={{ flex: 1 }}>
            <Title order={1}>{quiz.title}</Title>

            {quiz.description && (
              <Text c="dimmed" size="sm">
                {quiz.description}
              </Text>
            )}

            <Group mt="auto">
              <Badge>
                {questions.length}{" "}
                {pluralize(questions.length, [
                  t("badges.questions.one"),
                  t("badges.questions.few"),
                  t("badges.questions.many"),
                ])}
              </Badge>

              <Badge variant="outline" color="gray">
                {quiz.attemptsCount}{" "}
                {pluralize(quiz.attemptsCount, [
                  t("badges.attempts.one"),
                  t("badges.attempts.few"),
                  t("badges.attempts.many"),
                ])}
              </Badge>
            </Group>
          </Stack>

          <Stack>
            <SwitchPublicQuiz
              quizId={quiz.id}
              initialValue={quiz.isPublished}
              variant="button"
              disabled={questions.length === 0}
            />

            <Button
              justify="space-between"
              disabled={questions.length === 0 || !quiz.isPublished}
              variant="default"
              leftSection={<IconLinkPlus size={20} />}
              onClick={() =>
                emitter.emit("invite-token-click", { id: quiz.id })
              }
            >
              {t("actions.createInvite")}
            </Button>

            <Divider />

            <Button
              justify="space-between"
              disabled={questions.length === 0}
              variant="default"
              leftSection={<IconPlayerPlay size={16} />}
              onClick={() =>
                emitter.emit("quiz-practice-click", { id: quiz.id })
              }
            >
              {t("actions.practice")}
            </Button>

            <Button
              justify="space-between"
              variant="default"
              leftSection={<IconPencil size={16} />}
              onClick={() => emitter.emit("quiz-edit-click", { id: quiz.id })}
            >
              {t("actions.editQuiz")}
            </Button>

            <Button
              justify="space-between"
              variant="default"
              leftSection={<IconCirclePlus size={20} />}
              onClick={() =>
                emitter.emit("add-question-click", { id: quiz.id })
              }
              mb="md"
            >
              {t("actions.addQuestion")}
            </Button>
          </Stack>
        </Group>
      </Card>

      <EditQuizModal quizzes={[quiz]} />
      <AddQuestionModal scrollToRef={lastQuestionRef} />
      <EditQuestionModal questions={questions} />
      <DeleteQuestionModal questions={questions} />
      <PracticeQuizModal questions={questions} />
      <GenerateInviteModal quizzes={[quiz]} />

      <Stack mt="lg" gap="md">
        {questions.map((q, index) => (
          <Card key={q.id} withBorder p="md">
            <Group align="stretch" justify="space-between">
              <Stack>
                <Text fw={600}>
                  {index + 1}. {q.text}
                </Text>

                <Stack mt="xs" gap={4}>
                  {q.options.map((o) => (
                    <Text
                      key={o.id}
                      size="sm"
                      c={o.isCorrect ? "green" : "dimmed"}
                    >
                      • {o.text}
                    </Text>
                  ))}
                </Stack>
              </Stack>

              <Stack justify="space-between" align="flex-end">
                <Badge size="sm">
                  {q.type === "SINGLE"
                    ? t("questionType.single")
                    : t("questionType.multiple")}
                </Badge>

                <Group>
                  <Button
                    size="sm"
                    variant="default"
                    leftSection={<IconPencil size={16} />}
                    onClick={() =>
                      emitter.emit("edit-question-click", { id: q.id })
                    }
                  >
                    {t("actions.editQuestion")}
                  </Button>

                  <Button
                    size="sm"
                    color="red"
                    variant="default"
                    leftSection={<IconTrash size={16} />}
                    onClick={() =>
                      emitter.emit("delete-question-click", { id: q.id })
                    }
                  >
                    {t("actions.deleteQuestion")}
                  </Button>
                </Group>
              </Stack>
            </Group>
          </Card>
        ))}

        <Card withBorder p={0}>
          <Button
            variant="default"
            fullWidth
            size="lg"
            h={100}
            leftSection={<IconCirclePlus size={28} />}
            onClick={() => emitter.emit("add-question-click", { id: quiz.id })}
          >
            {t("actions.addQuestion")}
          </Button>
        </Card>

        <div ref={lastQuestionRef} />
      </Stack>
    </Container>
  );
}
