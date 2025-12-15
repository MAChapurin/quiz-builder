"use client";

import { Chip, Group, Button, Flex, Loader } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { QuizTitleEntity } from "@/entities/quiz/domain";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setCookie, removeCookie, emitter } from "@/shared/lib";
import { COOKIE_KEYS, QUERY_KEYS } from "@/shared/config";

export function AttemptsQuizFilterChips({
  titles,
  initialValue,
}: {
  titles: QuizTitleEntity[];
  initialValue?: string[];
}) {
  const router = useRouter();
  const [activeIds, setActiveIds] = useState<string[]>(initialValue ?? []);
  const [isPending, startTransition] = useTransition();

  const updateFilter = (ids: string[]) => {
    setActiveIds(ids);

    startTransition(() => {
      const params = new URLSearchParams(window.location.search);

      if (ids.length > 0) {
        params.set(QUERY_KEYS.QUIZ, ids.join(","));
        setCookie(COOKIE_KEYS.ATTEMPT, ids.join(","), 30);
      } else {
        params.delete(QUERY_KEYS.QUIZ);
        removeCookie(COOKIE_KEYS.ATTEMPT);
      }

      const query = params.toString();
      router.push(query ? `?${query}` : "?", { scroll: false });
    });
  };

  const onChange = (values: string[]) => updateFilter(values);
  const onReset = () => updateFilter([]);

  useEffect(() => {
    return emitter.subscribe("attempt-filter-reset", onReset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!titles || titles.length === 0) return null;

  return (
    <Flex align="center" gap="md" wrap="wrap" mb="md">
      <Chip.Group multiple value={activeIds} onChange={onChange}>
        <Group gap="sm" wrap="wrap">
          {titles.map((quiz) => (
            <Chip key={quiz.id} value={quiz.id}>
              {quiz.title}
            </Chip>
          ))}
        </Group>
      </Chip.Group>

      <Button
        variant="default"
        size="xs"
        onClick={onReset}
        leftSection={isPending ? <Loader size="xs" /> : <IconX size={16} />}
        disabled={isPending || activeIds.length === 0}
      >
        Сбросить фильтры
      </Button>
    </Flex>
  );
}
