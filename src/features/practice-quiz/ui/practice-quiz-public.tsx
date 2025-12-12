"use client";
import { Button } from "@mantine/core";
import { QuestionEntity } from "@/entities/question/domain";
import { PracticeQuizView } from "./practice-quiz-view";
import { useState } from "react";

type PracticePublicQuizProps = {
  questions: QuestionEntity[];
};

export function PracticePublicQuiz({ questions }: PracticePublicQuizProps) {
  const [isStarted, setIsStated] = useState(false);
  return (
    <div>
      {!isStarted ? (
        <Button
          onClick={() => {
            setIsStated(true);
          }}
        >
          Пройти тест
        </Button>
      ) : (
        <PracticeQuizView questions={questions} />
      )}
    </div>
  );
}
