"use client";

import React from "react";
import { TextInput, PasswordInput } from "@mantine/core";

export function AuthFields({
  errors,
  formData,
}: {
  formData?: FormData;
  errors?: {
    email?: string;
    password?: string;
  };
}) {
  return (
    <>
      <TextInput
        label="Почта"
        name="email"
        placeholder="Введите вашу почту"
        required
        defaultValue={formData?.get("email")?.toString()}
        error={errors?.email}
      />

      <PasswordInput
        label="Пароль"
        name="password"
        placeholder="Введите ваш пароль"
        required
        defaultValue={formData?.get("password")?.toString()}
        error={errors?.password}
      />
    </>
  );
}
