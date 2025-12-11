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
} from "@/features";

type Props = {
  quiz: QuizEntity;
  questions: QuestionEntity[];
};

export function QuizDetail({ quiz, questions }: Props) {
  const lastQuestionRef = useRef<HTMLDivElement>(null);
  return (
    <Container size="lg" py="lg">
      <Card withBorder p="lg" radius="md" mb="md">
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
          </Stack>
          <Stack>
            <Button
              variant="default"
              leftSection={<IconPencil size={16} />}
              onClick={() => emitter.emit("quiz-edit-click", { id: quiz.id })}
            >
              Редактировать квиз
            </Button>
            <Button
              disabled={questions.length === 0}
              variant="default"
              leftSection={<IconPlayerPlay size={16} />}
              onClick={() =>
                emitter.emit("quiz-practice-click", { id: quiz.id })
              }
            >
              Пройти пробно
            </Button>

            <Button
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
