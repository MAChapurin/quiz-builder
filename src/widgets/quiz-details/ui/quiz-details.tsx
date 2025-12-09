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
import { useRef } from "react";
import { emitter } from "@/shared/lib";
import { IconCirclePlus } from "@tabler/icons-react";

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

      <Stack mt="lg" gap="md">
        {questions.map((q, index) => (
          <Card key={q.id} withBorder>
            <Group justify="space-between">
              <Text fw={600}>
                {index + 1}. {q.text}
              </Text>
              <Badge size="sm">
                {q.type === "SINGLE" ? "Один вариант" : "Несколько"}
              </Badge>
            </Group>

            <Stack mt="xs" gap={4}>
              {q.options.map((o) => (
                <Text key={o.id} size="sm" c={o.isCorrect ? "green" : "dimmed"}>
                  • {o.text}
                </Text>
              ))}
            </Stack>
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
