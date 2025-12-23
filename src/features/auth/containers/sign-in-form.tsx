"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

import { useActionState } from "@/shared/hooks";
import { routes } from "@/shared/config";

import { AuthFormLayout } from "../ui/auth-form-layout";
import { AuthFields } from "../ui/sign-in-fields";
import { SubmitButton } from "../ui/submit-button";
import { BottomLink } from "../ui/link";
import { ErrorMessage } from "../ui/error-message";

import { signInAction, SignInFormState } from "../actions/sing-in";

export function SignInForm() {
  const router = useRouter();

  const tUi = useTranslations("features.auth.ui.login");
  const tActions = useTranslations("features.auth.actions.login");

  const [formState, action, isPending] = useActionState(
    signInAction,
    {} as SignInFormState,
    undefined,
    {
      success: tActions("toasts.success"),
      error: tActions("toasts.error"),
    },
  );

  useEffect(() => {
    if (formState.success && !isPending) {
      router.push(routes.PROFILE);
    }
  }, [formState.success, isPending, router]);

  return (
    <AuthFormLayout
      title={tUi("title")}
      description={tUi("description")}
      action={action}
      fields={<AuthFields {...formState} />}
      actions={
        <SubmitButton isPending={isPending}>
          {tUi("buttons.submit")}
        </SubmitButton>
      }
      error={<ErrorMessage error={formState.errors?._errors} />}
      link={
        <BottomLink
          text={tUi("links.register").split("?")[0] + "?"}
          linkText={tUi("links.register").split("?")[1]}
          url={routes.REGISTER}
        />
      }
    />
  );
}
