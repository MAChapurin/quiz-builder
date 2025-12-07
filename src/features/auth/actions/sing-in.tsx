"use server";

import { sessionService, verifyUserPassword } from "@/entities/user/server";
import { z } from "zod";

export type SignInFormState = {
  formData?: FormData;
  errors?: {
    email?: string;
    password?: string;
    _errors?: string;
  };
};

const formDataSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(3, "Пароль должен быть не менее 3 символов"),
});

export const signInAction = async (
  _state: SignInFormState,
  formData: FormData,
): Promise<SignInFormState & { success?: boolean }> => {
  const data = Object.fromEntries(formData.entries());

  const parsed = formDataSchema.safeParse(data);

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

  const verifyUserResult = await verifyUserPassword(parsed.data);

  if (verifyUserResult.type === "right") {
    await sessionService.addSession(verifyUserResult.value);
    return {
      formData,
      errors: undefined,
      success: true,
    };
  }

  return {
    formData,
    errors: {
      _errors: "Неверный email или пароль",
    },
  };
};
