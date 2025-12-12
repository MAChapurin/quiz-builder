"use client";
import { Button } from "@mantine/core";
import { QuestionEntity } from "@/entities/question/domain";
import { PracticeQuizView } from "./practice-quiz-view";
import { useState } from "react";

type PracticePublicQuizProps = {
  questions: QuestionEntity[];
  quizId: string;
};

export function PracticePublicQuiz({
  questions,
  quizId,
}: PracticePublicQuizProps) {
  const [isStarted, setIsStated] = useState(false);
  return (
    <div>
      {!isStarted ? (
        <Button
          onClick={() => {
            setIsStated(true);
          }}
        >
          Начать
        </Button>
      ) : (
        <PracticeQuizView questions={questions} quizId={quizId} mode="public" />
      )}
    </div>
  );
}
