"use client";

import { Button } from "@mantine/core";
import React from "react";

export function SubmitButton({
  children,
  isPending,
}: {
  children: React.ReactNode;
  isPending?: boolean;
}) {
  return (
    <Button type="submit" fullWidth loading={isPending} disabled={isPending}>
      {children}
    </Button>
  );
}
