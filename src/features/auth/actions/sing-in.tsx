"use server";

import { sessionService, verifyUserPassword } from "@/entities/user/server";
import { z } from "zod";
import { getTranslations } from "next-intl/server";

export type SignInFormState = {
  formData?: FormData;
  errors?: {
    email?: string;
    password?: string;
    _errors?: string;
  };
  successMessage?: string;
};

export const signInAction = async (
  _state: SignInFormState,
  formData: FormData,
): Promise<SignInFormState & { success?: boolean }> => {
  const t = await getTranslations("features.auth.actions.login");

  const data = Object.fromEntries(formData.entries());

  const schema = z.object({
    email: z.string().email(t("errors.invalidEmail")),
    password: z.string().min(3, t("errors.shortPassword")),
  });

  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    const f = parsed.error.format();
    return {
      formData,
      errors: {
        email: f.email?._errors?.join(", "),
        password: f.password?._errors?.join(", "),
        _errors: f._errors?.join(", "),
      },
    };
  }

  const result = await verifyUserPassword(parsed.data);

  if (result.type === "right") {
    await sessionService.addSession(result.value);
    return {
      formData,
      errors: undefined,
      success: true,
      successMessage: t("toasts.success"),
    };
  }

  return {
    formData,
    errors: {
      _errors: t("errors.invalidCredentials"),
    },
  };
};
