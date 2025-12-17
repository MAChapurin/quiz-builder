"use client";

import {
  Container,
  Title,
  Text,
  Stack,
  Card,
  Group,
  Badge,
  Button,
} from "@mantine/core";

import { QuizEntity } from "@/entities/quiz/domain";
import { QuestionEntity } from "@/entities/question/domain";

import { useRef } from "react";
import { emitter, pluralize } from "@/shared/lib";
import {
  IconCirclePlus,
  IconLinkPlus,
  IconPencil,
  IconPlayerPlay,
  IconTrash,
} from "@tabler/icons-react";
import {
  EditQuizModal,
  AddQuestionModal,
  DeleteQuestionModal,
  EditQuestionModal,
  PracticeQuizModal,
  SwitchPublicQuiz,
} from "@/features";
import { GenerateInviteModal } from "@/features/invite-link-modal/ui/invite-link-modal";

type QuizDetailProps = {
  quiz: QuizEntity;
  questions: QuestionEntity[];
};

export function QuizDetail({ quiz, questions }: QuizDetailProps) {
  const lastQuestionRef = useRef<HTMLDivElement>(null);
  return (
    <Container size="lg" py="lg">
      <Card withBorder p="lg" mb="md">
        <Group align="flex-start">
          <Stack style={{ flex: 1 }}>
            <Title order={1}>{quiz.title}</Title>
            {quiz.description && (
              <Text color="dimmed" size="sm">
                {quiz.description}
              </Text>
            )}
            <Badge>
              {questions.length}{" "}
              {pluralize(questions.length, ["вопрос", "вопроса", "вопросов"])}
            </Badge>
            <Badge variant="outline" color="gray">
              {quiz.attemptsCount}{" "}
              {pluralize(quiz.attemptsCount, [
                "прохождение",
                "прохождения",
                "прохождений",
              ])}
            </Badge>
          </Stack>
          <Stack>
            <Button
              justify="space-between"
              variant="default"
              leftSection={<IconPencil size={16} />}
              onClick={() => emitter.emit("quiz-edit-click", { id: quiz.id })}
            >
              Редактировать
            </Button>
            <Button
              justify="space-between"
              disabled={questions.length === 0}
              variant="default"
              leftSection={<IconPlayerPlay size={16} />}
              onClick={() =>
                emitter.emit("quiz-practice-click", { id: quiz.id })
              }
            >
              Пройти пробно
            </Button>
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
              Создать инвайт
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
              Добавить вопрос
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
            <Group align="stretch" justify="space-between" h="100%">
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
              <Stack justify="space-between" align="flex-end" ml={"auto"}>
                <Badge size="sm">
                  {q.type === "SINGLE" ? "Один вариант" : "Несколько"}
                </Badge>

                <Group>
                  <Button
                    variant="default"
                    size="sm"
                    leftSection={<IconPencil size={16} />}
                    onClick={() =>
                      emitter.emit("edit-question-click", { id: q.id })
                    }
                  >
                    Редактировать
                  </Button>
                  <Button
                    color="red"
                    variant="default"
                    size="sm"
                    leftSection={<IconTrash size={16} />}
                    onClick={() =>
                      emitter.emit("delete-question-click", { id: q.id })
                    }
                  >
                    Удалить
                  </Button>
                </Group>
              </Stack>
            </Group>
          </Card>
        ))}

        <Card withBorder p={0} radius={"md"}>
          <Button
            variant="default"
            fullWidth
            size="lg"
            radius={"md"}
            h={100}
            leftSection={<IconCirclePlus size={28} />}
            onClick={() => emitter.emit("add-question-click", { id: quiz.id })}
          >
            Добавить вопрос
          </Button>
        </Card>

        <div ref={lastQuestionRef} />
      </Stack>
      <div className="h-10" />
    </Container>
  );
}
