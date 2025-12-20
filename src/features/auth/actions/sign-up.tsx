"use server";

import { createUser, sessionService } from "@/entities/user/server";
import { z } from "zod";
import { getTranslations } from "next-intl/server";

export type SignUpFormState = {
  formData?: FormData;
  errors?: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    _errors?: string;
  };
  successMessage?: string;
};

export const signUpAction = async (
  _state: SignUpFormState,
  formData: FormData,
): Promise<SignUpFormState & { success?: boolean }> => {
  const t = await getTranslations("features.auth.actions.register");

  const data = Object.fromEntries(formData.entries());

  const schema = z
    .object({
      name: z.string().min(1, t("errors.nameRequired")),
      email: z.string().email(t("errors.invalidEmail")),
      password: z.string().min(3, t("errors.shortPassword")),
      confirmPassword: z.string().min(3, t("errors.shortPassword")),
    })
    .refine((d) => d.password === d.confirmPassword, {
      message: t("errors.passwordMismatch"),
      path: ["confirmPassword"],
    });

  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    const f = parsed.error.format();
    return {
      formData,
      errors: {
        name: f.name?._errors?.join(", "),
        email: f.email?._errors?.join(", "),
        password: f.password?._errors?.join(", "),
        confirmPassword: f.confirmPassword?._errors?.join(", "),
        _errors: f._errors?.join(", "),
      },
    };
  }

  const { name, email, password } = parsed.data;

  const createResult = await createUser({ name, email, password });

  if (createResult.type === "right") {
    await sessionService.addSession(createResult.value);
    return {
      formData,
      errors: undefined,
      success: true,
      successMessage: t("toasts.success"),
    };
  }

  const errorMessage =
    {
      "user-login-exists": t("errors.userExists"),
    }[createResult.error] || t("errors.generic");

  return {
    formData,
    errors: {
      _errors: errorMessage,
    },
  };
};
