"use client";

import { AuthFormLayout } from "../ui/auth-form-layout";
import { AuthFields } from "../ui/sign-in-fields";
import { SubmitButton } from "../ui/submit-button";
import { BottomLink } from "../ui/link";

import { signInAction, SignInFormState } from "../actions/sing-in";
import { useActionState } from "@/shared/lib/react";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { routes } from "@/shared/config";
import { ErrorMessage } from "../ui/error-message";

export function SignInForm() {
  const router = useRouter();
  const [formState, action, isPending] = useActionState(
    signInAction,
    {} as SignInFormState,
    undefined,
    {
      success: "Добро пожаловать!",
      error: "Ошибка входа",
    },
  );

  useEffect(() => {
    if (formState.success && !isPending) {
      router.push(routes.DASHBOARD);
    }
  }, [formState.success, isPending, router]);

  return (
    <AuthFormLayout
      title="Вход"
      description="Добро пожаловать! Пожалуйста, войдите в свою учётную запись."
      action={action}
      fields={<AuthFields {...formState} />}
      actions={<SubmitButton isPending={isPending}> Отправить</SubmitButton>}
      error={<ErrorMessage error={formState.errors?._errors} />}
      link={
        <BottomLink
          text="У вас нет учетной записи?"
          linkText="Регистрация"
          url={routes.REGISTER}
        />
      }
    />
  );
}
