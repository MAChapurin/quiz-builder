"use server";

import { inviteTokenService } from "@/entities/invite-token/server";
import { matchEither } from "@/shared/lib/either";
import { getTranslations } from "next-intl/server";

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
  const t = await getTranslations("features.invite.actions.create");

  const quizId = formData.get("quizId") as string | null;
  const label = formData.get("label") as string | null;

  if (!quizId) {
    return {
      formData,
      errors: { _errors: t("errors.missingQuizId") },
    };
  }

  if (!label) {
    return {
      formData,
      errors: { _errors: t("errors.missingLabel") },
    };
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
      return {
        formData,
        errors: { _errors: t("errors.createFailed") },
      };
    }

    return {
      formData,
      token,
      success: true,
    };
  } catch (err) {
    console.error(err);
    return {
      formData,
      errors: { _errors: t("errors.generic") },
    };
  }
};
