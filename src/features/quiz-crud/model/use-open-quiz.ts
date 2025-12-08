"use client";

import { useEffect } from "react";
import { emitter } from "@/shared/lib";
import { useRouter } from "next/navigation";
import { routes } from "@/shared/config";

export function useOpenQuiz() {
  const router = useRouter();

  useEffect(() => {
    return emitter.subscribe("quiz-open-click", ({ id }) => {
      router.push(`${routes.QUIZZES}/${id}`);
    });
  }, [router]);
}
