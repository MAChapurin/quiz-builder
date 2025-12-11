"use client";

import { useActionState, useEffect } from "react";
import { ActionIcon, Loader, Tooltip } from "@mantine/core";
import { IconList } from "@tabler/icons-react";
import { fetchQuizQuestionsAction } from "../actions/get-questions-by-quiz";

export function FetchQuizQuestionsButton({ quizId }: { quizId: string }) {
  const [state, formAction, isPending] = useActionState(
    fetchQuizQuestionsAction,
    {},
  );

  useEffect(() => {
    if (state?.questions) {
      console.log("Вопросы квиза:", state.questions);
    }

    if (state?.errors?._errors) {
      console.error("Ошибка:", state.errors._errors);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <input type="hidden" name="quizId" value={quizId} />

      <Tooltip label="Загрузить вопросы">
        <ActionIcon
          type="submit"
          variant="outline"
          size="md"
          loading={isPending}
          disabled={isPending}
        >
          {isPending ? <Loader size="xs" /> : <IconList size={16} />}
        </ActionIcon>
      </Tooltip>
    </form>
  );
}
