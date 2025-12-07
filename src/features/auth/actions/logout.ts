"use server";

import { sessionService } from "@/entities/user/server";
import { routes } from "@/shared/config";
import { redirect } from "next/navigation";

export const logout = async () => {
  await sessionService.deleteSession();
  redirect(routes.LOGIN);
};
