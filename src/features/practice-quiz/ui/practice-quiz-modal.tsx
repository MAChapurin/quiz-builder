"use client";

import { Modal } from "@mantine/core";
import { useEffect, useState } from "react";
import { emitter } from "@/shared/lib";
import { QuestionEntity } from "@/entities/question/domain";
import { PracticeQuizView } from "./practice-quiz-view";

type Props = {
  questions: QuestionEntity[];
  title?: string;
};

export function PracticeQuizModal({
  questions,
  title = "Пробное прохождение квиза",
}: Props) {
  const [isOpen, setOpened] = useState(false);

  useEffect(() => {
    return emitter.subscribe("quiz-practice-click", () => {
      setOpened(true);
    });
  }, []);

  return (
    <Modal
      opened={isOpen}
      onClose={() => setOpened(false)}
      title={title}
      size="lg"
    >
      <PracticeQuizView questions={questions} quizId="" />
    </Modal>
  );
}
