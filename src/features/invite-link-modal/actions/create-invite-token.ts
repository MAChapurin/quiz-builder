"use server";

import { inviteTokenService } from "@/entities/invite-token/server";
import { matchEither } from "@/shared/lib/either";

export type CreateInviteTokenFormState = {
  formData?: FormData;
  errors?: { _errors?: string };
  token?: string;
  success?: boolean;
};

export const createInviteTokenAction = async (
  _state: CreateInviteTokenFormState,
  formData: FormData,
): Promise<CreateInviteTokenFormState> => {
  const quizId = formData.get("quizId") as string;
  const label = formData.get("label") as string | undefined;

  if (!quizId) {
    return { formData, errors: { _errors: "Не указан ID квиза" } };
  }

  try {
    const tokenEither = await inviteTokenService.generateInviteToken(
      quizId,
      label,
    );

    const token = matchEither(tokenEither, {
      left: () => undefined,
      right: (t) => t,
    });

    if (!token) {
      return { formData, errors: { _errors: "Не удалось создать ссылку" } };
    }

    return { formData, token, success: true };
  } catch (err) {
    console.error(err);
    return { formData, errors: { _errors: "Ошибка при создании ссылки" } };
  }
};
