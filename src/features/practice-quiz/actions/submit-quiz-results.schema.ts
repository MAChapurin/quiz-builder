import { z } from "zod";

export const submitQuizResultsSchema = z.object({
  quizId: z.string().min(1),
  inviteTokenId: z.string().nullable().optional(),
  answers: z.record(z.string(), z.array(z.string())),
});

export type SubmitQuizResultsDto = z.infer<typeof submitQuizResultsSchema>;
