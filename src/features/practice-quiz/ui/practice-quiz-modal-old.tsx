"use client";

import { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Stack,
  Text,
  Radio,
  Checkbox,
  Card,
  Group,
  Progress,
  Center,
  Box,
  Collapse,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCheck,
  IconListDetails,
  IconRefresh,
  IconX,
} from "@tabler/icons-react";
import { emitter } from "@/shared/lib";
import { QuestionEntity } from "@/entities/question/domain";

type PracticeQuizModalProps = {
  questions: QuestionEntity[];
  title?: string;
};

export function PracticeQuizModal({
  questions,
  title = "Пробное прохождение квиза",
}: PracticeQuizModalProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const [isOpen, setOpened] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    return emitter.subscribe("quiz-practice-click", () => {
      setOpened(true);
      setAnswers({});
      setCurrentIndex(0);
      setShowResults(false);
    });
  }, []);

  const currentQuestion = questions[currentIndex];

  const handleChange = (
    questionId: string,
    value: string,
    type: "SINGLE" | "MULTIPLE",
  ) => {
    setAnswers((prev) => {
      const prevAns = prev[questionId] || [];
      if (type === "SINGLE") return { ...prev, [questionId]: [value] };
      if (prevAns.includes(value)) {
        return { ...prev, [questionId]: prevAns.filter((v) => v !== value) };
      }
      return { ...prev, [questionId]: [...prevAns, value] };
    });
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      const correctIds = q.options.filter((o) => o.isCorrect).map((o) => o.id);
      const userIds = answers[q.id] || [];
      if (
        correctIds.length === userIds.length &&
        correctIds.every((id) => userIds.includes(id))
      ) {
        score += 1;
      }
    });
    return score;
  };

  const hasAnsweredCurrent = () =>
    currentQuestion ? (answers[currentQuestion.id]?.length || 0) > 0 : false;

  const restartQuiz = () => {
    setAnswers({});
    setCurrentIndex(0);
    setShowResults(false);
  };

  const progressSections = questions.map((q) => {
    const userAnswerIds = answers[q.id] || [];
    const correctIds = q.options.filter((o) => o.isCorrect).map((o) => o.id);
    const isCorrect =
      correctIds.length === userAnswerIds.length &&
      correctIds.every((id) => userAnswerIds.includes(id));
    return {
      value: 100 / questions.length,
      color: isCorrect ? "green" : userAnswerIds.length > 0 ? "pink" : "gray",
    };
  });

  return (
    <Modal
      opened={isOpen}
      onClose={() => setOpened(false)}
      title={title}
      size="lg"
    >
      <Stack gap="md">
        {!showResults ? (
          <Progress
            value={((currentIndex + 1) / questions.length) * 100}
            size="xl"
            radius="xl"
          />
        ) : (
          <Progress.Root size="xl" radius="xl">
            {progressSections.map((sec, idx) => (
              <Progress.Section key={idx} value={sec.value} color={sec.color}>
                <Progress.Label>{idx + 1}</Progress.Label>
              </Progress.Section>
            ))}
          </Progress.Root>
        )}

        {!showResults && currentQuestion && (
          <Card p="md" withBorder radius="md">
            <Stack gap="lg">
              <Text fw={600}>
                {currentIndex + 1}. {currentQuestion.text}
              </Text>

              {currentQuestion.type === "SINGLE" && (
                <Radio.Group
                  value={answers[currentQuestion.id]?.[0] || ""}
                  onChange={(val) =>
                    handleChange(currentQuestion.id, val, "SINGLE")
                  }
                >
                  {currentQuestion.options.map((o) => (
                    <Radio my="xs" key={o.id} value={o.id} label={o.text} />
                  ))}
                </Radio.Group>
              )}

              {currentQuestion.type === "MULTIPLE" && (
                <Stack gap={2}>
                  {currentQuestion.options.map((o) => (
                    <Checkbox
                      my={"xs"}
                      key={o.id}
                      value={o.id}
                      label={o.text}
                      checked={
                        answers[currentQuestion.id]?.includes(o.id) || false
                      }
                      onChange={() =>
                        handleChange(currentQuestion.id, o.id, "MULTIPLE")
                      }
                    />
                  ))}
                </Stack>
              )}
            </Stack>
          </Card>
        )}

        {showResults && (
          <Stack gap="sm">
            <Center mt="md">
              <Text fw={600} size="lg">
                Ваш результат: {calculateScore()} из {questions.length}
              </Text>
            </Center>
            <Group
              mt="md"
              justify="space-between"
              className="flex flex-col xs:flex-row"
            >
              <Button
                className="w-full xs:w-fit"
                onClick={restartQuiz}
                leftSection={<IconRefresh size={16} />}
              >
                Пройти заново
              </Button>
              <Button
                className="w-full xs:w-fit"
                onClick={toggle}
                leftSection={<IconListDetails size={16} />}
              >
                Посмотреть вопросы
              </Button>
              <Button
                className="w-full xs:w-fit"
                onClick={() => setOpened(false)}
                leftSection={<IconCheck size={16} />}
              >
                Завершить
              </Button>
            </Group>

            <Collapse in={opened}>
              {questions.map((q, index) => {
                const userAnswerIds = answers[q.id] || [];
                return (
                  <Card key={q.id} p="md" withBorder radius="md">
                    <Stack gap={4}>
                      <Text fw={600}>
                        {index + 1}. {q.text}
                      </Text>
                      {q.options.map((o) => {
                        const isCorrect = o.isCorrect;
                        const isSelected = userAnswerIds.includes(o.id);
                        return (
                          <Group key={o.id} gap={4} align="center">
                            <Box>
                              {isCorrect ? (
                                <IconCheck size={16} color="green" />
                              ) : isSelected ? (
                                <IconX size={16} color="red" />
                              ) : null}
                            </Box>
                            <Text
                              color={
                                isCorrect
                                  ? "green"
                                  : isSelected
                                    ? "red"
                                    : "dimmed"
                              }
                            >
                              {o.text}
                            </Text>
                          </Group>
                        );
                      })}
                    </Stack>
                  </Card>
                );
              })}
            </Collapse>
          </Stack>
        )}

        {!showResults && (
          <Group mt="md" justify="space-between">
            <Button disabled={currentIndex === 0} onClick={prevQuestion}>
              Назад
            </Button>
            <Button disabled={!hasAnsweredCurrent()} onClick={nextQuestion}>
              {currentIndex === questions.length - 1 ? "Завершить" : "Далее"}
            </Button>
          </Group>
        )}
      </Stack>
    </Modal>
  );
}
