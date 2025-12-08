// "use client";

// import { useState, useEffect } from "react";
// import {
//   Modal,
//   Stack,
//   TextInput,
//   Button,
//   Select,
//   Checkbox,
//   Group,
// } from "@mantine/core";
// import { useActionState } from "@/shared/lib/react";
// import {
//   editQuestionAction,
//   EditQuestionFormState,
// } from "../actions/edit-question";
// import { QuizEntity } from "@/entities/quiz/domain";
// import { emitter } from "@/shared/lib";

// type OptionInput = { id?: string; text: string; isCorrect: boolean };

// export function EditQuestionModal({ quizzes }: { quizzes: QuizEntity[] }) {
//   const [opened, setOpened] = useState(false);
//   const [quizId, setQuizId] = useState<string | null>(null);
//   const [questionId, setQuestionId] = useState<string | null>(null);
//   const [options, setOptions] = useState<OptionInput[]>([]);

//   const [formState, action, isPending] = useActionState(
//     editQuestionAction,
//     {} as EditQuestionFormState,
//   );

//   // Подписка на клик "Редактировать вопрос"
//   useEffect(() => {
//     return emitter.subscribe(
//       "edit-question-click",
//       ({ quizId, questionId, questionOptions }) => {
//         setQuizId(quizId);
//         setQuestionId(questionId);
//         setOptions(questionOptions);
//         setOpened(true);
//       },
//     );
//   }, []);

//   const handleOptionChange = (
//     index: number,
//     key: keyof OptionInput,
//     value: string | boolean,
//   ) => {
//     setOptions((prev) =>
//       prev.map((opt, i) => {
//         if (i !== index) return opt;

//         if (key === "text" && typeof value === "string") {
//           return { ...opt, text: value };
//         }
//         if (key === "isCorrect" && typeof value === "boolean") {
//           return { ...opt, isCorrect: value };
//         }

//         return opt;
//       }),
//     );
//   };

//   const addOption = () =>
//     setOptions([...options, { text: "", isCorrect: false }]);
//   const removeOption = (index: number) =>
//     setOptions(options.filter((_, i) => i !== index));

//   // Сброс формы после успешного редактирования
//   useEffect(() => {
//     if (formState.success && !isPending) {
//       setOpened(false);
//       setOptions([]);
//       setQuestionId(null);
//     }
//   }, [formState.success, isPending]);

//   if (!quizId || !questionId) return null;

//   return (
//     <Modal
//       opened={opened}
//       onClose={() => setOpened(false)}
//       title="Редактировать вопрос"
//     >
//       <form action={action}>
//         <input type="hidden" name="quizId" value={quizId} />
//         <input type="hidden" name="questionId" value={questionId} />

//         <Stack>
//           <TextInput
//             label="Текст вопроса"
//             name="text"
//             required
//             defaultValue={formState.formData?.get("text") as string}
//             error={formState.errors?.text}
//           />

//           <Select
//             label="Тип вопроса"
//             name="type"
//             data={[
//               { value: "SINGLE", label: "Один вариант" },
//               { value: "MULTIPLE", label: "Несколько вариантов" },
//             ]}
//             defaultValue={formState.formData?.get("type") as string}
//             error={formState.errors?.type}
//             required
//           />

//           <Stack gap="xs">
//             {options.map((opt, idx) => (
//               <Group key={idx} gap="xs">
//                 <TextInput
//                   placeholder="Вариант ответа"
//                   value={opt.text}
//                   onChange={(e) =>
//                     handleOptionChange(idx, "text", e.target.value)
//                   }
//                   required
//                   style={{ flex: 1 }}
//                 />
//                 <Checkbox
//                   label="Верный"
//                   checked={opt.isCorrect}
//                   onChange={(e) =>
//                     handleOptionChange(
//                       idx,
//                       "isCorrect",
//                       e.currentTarget.checked,
//                     )
//                   }
//                 />
//                 <Button
//                   type="button"
//                   variant="outline"
//                   color="red"
//                   onClick={() => removeOption(idx)}
//                 >
//                   ×
//                 </Button>
//               </Group>
//             ))}
//             <Button type="button" variant="outline" onClick={addOption}>
//               Добавить вариант
//             </Button>
//           </Stack>

//           <Button type="submit" loading={isPending}>
//             Сохранить изменения
//           </Button>
//         </Stack>

//         <input type="hidden" name="options" value={JSON.stringify(options)} />
//       </form>
//     </Modal>
//   );
// }
