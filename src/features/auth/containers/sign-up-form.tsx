"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useTranslations } from "next-intl";

import { useActionState } from "@/shared/hooks";
import { routes } from "@/shared/config";

import { AuthFormLayout } from "../ui/auth-form-layout";
import { AuthFieldsRegister } from "../ui/sign-up-fields";
import { SubmitButton } from "../ui/submit-button";
import { BottomLink } from "../ui/link";
import { ErrorMessage } from "../ui/error-message";
import { signUpAction, SignUpFormState } from "../actions/sign-up";

export function SignUpForm() {
  const router = useRouter();

  const tUi = useTranslations("features.auth.ui.register");
  const tActions = useTranslations("features.auth.actions.register");

  const [formState, action, isPending] = useActionState(
    signUpAction,
    {} as SignUpFormState,
    undefined,
    {
      success: tActions("toasts.success"),
      error: tActions("errors.generic"),
    },
  );

  useEffect(() => {
    if (formState.success && !isPending) {
      router.push(routes.QUIZZES);
    }
  }, [formState.success, isPending, router]);

  return (
    <AuthFormLayout
      title={tUi("title")}
      description={tUi("description")}
      action={action}
      fields={<AuthFieldsRegister {...formState} />}
      actions={
        <SubmitButton isPending={isPending}>
          {tUi("buttons.submit")}
        </SubmitButton>
      }
      error={<ErrorMessage error={formState.errors?._errors} />}
      link={
        <BottomLink
          text={tUi("link.text")}
          linkText={tUi("link.linkText")}
          url={routes.LOGIN}
        />
      }
    />
  );
}
