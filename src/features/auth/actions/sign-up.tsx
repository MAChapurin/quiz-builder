"use server";

import { createUser, sessionService } from "@/entities/user/server";
import { z } from "zod";

export type SignUnFormState = {
  formData?: FormData;
  errors?: {
    password?: string;
    confirmPassword?: string;
    email?: string;
    name?: string;
    _errors?: string;
  };
};

const formDataSchema = z
  .object({
    password: z.string().min(3),
    confirmPassword: z.string().min(3),
    email: z.string().email("Некорректный email"),
    name: z.string().min(1, "Имя обязательно"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export const signUpAction = async (
  _state: SignUnFormState,
  formData: FormData,
): Promise<SignUnFormState & { success?: boolean }> => {
  const data = Object.fromEntries(formData.entries());
  const result = formDataSchema.safeParse(data);

  if (!result.success) {
    const formatedErrors = result.error.format();
    return {
      formData,
      errors: {
        password: formatedErrors.password?._errors.join(", "),
        confirmPassword: formatedErrors.confirmPassword?._errors.join(", "),
        email: formatedErrors.email?._errors.join(", "),
        name: formatedErrors.name?._errors.join(", "),
        _errors: formatedErrors._errors?.join(", "),
      },
    };
  }

  const { password, email, name } = result.data;

  const createUserResult = await createUser({
    password,
    email,
    name,
  });

  if (createUserResult.type === "right") {
    await sessionService.addSession(createUserResult.value);
    return {
      formData,
      errors: undefined,
      success: true,
    };
  }

  const errors = {
    "user-login-exists": "Пользователь с таким email уже существует",
  }[createUserResult.error];

  return {
    formData,
    errors: {
      _errors: errors,
    },
  };
};
