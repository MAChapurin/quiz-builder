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

import { AddQuestionModal } from "@/features/question-crud/ui/add-question-modal";
import { EditQuestionModal } from "@/features/question-crud/ui/edit-question-modal";
import { DeleteQuestionModal } from "@/features/question-crud/ui/delete-question-modal";
import { useRef } from "react";
import { emitter } from "@/shared/lib";
import { IconCirclePlus, IconPencil, IconTrash } from "@tabler/icons-react";

type Props = {
  quiz: QuizEntity;
  questions: QuestionEntity[];
};

export function QuizDetail({ quiz, questions }: Props) {
  const lastQuestionRef = useRef<HTMLDivElement>(null);
  return (
    <Container size="lg" py="lg">
      <Title order={1}>{quiz.title}</Title>
      <Text mt="md" c="dimmed">
        {quiz.description}
      </Text>
      <Button
        leftSection={<IconCirclePlus size={20} />}
        onClick={() => emitter.emit("add-question-click", { id: quiz.id })}
        mb="md"
      >
        Добавить вопрос
      </Button>

      <AddQuestionModal scrollToRef={lastQuestionRef} />
      <EditQuestionModal questions={questions} />
      <DeleteQuestionModal questions={questions} />

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
                    fullWidth
                    variant="outline"
                    size="sm"
                    leftSection={<IconPencil size={16} />}
                    onClick={() =>
                      emitter.emit("edit-question-click", { id: q.id })
                    }
                  >
                    Редактировать
                  </Button>

                  <Button
                    fullWidth
                    color="red"
                    variant="outline"
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

        <Card withBorder p={0}>
          <Button
            variant="subtle"
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
