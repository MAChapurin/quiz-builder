export type QuizAnswers = Record<string, string[]>;

export type QuizAttemptEntity = {
  id: string;
  quizTitle: string;
  score: number;
  total: number;
  label: string;
  createdAt: Date;
};

export function calculateScoreCorrectly(
  answers: QuizAnswers,
  correctOptionIdsByQuestion: Record<string, string[]>,
): number {
  let score = 0;

  for (const questionId of Object.keys(answers)) {
    const userAnswers = answers[questionId] ?? [];
    const correctAnswers = correctOptionIdsByQuestion[questionId] ?? [];

    const isCorrect =
      userAnswers.length === correctAnswers.length &&
      userAnswers.every((id) => correctAnswers.includes(id));

    if (isCorrect) score++;
  }

  return score;
}
