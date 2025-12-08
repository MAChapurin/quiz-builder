// // features/question/actions/edit-question.ts

// import { questionService } from "@/entities/question/server";
// import { CreateQuestionDTO } from "@/entities/question/dto";
// import { Either } from "@/shared/lib/either";

// export type EditQuestionFormState = FormActionState<CreateQuestionDTO>;

// export const editQuestionAction = async (
//   formData: FormData,
// ): Promise<Either<"question-update-failed" | "question-not-found", true>> => {
//   const questionId = formData.get("questionId") as string;
//   const quizId = formData.get("quizId") as string;

//   if (!questionId || !quizId) {
//     return { type: "left", error: "question-update-failed" };
//   }

//   const text = formData.get("text") as string;
//   const type = formData.get("type") as "SINGLE" | "MULTIPLE";
//   const optionsRaw = formData.get("options") as string;

//   let options: { id?: string; text: string; isCorrect: boolean }[] = [];
//   try {
//     options = JSON.parse(optionsRaw);
//   } catch {
//     // options остаются пустыми
//   }

//   const result = await questionService.updateQuestion(questionId, {
//     quizId,
//     text,
//     type,
//     options,
//   });

//   if (result.type === "left") return { type: "left", error: result.error };

//   return { type: "right", value: true };
// };
