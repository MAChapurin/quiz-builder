"use client";

import { Modal } from "@mantine/core";
import { useEffect, useState } from "react";
import { emitter } from "@/shared/lib";
import { QuestionEntity } from "@/entities/question/domain";
import { PracticeQuizView } from "./practice-quiz-view";
import { useTranslations } from "next-intl";

type Props = {
  questions: QuestionEntity[];
};

export function PracticeQuizModal({ questions }: Props) {
  const [isOpen, setOpened] = useState(false);
  const t = useTranslations("features.practiceQuiz.ui.modal");

  useEffect(() => {
    return emitter.subscribe("quiz-practice-click", () => {
      setOpened(true);
    });
  }, []);

  return (
    <Modal
      opened={isOpen}
      onClose={() => setOpened(false)}
      title={t("title")}
      size="lg"
    >
      <PracticeQuizView questions={questions} quizId="" />
    </Modal>
  );
}
