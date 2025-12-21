"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@mantine/core";
import { QuestionEntity } from "@/entities/question/domain";
import { PracticeQuizView } from "./practice-quiz-view";

type Props = {
  questions: QuestionEntity[];
  quizId: string;
  inviteTokenId: string;
};

export function PracticePublicQuiz({
  questions,
  quizId,
  inviteTokenId,
}: Props) {
  const [started, setStarted] = useState(false);
  const t = useTranslations("features.practiceQuiz.ui.public");

  return !started ? (
    <Button onClick={() => setStarted(true)}>{t("start")}</Button>
  ) : (
    <PracticeQuizView
      questions={questions}
      quizId={quizId}
      mode="public"
      inviteTokenId={inviteTokenId}
    />
  );
}
