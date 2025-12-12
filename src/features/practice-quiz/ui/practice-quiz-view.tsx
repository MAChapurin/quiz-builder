"use client";

import {
  Stack,
  Text,
  Radio,
  Checkbox,
  Card,
  Group,
  Progress,
  Center,
  Box,
  Button,
  Collapse,
} from "@mantine/core";
import {
  IconCheck,
  IconListDetails,
  IconRefresh,
  IconX,
} from "@tabler/icons-react";
import { QuestionEntity } from "@/entities/question/domain";
import { useDisclosure } from "@mantine/hooks";
import { usePracticeQuiz } from "../model/use-practice-quiz";
import { useActionState } from "@/shared/lib/react";
import {
  submitQuizResultsAction,
  SubmitQuizResultsFormState,
} from "../actions/submit-quiz-results";

type PracticeMode = "test" | "public";

type PracticeQuizViewProps = {
  questions: QuestionEntity[];
  quizId: string;
  mode?: PracticeMode;
};

export function PracticeQuizView({
  questions,
  quizId,
  mode = "test",
}: PracticeQuizViewProps) {
  const [opened, { toggle }] = useDisclosure(false);

  const quiz = usePracticeQuiz(questions);

  const {
    currentQuestion,
    currentIndex,
    showResults,
    handleChange,
    nextQuestion,
    prevQuestion,
    restart,
    calculateScore,
    hasAnsweredCurrent,
    progressSections,
    answers,
  } = quiz;

  const isPublic = mode === "public";

  const [formState, action, isPending] = useActionState(
    submitQuizResultsAction,
    {} as SubmitQuizResultsFormState,
  );

  return (
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
                  <Radio key={o.id} value={o.id} label={o.text} my="xs" />
                ))}
              </Radio.Group>
            )}

            {currentQuestion.type === "MULTIPLE" && (
              <Stack gap={2}>
                {currentQuestion.options.map((o) => (
                  <Checkbox
                    my="xs"
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
          <Center>
            <Text fw={600} size="lg">
              Ваш результат: {calculateScore()} из {questions.length}
            </Text>
          </Center>

          {isPublic && (
            <form action={action}>
              <input type="hidden" name="quizId" value={quizId} />
              <input
                type="hidden"
                name="answers"
                value={JSON.stringify(answers)}
              />

              <Button
                fullWidth
                type="submit"
                loading={isPending}
                disabled={formState.success}
              >
                {formState.success
                  ? "Результаты отправлены"
                  : "Отправить результаты"}
              </Button>

              {formState.error && (
                <Text c="red" size="sm" mt="xs">
                  Не удалось отправить результаты
                </Text>
              )}
            </form>
          )}

          <Group className="flex flex-col xs:flex-row" mt="md">
            {!isPublic && (
              <Button
                className="w-full xs:w-fit"
                onClick={restart}
                leftSection={<IconRefresh size={16} />}
              >
                Пройти заново
              </Button>
            )}

            <Button
              disabled={isPublic && !formState.success}
              className="w-full xs:w-fit"
              onClick={toggle}
              leftSection={<IconListDetails size={16} />}
            >
              Посмотреть правильные ответы
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
          <Button disabled={!hasAnsweredCurrent} onClick={nextQuestion}>
            {currentIndex === questions.length - 1 ? "Завершить" : "Далее"}
          </Button>
        </Group>
      )}
    </Stack>
  );
}
