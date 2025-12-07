"use client";

import { AuthFormLayout } from "../ui/auth-form-layout";
import { SubmitButton } from "../ui/submit-button";

import { BottomLink } from "../ui/link";

import { useActionState } from "@/shared/lib/react";
import { SignUnFormState, signUpAction } from "../actions/sign-up";

import { AuthFieldsRegister } from "../ui/sign-up-fields";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/shared/config";
import { ErrorMessage } from "../ui/error-message";

export function SignUpForm() {
  const router = useRouter();

  const [formState, action, isPending] = useActionState(
    signUpAction,
    {} as SignUnFormState,
    undefined,
    {
      success: "Добро пожаловать в QuizBuilder",
      error: "Ошибка при регистрации",
    },
  );

  useEffect(() => {
    if (formState.success && !isPending) {
      router.push(routes.DASHBOARD);
    }
  }, [formState.success, isPending, router]);

  return (
    <AuthFormLayout
      title="Регистрация"
      description="Создайте свою учетную запись, чтобы начать"
      action={action}
      fields={<AuthFieldsRegister {...formState} />}
      actions={<SubmitButton isPending={isPending}>Отправить</SubmitButton>}
      error={<ErrorMessage error={formState.errors?._errors} />}
      link={
        <BottomLink
          text="У вас уже есть аккаунт?"
          linkText="Вход"
          url={routes.LOGIN}
        />
      }
    />
  );
}
