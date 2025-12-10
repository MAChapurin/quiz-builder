"use client";

import { useState } from "react";
import { QuestionEntity } from "@/entities/question/domain";

export function usePracticeQuiz(questions: QuestionEntity[]) {
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);

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
      setCurrentIndex((v) => v + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((v) => v - 1);
    }
  };

  const restart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setShowResults(false);
  };

  const hasAnsweredCurrent = currentQuestion
    ? (answers[currentQuestion.id]?.length || 0) > 0
    : false;

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

  return {
    answers,
    currentIndex,
    currentQuestion,
    showResults,
    handleChange,
    nextQuestion,
    prevQuestion,
    restart,
    calculateScore,
    hasAnsweredCurrent,
    progressSections,
  };
}
