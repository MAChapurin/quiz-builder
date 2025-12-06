"use client";

import { AppShell } from "@mantine/core";
import { ReactNode } from "react";

interface LayoutProps {
  headerSlot: ReactNode;
  footerSlot: ReactNode;
  children: ReactNode;
}

export function Layout({ headerSlot, footerSlot, children }: LayoutProps) {
  return (
    <AppShell header={{ height: 60 }} padding="0">
      <AppShell.Header>{headerSlot}</AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
      {footerSlot}
    </AppShell>
  );
}
